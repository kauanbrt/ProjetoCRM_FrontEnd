<script>
  import { F_TIPO_FEEDBACK, F_TIPO_PARTICIPANTE, F_STATUS_ATIVO, F_STATUS_DESATIVADO } from '@/constants/index';
  import Status from '@/components/Status.vue';

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
        allStatusTemplate: [],
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
          id: null,
          aluno_nome: '',
          aluno_ra: null,
          evento: '',
          status: null,
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
          
          case F_TIPO_PARTICIPANTE:
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
  },
  created(){
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
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-dialog
            v-model="dialog"
            max-width="600"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                class="text-none font-weight-regular"
                prepend-icon="mdi-plus"
                text="Novo Formulário"
                color="success"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
              prepend-icon="mdi-file-document"
              title="Novo Formulário"
            >
              <v-card-text>
                <v-row dense>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      label="RA*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      label="Evento*"
                      required
                    ></v-text-field>
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
                  @click="dialog = false"
                ></v-btn>

                <v-btn
                  color="primary"
                  text="Confirmar"
                  variant="tonal"
                  @click="dialog = false"
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
        <v-col cols="auto" class="d-flex justify-center">
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
              >
                <v-icon color="grey-darken-4">
                    mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Visualizar Resultados</span>
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
              >
                <v-icon color="grey-darken-4">
                    mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Excluir Formulário</span>
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
