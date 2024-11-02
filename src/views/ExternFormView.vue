<script>
import ContentExternForm from '@/components/ContentExternForm.vue';
export default {
    name: "ExternFormView",
    components: {
        ContentExternForm
    },
    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 2000)
      },
    },
    data(){
        return {
            loading: false,
        }
    }
}
</script>

<template>
    <v-row class="d-flex align-center justify-center container ma-0">
        <v-card class="card-form">
            <ContentExternForm nome-formulario="Nome do Formulário" descricao-formulario="Descrição do Formulãrio" :tipo-formulario="2"/>
            <v-row class="d-flex align-center justify-center ma-0 pa-2">
                <v-btn
                    :disabled="loading"
                    :loading="loading"
                    class="text-none mb-4"
                    color="primary"
                    variant="flat"
                    @click="loading = !loading"                 
                >Enviar Respostas</v-btn>
              </v-row>
        </v-card>
    </v-row>
</template>

<style>
.container{
    background-color: beige;
    width: 100% !important;
    height: 100% !important;
}
.card-form{
    width: 100% !important;
    max-width: 500px;
}
</style>