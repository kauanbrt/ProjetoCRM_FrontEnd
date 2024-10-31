<script>
  export default {
    name: 'EventView',
    data () {
      return {
        search: '',
        dialog: false,
        items: [
          {
            nome: 'Evento 1',
            descricao: 'Descrição do Evento',
            dataInicio: '10-29-2024',
            dataFim: '10-29-2024',
            duracao: 2,
            qtdParticipantes: 20,
          },
          {
            nome: 'Evento 2',
            descricao: 'Descrição do Evento',
            dataInicio: '10-29-2024',
            dataFim: '10-29-2024',
            duracao: 2,
            qtdParticipantes: 20,
          },
          {
            nome: 'Evento 3',
            descricao: 'Descrição do Evento',
            dataInicio: '10-29-2024',
            dataFim: '10-29-2024',
            duracao: 2,
            qtdParticipantes: 20,
          },
          {
            nome: 'Evento 4',
            descricao: 'Descrição do Evento',
            dataInicio: '10-29-2024',
            dataFim: '10-29-2024',
            duracao: 2,
            qtdParticipantes: 20,
          },
          {
            nome: 'Evento 5',
            descricao: 'Descrição do Evento',
            dataInicio: '10-29-2024',
            dataFim: '10-29-2024',
            duracao: 2,
            qtdParticipantes: 20,
          },
        ],
        params: {
          nome: '',
          descricao: '',
          dataInicio: '',
          dataFim: '',
          duracao: null,
          qtdParticipantes: null,
        }
      }
    },
    methods:{
      headers(){
        return [
          { title: 'Nome',                            key: 'nome',                align: 'start' },
          { title: 'Descrição',                       key: 'descricao',           align: 'start' },
          { title: 'Início',                          key: 'dataInicio',          align: 'start' },
          { title: 'Fim',                             key: 'dataFim',             align: 'start' },
          { title: 'Duração',                         key: 'duracao',             align: 'start' },
          { title: 'Qtd de Participantes',            key: 'qtdParticipantes',    align: 'start' },
          { title: '',                                key: 'actions',             align: 'center' },
        ]
      },
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
                text="Cadastrar Evento"
                color="success"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
              prepend-icon="mdi-calendar"
              title="Cadastrar Evento"
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
                    <v-date-input
                      label="Data início*"
                      required
                    ></v-date-input>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      label="Duração (horas)*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-date-input
                      label="Data fim*"
                      required
                    ></v-date-input>
                  </v-col>

                  <v-col
                    cols="12"
                  
                  >
                    <v-textarea
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
            <span>Excluir Evento</span>
          </v-tooltip>
        </v-col>
      </template>
      </v-data-table>
    </v-card>
</template>

<style>
</style>
