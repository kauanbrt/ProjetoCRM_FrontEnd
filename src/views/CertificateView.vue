<script>
  import { STATUS_ENVIADO, STATUS_NAO_ENVIADO } from '@/constants/index';
  import Status from '@/components/Status.vue';

  export default {
    name: 'CertificateView',
    components: {
      Status
    },
    data () {
      return {
        search: '',
        dialog: false,
        allStatusTemplate: [],
        items: [
          {
            id: '1',
            aluno_nome: 'João Silva',
            aluno_ra: 9999999,
            evento: 'Evento 1',
            status: 2,
          },
          {
            id: '2',
            aluno_nome: 'Maria Eduarda',
            aluno_ra: 9999999,
            evento: 'Evento 3',
            status: 3,
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
          { title: 'Número',                   key: 'id',                             align: 'start' },
          { title: 'Nome',                     key: 'aluno_nome',                     align: 'start' },
          { title: 'RA',                       key: 'aluno_ra',                       align: 'start' },
          { title: 'Evento',                   key: 'evento',                         align: 'start' },
          { title: 'Status',                   key: 'status',                         align: 'start' },
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
        case STATUS_NAO_ENVIADO:
          return { 
              text: "Não Enviado",
              icon: "mdi-label",
              color: "error"
          }
        
        case STATUS_ENVIADO:
          return { 
              text: "Enviado",
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
    created(){
      this.getAllStatusTemplate();
    }
    }
  }
</script>

<template>
  <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-col class="d-flex justify-start">
          <v-icon icon="mdi-certificate"></v-icon> &nbsp;
          Certificados
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
                text="Emitir Certificado"
                color="success"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
              prepend-icon="mdi-certificate"
              title="Emitir Certificado"
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
      <template v-slot:item.status="{ item, index }">
        <Status :template="getStatusTemplate(item.status)"></Status>
      </template>

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
            <span>Baixar Certificado</span>
          </v-tooltip>
          <v-tooltip
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-account-arrow-up"
                color="orange-darken-2"
                size="small"
                style="color: #000 !important;"
                class="mx-1"
              >
                <v-icon color="grey-darken-4">
                  mdi-account-arrow-up
                </v-icon>
              </v-btn>
            </template>
            <span>Enviar Certificado para o Participante</span>
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
            <span>Visualizar Certificado</span>
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
            <span>Excluir Certificado</span>
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
