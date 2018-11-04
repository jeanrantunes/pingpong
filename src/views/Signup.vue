<template>
    <div>
        <v-layout row justify-center>
            <v-flex xs12 sm6 md4>
                <v-card>
                    <v-card-title>
                        <v-form @submit="onSubmit" v-model="valid">
                            <v-text-field
                                v-model="dataNewUser.name"
                                
                                label="Nome"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="dataNewUser.email"
                                :rules="rules.emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="dataNewUser.password"
                                :append-icon="show ? 'visibility_off' : 'visibility'"
                                :rules="[rules.required, rules.min]"
                                :type="show ? 'text' : 'password'"
                                name="input-10-1"
                                label="Senha"
                                @click:append="show = !show"
                            ></v-text-field>

                            <v-btn
                                type="submit"   
                                right
                                >
                                Criar conta
                            </v-btn>
                        </v-form>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
<!--     
   <form @submit="onSubmit">

        <h1>Crie um usuário:</h1>

        <label for="user">Nome:</label>
        <input v-model="dataNewUser.name" type="text" required id="user">

        <label for="email">Email:</label>
        <input v-model="dataNewUser.email" type="email" required id="email">

        <label for="password">Senha:</label>
        <input v-model="dataNewUser.password" type="password" requiredid="password">

        <button type="submit">Entrar</button>
   </form>  -->
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: "Signup",
    beforeMount() {
		this.$store.commit('toggleBtnRanking', false)
		this.$store.commit('toggleBtnGetOut', false)
	},
    data() {
        return {
            valid: false,
            show: false,
            dataNewUser: {
                "name":"",
                "email":"",
                "password":"",
                "rating": "1000"
            },
            rules: {
                required: value => !!value || "Obrigatório",
                min: v => v.length >= 4 || "Mínimo 4 caracteres",

                emailRules: [
                    v => !!v || "É necessário inserir um e-mail",
                    v => /.+@.+/.test(v) || "Digite um e-mail válido"
                ]
            },
        }
    },
    methods: {
        ...mapActions({
            createUser: 'createNewUser'
        }),
        onSubmit(e) {
            e.preventDefault()
            if(this.valid) {
                this.createUser({newUser: this.dataNewUser, router: this.$router})
            }
            else {
                alert("Cadastro inválido.")
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.v-form {
    width: 100%;
    .v-btn {
        float: right;
    }
}
</style>

