<script>
  import { STATUS_EMITIDO, STATUS_NAO_EMITIDO } from '@/constants/index';
  import Status from '@/components/Status.vue';

  export default {
    name: 'ParticipantView',
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
            nome: 'João Silva',
            email: 'email@email.com',
            ra: 9999999,
            evento: 'Evento 1',
            statusCertificado: 1,
          },
          {
            nome: 'Pedro Moraes',
            email: 'email@email.com',
            ra: 9999999,
            evento: 'Evento 1',
            statusCertificado: 0,
          },
          {
            nome: 'Laura Santana',
            email: 'email@email.com',
            ra: 9999999,
            evento: 'Evento 2',
            statusCertificado: 0,
          },
          {
            nome: 'Maria Eduarda',
            email: 'email@email.com',
            ra: 9999999,
            evento: 'Evento 3',
            statusCertificado: 1,
          },
          {
            nome: 'Luis Felipe',
            email: 'email@email.com',
            ra: 9999999,
            evento: 'Evento 2',
            statusCertificado: 0,
          },
        ],
        params: {
          nome: '',
          ra: null,
          evento: null,
          statusCertificado: null
        }
      }
    },
    methods:{
      headers(){
        return [
          { title: 'Nome',                            key: 'nome',                     align: 'start' },
          { title: 'Email',                           key: 'email',                    align: 'start' },
          { title: 'RA',                              key: 'ra',                       align: 'start' },
          { title: 'Eventos',                         key: 'evento',                   align: 'start' },
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
          <v-icon icon="mdi-account-group"></v-icon> &nbsp;
          Participantes
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
                text="Cadastrar Participante"
                color="success"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
              prepend-icon="mdi-account-group"
              title="Cadastrar Participante"
            >
              <v-card-text>
                <v-row dense>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      label="Nome*"
                      required
                    ></v-text-field>
                  </v-col>

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
