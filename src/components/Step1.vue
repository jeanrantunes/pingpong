<template>
    <div>
        <v-form v-if="!loader" @submit="onSubmit" v-model="valid">
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
                Continue
		    </v-btn>
        </v-form>
        <img v-else src="@/assets/loader.gif" alt="">
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
            this.loader = true
            this.setName(this.name)
            .then(response => {
                if(response.status === 200) {
                    this.$emit('go-step-2')
                    this.loader = false
                }
                
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.v-btn {
    float: right;
}
</style>

