<script>
  import { F_TIPO_FEEDBACK, F_TIPO_CADASTRO, F_STATUS_ATIVO, F_STATUS_DESATIVADO } from '@/constants/index';
  import Status from '@/components/Status.vue';
  import router from '@/router';
  import axios from '@/services/http.js';

  export default {
    name: 'FormsView',
    components: {
      Status
    },
    data () {
      return {
        F_STATUS_ATIVO: F_STATUS_ATIVO,
        search: '',
        dialog: false,
        dialogDelete: false,
        isEdit: false,
        itemEditId: null,
        itemDeleteId: null,
        allStatusTemplate: [],
        tiposFormulario: [
          { title: 'Cadastro', value: F_TIPO_CADASTRO },
          { title: 'Feedback', value: F_TIPO_FEEDBACK },
        ],
        allEventos: [
          { title: 'Evento 1', value: 1 },
          { title: 'Evento 2', value: 2 },
          { title: 'Evento 3', value: 3 },
          { title: 'Evento 4', value: 4 },
          { title: 'Evento 5', value: 5 },
        ],
        items: [
          {
            formulario_nome: 'Feedback dos Participantes',
            evento_nome: 'Evento 1',
            formulario_tipo: 1,
            formulario_status: 1,
          },
          {
            formulario_nome: 'Inscrição de Participantes',
            evento_nome: 'Evento 1',
            formulario_tipo: 2,
            formulario_status: 0,
          },
        ],
        params: {
          id_adm: 6,
          id_evento: null,
          id_tipo: null,
          nome_formulario: '',
          status_formulario: F_STATUS_ATIVO,
        }
      }
    },
    methods:{
      headers(){
        return [
          { title: 'Nome',                     key: 'formulario_nome',                align: 'start' },
          { title: 'Evento',                   key: 'evento_nome',                    align: 'start' },
          { title: 'Tipo',                     key: 'formulario_tipo',                align: 'start' },
          { title: 'Status',                   key: 'formulario_status',              align: 'start' },
          { title: '',                         key: 'actions',                        align: 'center' },
        ]
      },
      getAllStatusTemplate(){
        this.items.forEach((item, index) => {
          this.allStatusTemplate[index] = this.getStatusTemplate(item.statusCertificado);
        });
      },
      getStatusTemplate(statusId){
        switch (statusId) {
          case F_STATUS_ATIVO:
            return { 
                text: "Ativo",
                icon: "mdi-label",
                color: "success"
            }
          
          case F_STATUS_DESATIVADO:
            return { 
                text: "Desativado",
                icon: "mdi-label",
                color: "error"
            }

          default:
            return { 
                text: "Indefinido",
                icon: "mdi-label",
                color: "grey"
            }
        }
      },
      getTipoTemplate(statusId){
        switch (statusId) {
          case F_TIPO_FEEDBACK:
            return { 
                text: "Feedback",
                icon: "mdi-thumb-up",
                color: "primary"
            }
          
          case F_TIPO_CADASTRO:
            return { 
                text: "Cadastro",
                icon: "mdi-account-plus",
                color: "primary"
            }

          default:
            return { 
                text: "Indefinido",
                icon: "mdi-label",
                color: "grey"
            }
        }
      },
      viewResults(){
        router.push('/results');
      },
      async getItems(){
        await axios.get('/formularios').then(res => {
          const { data } = res;
          console.log(data)
          this.items = data;
        })
        .catch(err => {
          console.log(err);
        });
      },
      async getEventosToSelect(){

        this.allEventos = [];

        axios.get('/eventos').then(res => {
          const { data } = res;
          if(data.length){
            data.forEach(evento => {
              this.allEventos.push({ title: evento.nome_evento, value: evento.id_evento });
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
      },
      setItem(){

        this.dialog = false;

        console.log(this.params)

        if(this.isEdit){

          axios.put(`/formularios/${this.itemEditId}`, this.params).then(res => {
            this.$toast.success('Formulário editado com sucesso!');
            this.getItems();
          })
          .catch(err => {
            console.log(err);
            this.$toast.error('Erro ao editar Formulário!');
          });

          return;
        }

        axios.post('/formularios', this.params).then(res => {
          this.$toast.success('Formulário cadastrado com sucesso!');
          this.getItems();
        })
        .catch(err => {
          console.log(err);
          this.$toast.error('Erro ao cadastrar Formulário!');
        });

        return;
      },
      openEditItem(item){

        this.isEdit = true;
        this.itemEditId = item.id_formulario;

        this.params.id_adm = item.id_adm;
        this.params.id_evento = item.id_evento;
        this.params.id_tipo = item.id_tipo;
        this.params.nome_formulario = item.nome_formulario;
        this.params.status_formulario = item.status_formulario;

        this.dialog = true;
      },
      confirmDelete(item){
        this.itemDeleteId = item.id_formulario;
        this.dialogDelete = true;
      },
      deleteItem(){
        axios.delete(`/formularios/${this.itemDeleteId}`).then(res => {
          this.$toast.success('Formulário excluído com sucesso!');
          this.getItems();
        })
        .catch(err => {
          console.log(err);
          this.$toast.error('Erro ao excluir Formulário!');
        });

        this.itemDeleteId = null;
        this.dialogDelete = false;
      },
      closeModal(){
        this.isEdit = false;
        this.itemEditId = null;

        this.params.id_adm = 6;
        this.params.id_evento = null;
        this.params.id_tipo = null;
        this.params.nome_formulario = '';
        this.params.status_formulario = this.F_STATUS_ATIVO;

        this.dialog = false;
      },
      handleTitleModal(){
        return this.isEdit ? 'Editar Formulário' : 'Cadastrar Formulário';
      }
    },
    async created(){
      await this.getItems();
      await this.getEventosToSelect();
      this.getAllStatusTemplate();
    }

  }
</script>

<template>
  <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-col class="d-flex justify-start">
          <v-icon icon="mdi-file-document"></v-icon> &nbsp;
          Formulários
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
                text="Cadastrar Formulário"
                color="success"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
              prepend-icon="mdi-file-document"
              :title="handleTitleModal()"
            >
              <v-card-text>
                <v-row dense>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="params.nome_formulario"
                      label="Nome do Fomulário*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="12"
                  >
                    <v-select
                      label="Tipo*"
                      v-model="params.id_tipo"
                      :items="tiposFormulario"
                      item-title="title"
                      item-value="value"
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="12"
                  >
                    <v-select
                      v-model="params.id_evento"
                      label="Evento*"
                      :items="allEventos"
                      item-title="title"
                      item-value="value"
                    >
                    </v-select>
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
                  @click="closeModal"
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
      <template v-slot:item.formulario_tipo="{ item }">
        <Status :template="getTipoTemplate(item.formulario_tipo)"></Status>
      </template>

      <template v-slot:item.formulario_status="{ item }">
        <Status :template="getStatusTemplate(item.formulario_status)"></Status>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-col cols="auto" class="d-flex justify-start">
          <v-tooltip
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-eye"
                color="orange-darken-2"
                size="small"
                style="color: #000 !important;"
                class="mx-1"
                @click="viewResults"
              >
                <v-icon color="grey-darken-4">
                    mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Visualizar Respostas</span>
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
            <span>Excluir Formulário</span>
          </v-tooltip>
          <v-tooltip
            location="bottom"
            v-if="item.formulario_status == F_STATUS_ATIVO"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-file"
                color="orange-darken-2"
                size="small"
                style="color: #000 !important;"
                class="mx-1"
              >
                <v-icon color="grey-darken-4">
                    mdi-file-document-remove
                </v-icon>
              </v-btn>
            </template>
            <span>Desativar Formulário</span>
          </v-tooltip>
        </v-col>
      </template>
      </v-data-table>
    </v-card>
</template>

<style>
</style>
