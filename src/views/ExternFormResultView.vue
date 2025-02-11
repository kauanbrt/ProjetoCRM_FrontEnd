<script>
  import { F_TIPO_FEEDBACK, F_TIPO_CADASTRO, F_STATUS_ATIVO, F_STATUS_DESATIVADO } from '@/constants/index';
  import Status from '@/components/Status.vue';
  import router from '@/router';

  export default {
    name: 'ExternResultFormView',
    components: {
      Status
    },
    data () {
      return {
        F_STATUS_ATIVO: F_STATUS_ATIVO,
        search: '',
        dialog: false,
        allStatusTemplate: [],
        nomeFormulario: "Nome do Formulário",
        items: [
          {
            participante_nome: 'Akio Suzuki',
            participante_email: 'Akio@gmail.com',
            participante_ra: 9999999,
            resultado_comentario: 'Comentário do Participante',
            resultado_classificacao: 5,
          },
          {
            participante_nome: 'Amanda Soares',
            participante_email: 'asoares@gmail.com',
            participante_ra: 9999999,
            resultado_comentario: 'Comentário do Participante',
            resultado_classificacao: 4,
          },
          {
            participante_nome: 'Pedro Cunha',
            participante_email: 'pedrao@gmail.com',
            participante_ra: 9999999,
            resultado_comentario: 'Comentário do Participante',
            resultado_classificacao: 5,
          },
          {
            participante_nome: 'Lucio Moraes',
            participante_email: 'manolucios@gmail.com',
            participante_ra: 9999999,
            resultado_comentario: 'Comentário do Participante',
            resultado_classificacao: 5,
          },
          {
            participante_nome: 'Rhityely Garcya',
            participante_email: 'rhity@gmail.com',
            participante_ra: 9999999,
            resultado_comentario: 'Comentário do Participante',
            resultado_classificacao: 4,
          },
        ],
        params: {
            participante_nome: '',
            participante_email: '',
            participante_ra: null,
            resultado_comentario: '',
            resultado_classificacao: null,
        }
      }
    },
    methods:{
      headers(){
        return [
          { title: 'Nome',                      key: 'participante_nome',               align: 'start' },
          { title: 'Email',                     key: 'participante_email',              align: 'start' },
          { title: 'RA',                        key: 'participante_ra',                 align: 'start' },
          { title: 'Comentario',                key: 'resultado_comentario',            align: 'start' },
          { title: 'Classificação',             key: 'resultado_classificacao',         align: 'center' },
          { title: '',                          key: 'actions',                         align: 'center' },
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
    goToForms(){
      router.push('/forms');
    }
    
  },
  created(){
  }

  }
</script>

<template>
  <v-row class="ma-0">
    <v-btn 
      color="success"
      prepend-icon="mdi-arrow-left"
      @click="goToForms"
    >
      Voltar
    </v-btn>
  </v-row>
  <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-col class="d-flex justify-start">
          <v-icon icon="mdi-file-document"></v-icon> &nbsp;
          {{ `${nomeFormulario} - Respostas ` }}
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
        </v-col>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table 
        :headers="headers()"
        v-model:search="search" 
        :items="items"
      >
      
        <template v-slot:item.resultado_classificacao="{ item }">
            <v-rating
            :model-value="item.resultado_classificacao"
            color="orange-darken-2"
            density="compact"
            size="small"
            readonly
            ></v-rating>
        </template>
        
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
            <span>Excluir Resultado</span>
          </v-tooltip>
        </v-col>
      </template>
      </v-data-table>
    </v-card>
</template>

<style>
</style>
