<script>
export default {
    name: "ContentExternForm",
    props: {
        nomeFormulario: String,
        descricaoFormulario: String,
        tipoFormulario: Number,
    },
    data(){
        return {

        }
    }
}
</script>

<template>
    <v-col>
        <v-col>
            <v-row class="ma-0 d-flex justify-start">
                <v-card-title class="px-2">{{ nomeFormulario }}</v-card-title>
            </v-row>
            <v-row class="ma-0 pa-2 d-flex justify-start">
                {{ descricaoFormulario }}
            </v-row>
        </v-col>

        <v-col v-if="tipoFormulario == 1">
            <v-row dense>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        label="Nome*"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        label="Email*"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        label="RA*"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-col>

        <v-col v-if="tipoFormulario == 2">
            <v-row dense>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        label="Nome*"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        label="Email*"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        label="RA*"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col
                    cols="12"
                >
                    <v-textarea
                        label="O que achou do evento*"
                        required
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="3">
                    Classificação: 
                </v-col>
                <v-col
                    cols="6"
                > 
                <v-rating
                    hover
                    :length="5"
                    :size="32"
                    :model-value="3"
                    active-color="primary"
                />
                </v-col>
            </v-row>
        </v-col>
</v-col>
</template>

<style>

</style>