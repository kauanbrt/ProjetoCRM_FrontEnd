<script>
  import axios from '@/services/http.js';
  import { formatDateToUTC } from '@/services/utils.js';

  export default {
    name: 'EventView',
    data () {
      return {
        search: '',
        dialog: false,
        dialogDelete: false,
        isEdit: false,
        itemEditId: null,
        itemDeleteId: null,
        items: [],
        params: {
          nome_evento: '',
          descricao_evento: '',
          data_inicio: null,
          data_fim: null,
          duracao: null,
          id_adm: 6, //todo recuperar do adm logado
        }
      }
    },
    methods:{
      headers(){
        return [
          { title: 'Nome',                            key: 'nome_evento',           align: 'start' },
          { title: 'Descrição',                       key: 'descricao_evento',      align: 'start' },
          { title: 'Início',                          key: 'data_inicio',           align: 'start' },
          { title: 'Fim',                             key: 'data_fim',              align: 'start' },
          { title: 'Duração',                         key: 'duracao',               align: 'start' },
          { title: 'Qtd de Participantes',            key: 'qtd_participantes',     align: 'start' },
          { title: '',                                key: 'actions',               align: 'center' },
        ]
      },
      getItems(){
        axios.get('/eventos').then(res => {
          const { data } = res;
          console.log(data)
          this.items = data;
        })
        .catch(err => {
          console.log(err);
        });
      },
      setItem(){
        this.params.data_inicio = formatDateToUTC(this.params.data_inicio);
        this.params.data_fim = formatDateToUTC(this.params.data_fim);

        this.params.duracao = parseInt(this.params.duracao);

        this.dialog = false;

        if(this.isEdit){

          axios.put(`/eventos/${this.itemEditId}`, this.params).then(res => {
            this.$toast.success('Evento editado com sucesso!');
            this.getItems();
          })
          .catch(err => {
            console.log(err);
            this.$toast.error('Erro ao editar Evento!');
          });

          return;
        }

        axios.post('/eventos', this.params).then(res => {
          this.$toast.success('Evento cadastrado com sucesso!');
          this.getItems();
        })
        .catch(err => {
          console.log(err);
          this.$toast.error('Erro ao cadastrar Evento!');
        });

        return;
      },
      openEditItem(item){
        this.isEdit = true;
        this.itemEditId = item.id_evento;

        this.params.data_inicio = item.data_inicio;
        this.params.data_fim = item.data_fim;
        this.params.descricao_evento = item.descricao_evento;
        this.params.duracao = item.duracao;
        this.params.id_adm = item.id_adm;
        this.params.nome_evento = item.nome_evento;

        this.dialog = true;
      },
      confirmDelete(item){
        this.itemDeleteId = item.id_evento;
        this.dialogDelete = true;
      },
      deleteItem(){
        axios.delete(`/eventos/${this.itemDeleteId}`).then(res => {
          this.$toast.success('Evento excluído com sucesso!');
          this.getItems();
        })
        .catch(err => {
          console.log(err);
          this.$toast.error('Erro ao excluir Evento!');
        });

        this.itemDeleteId = null;
        this.dialogDelete = false;
      },
      closeModal(){
        this.isEdit = false;
        this.itemEditId = null;

        this.params.data_inicio = null;
        this.params.data_fim = null;
        this.params.descricao_evento = '';
        this.params.duracao = null;
        this.params.id_adm = 6;
        this.params.nome_evento = '';

        this.dialog = false;
      },
      handleTitleModal(){
        return this.isEdit ? 'Editar Evento' : 'Cadastrar Evento';
      }
    },
    created(){
      this.getItems();
    }
  }
</script>

<template>
  <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-col class="d-flex justify-start">
          <v-icon icon="mdi-calendar"></v-icon> &nbsp;
          Eventos
        </v-col>
        <v-col class="d-flex justify-center">
          <v-text-field
            v-model="search"
            density="compact"
            label="Pesquisar"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-col>
        <v-col class="d-flex justify-end">

          <!-- ========  MODAL CONFIRMAR EXCLUSÃO ======== -->
          <v-dialog
            v-model="dialogDelete"
            max-width="400"
            persistent
          >
            <v-card>

              <v-card-title style="font-size: 1.2rem;">
                <v-icon>mdi-delete</v-icon>
                Excluir Item
              </v-card-title>

              <v-card-text style="font-size: 1.1rem;">
                Você tem CERTEZA que deseja EXCLUIR este item? <br> Esta ação não poderá ser desfeita!
              </v-card-text>

              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="dialogDelete = false" color="primary">
                  Cancelar
                </v-btn>

                <v-btn @click="deleteItem" color="error">
                  Confirmar
                </v-btn>
              </template>
            </v-card>
          </v-dialog>


          <!-- ========  MODAL CADASTRO/EDIT ======== -->
          <v-dialog
            v-model="dialog"
            max-width="600"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                class="text-none font-weight-regular"
                prepend-icon="mdi-plus"
                text="Cadastrar Evento"
                color="success"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
              prepend-icon="mdi-calendar"
              :title="handleTitleModal()"
            >
              <v-card-text>
                <v-row dense>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="params.nome_evento"
                      label="Nome*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-date-input
                      v-model="params.data_inicio"
                      label="Data início*"
                      required
                    ></v-date-input>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                    v-model="params.duracao"
                      label="Duração (horas)*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-date-input
                    v-model="params.data_fim"
                      label="Data fim*"
                      required
                    ></v-date-input>
                  </v-col>

                  <v-col
                    cols="12"
                  
                  >
                    <v-textarea
                    v-model="params.descricao_evento"
                      label="Descrição*"
                      required
                    ></v-textarea>
                  </v-col>

                </v-row>

                <small class="text-caption text-medium-emphasis">*indica campos obrigatórios</small>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Cancelar"
                  variant="plain"
                  @click="closeModal()"
                ></v-btn>

                <v-btn
                  color="primary"
                  text="Confirmar"
                  variant="tonal"
                  @click="setItem"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table 
        :headers="headers()"
        v-model:search="search" 
        :items="items"
      >
      <template v-slot:item.duracao="{ item }">
        {{ item.duracao + ' horas' }} 
      </template>
      
        <!-- <template v-slot:item.rating="{ item }">
          <v-rating
            :model-value="item.rating"
            color="orange-darken-2"
            density="compact"
            size="small"
            readonly
          ></v-rating>
        </template> -->

      <template v-slot:item.actions="{ item }">
        <v-col cols="auto" class="d-flex justify-center">
            <v-tooltip
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-download"
                  color="orange-darken-2"
                  size="small"
                  style="color: #000 !important;"
                  class="mx-1"
                >
                  <v-icon color="grey-darken-4">
                      mdi-download
                  </v-icon>
                </v-btn>
              </template>
              <span>Baixar Dados para Emissão dos Certificados</span>
            </v-tooltip>
            <v-tooltip
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-certificate"
                  color="orange-darken-2"
                  size="small"
                  style="color: #000 !important;"
                  class="mx-1"
                >
                  <v-icon color="grey-darken-4">
                      mdi-certificate
                  </v-icon>
                </v-btn>
              </template>
              <span>Atualizar Status dos Certificados</span>
            </v-tooltip>
            <v-tooltip
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-pencil"
                  color="orange-darken-2"
                  size="small"
                  style="color: #000 !important;"
                  class="mx-1"
                  @click="openEditItem(item)"
                >
                  <v-icon color="grey-darken-4">
                      mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>Editar Evento</span>
            </v-tooltip>
            <v-tooltip
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-delete"
                  color="orange-darken-2"
                  size="small"
                  style="color: #000 !important;"
                  class="mx-1"
                  @click="confirmDelete(item)"
                >
                  <v-icon color="grey-darken-4">
                      mdi-delete
                  </v-icon>
                </v-btn>
              </template>
              <span>Excluir Evento</span>
            </v-tooltip>
        </v-col>
      </template>
      </v-data-table>
    </v-card>
</template>

<style>
</style>
