<script>
  import { STATUS_EMITIDO, STATUS_NAO_EMITIDO } from '@/constants/index';
  import Status from '@/components/Status.vue';
  import axios from '@/services/http.js';

  export default {
    name: 'ParticipantView',
    components: {
      Status
    },
    data () {
      return {
        search: '',
        dialog: false,
        dialogDelete: false,
        isEdit: false,
        itemEditId: null,
        itemDeleteId: null,
        allStatusTemplate: [],
        items: [],
        params: {
          nome_participante: '',
          email_participante: '',
          tel_participante: '',
          id_adm: 6,
          isAluno: true,
          RA_participante: '',
          //verificar
          id_evento: null
        }
      }
    },
    methods:{
      headers(){
        return [
          { title: 'Nome',                            key: 'nome_participante',                     align: 'start' },
          { title: 'Email',                           key: 'email_participante',                    align: 'start' },
          { title: 'Telefone',                        key: 'tel_participante',                 align: 'start' },
          { title: 'RA',                              key: 'RA_participante',                       align: 'start' },
          { title: 'Eventos',                         key: 'eventos',                   align: 'start' },
          { title: 'Status do Último Certificado',    key: 'statusCertificado',        align: 'start' },
          { title: '',                                key: 'actions',                  align: 'start' },
        ]
      },
      getAllStatusTemplate(){
        this.items.forEach((item, index) => {
          this.allStatusTemplate[index] = this.getStatusTemplate(item.statusCertificado);
        });
      },
      getStatusTemplate(statusId){
        switch (statusId) {
          case STATUS_NAO_EMITIDO:
            return { 
                text: "Não Emitido",
                icon: "mdi-label",
                color: "error"
            }
          
          case STATUS_EMITIDO:
            return { 
                text: "Emitido",
                icon: "mdi-label",
                color: "success"
            }

          default:
            return { 
                text: "Indefinido",
                icon: "mdi-label",
                color: "grey"
            }
        }
      },
      async getItems(){
        await axios.get('/participantes').then(res => {
          const { data } = res;
          console.log(data)
          this.items = data;
        })
        .catch(err => {
          console.log(err);
        });
      },
      setItem(){

        this.dialog = false;

        if(this.isEdit){

          axios.put(`/participantes/${this.itemEditId}`, this.params).then(res => {
            this.$toast.success('Participante editado com sucesso!');
            this.getItems();
          })
          .catch(err => {
            console.log(err);
            this.$toast.error('Erro ao editar Participante!');
          });

          return;
        }

        axios.post('/participantes', this.params).then(res => {
          this.$toast.success('Participante cadastrado com sucesso!');
          this.getItems();
        })
        .catch(err => {
          console.log(err);
          this.$toast.error('Erro ao cadastrar Participante!');
        });

        return;
      },
      openEditItem(item){

        this.isEdit = true;
        this.itemEditId = item.id_participante;

        this.params.nome_participante = item.nome_participante;
        this.params.email_participante = item.email_participante;
        this.params.tel_participante = item.tel_participante;
        this.params.id_adm = item.id_adm;
        this.params.isAluno = item.isAluno;
        this.params.RA_participante = item.RA_participante;

        this.dialog = true;
      },
      confirmDelete(item){
        this.itemDeleteId = item.id_participante;
        this.dialogDelete = true;
      },
      deleteItem(){
        axios.delete(`/participantes/${this.itemDeleteId}`).then(res => {
          this.$toast.success('Participante excluído com sucesso!');
          this.getItems();
        })
        .catch(err => {
          console.log(err);
          this.$toast.error('Erro ao excluir Participante!');
        });

        this.itemDeleteId = null;
        this.dialogDelete = false;
      },
      closeModal(){
        this.isEdit = false;
        this.itemEditId = null;

        this.params.nome_participante = '';
        this.params.email_participante = '';
        this.params.tel_participante = '';
        this.params.id_adm = '';
        this.params.isAluno = true;
        this.params.RA_participante = '';

        this.dialog = false;
      },
      handleTitleModal(){
        return this.isEdit ? 'Editar Participante' : 'Cadastrar Participante';
      }
    },
    async created(){
      await this.getItems();
      this.getAllStatusTemplate();
    }
  }
</script>

<template>
  <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-col class="d-flex justify-start">
          <v-icon icon="mdi-account-group"></v-icon> &nbsp;
          Participantes
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
                text="Cadastrar Participante"
                color="success"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
              prepend-icon="mdi-account-group"
              :title="handleTitleModal()"
            >
              <v-card-text>
                <v-row dense>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="params.nome_participante"
                      label="Nome*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="params.email_participante"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="params.tel_participante"
                      label="Telefone*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="params.RA_participante"
                      label="RA*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="params.id_evento"
                      label="Evento*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                    <v-col
                        cols="12"
                    >
                        <v-checkbox v-model="params.isAluno" label="Sou aluno da UTFPR"></v-checkbox>
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
      <template v-slot:item.statusCertificado="{ item, index }">
        <Status :template="getStatusTemplate(item.statusCertificado)"></Status>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-col cols="auto">
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
                @click="openEditItem(item)"
              >
                <v-icon color="grey-darken-4">
                    mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Editar Participante</span>
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
            <span>Excluir Participante</span>
          </v-tooltip>
        </v-col>
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
      </v-data-table>
    </v-card>
</template>

<style>
</style>
