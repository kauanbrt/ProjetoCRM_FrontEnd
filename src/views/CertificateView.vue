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
      </v-data-table>
    </v-card>
</template>

<style>
</style>
