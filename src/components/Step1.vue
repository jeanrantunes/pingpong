<template>
    <div>
        <v-form v-if="!loader" @submit="onSubmit" v-model="valid">
            <h2>De um nome para o campeonato</h2>
            <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>
            <v-btn
                color="primary"
                type="submit"
                >
                Próximo
		    </v-btn>
        </v-form>
        <div v-else class="loadind-container">
            <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
            </span>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Step1',
    data() {
        return {
            valid: false,
            loader: false,
            name: '',
            nameRules: [
                v => !!v || 'Digite um nome.',
                v => v.length > 4 || 'Nome do campeonato deve ser maior que 4 caracteres.'
            ]
        }
    },
    methods: {
        ...mapActions({
            setName: 'createChampionschip'
        }),
        onSubmit(e) {
            e.preventDefault()
            if(this.valid) {
                this.loader = true
                this.setName(this.name)
                .then(response => {
                    if(response.status === 200) {
                        this.$emit('go-step-2')
                        this.loader = false
                    }                 
                })
            }
            else {
                alert("Dados inválidos!")
                this.loader = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.v-btn {
    float: right;
}
</style>

