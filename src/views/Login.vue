<template>
    <div>
        <v-layout row justify-center>
            
            <v-flex xs12 sm6 md4>
                <v-card>
                    <v-card-title>
                        <v-form @submit="onSubmit">
                            <v-text-field
                                v-model="formLogin.email"
                                :rules="rules.emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="formLogin.password"
                                :append-icon="show ? 'visibility_off' : 'visibility'"
                                :rules="[rules.required, rules.min]"
                                :type="show ? 'text' : 'password'"
                                name="input-10-1"
                                label="Senha"
                                hint="At least 8 characters"
                                @click:append="show = !show"
                            ></v-text-field>
                            <v-layout justify-space-between>
                                <div>
                                    <v-btn flat to="/signup">Criar conta</v-btn>
                                </div>
                                <div>
                                    <v-btn
                                        type="submit"   
                                        right
                                        >
                                        Entrar
                                    </v-btn>
                                </div>
                            </v-layout>
                        </v-form>
                    </v-card-title>
                </v-card>
            </v-flex>
            
        </v-layout>
        
        
    </div>
    
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      show: false,
      errors: [],
      rules: {
        required: value => !!value || "Obrigatório.",
        min: v => v.length >= 4 || "Mínimo 4 caracteres",

        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ]
      },
      formLogin: {
        show: false,
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      login: "login"
    }),
    onSubmit(e) {
      e.preventDefault();
      this.login({ dataUser: this.formLogin, router: this.$router });
    }
  }
};
</script>
<style lang="scss" scoped>
.v-form {
  width: 100%;
}
</style>

