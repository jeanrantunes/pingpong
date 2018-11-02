<template>
   <form @submit="onSubmit">
        <h1>Crie um usuário:</h1>

        <label for="user">Nome:</label>
        <input v-model="dataNewUser.name" type="text" required id="user">

        <label for="email">Email:</label>
        <input v-model="dataNewUser.email" type="email" required id="email">

        <label for="password">Senha:</label>
        <input v-model="dataNewUser.password" type="password" requiredid="password">

        <!-- <label for="password">Confirme sua senha:</label>
        <input type="password" required placeholder="Senha" id="confirm-password"> -->

        <!-- <label for="rating">Rating:</label>
        <input v-model="dataNewUser.rating" type="number" required id="rating"> -->

        <button type="submit">Entrar</button>
   </form> 
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: "Signup",
    data() {
        return {
            dataNewUser: {
                "name":"",
                "email":"",
                "password":"",
                "rating": "0"
            }
        }
    },
    methods: {
        ...mapActions({
            createUser: 'createNewUser'
        }),
        onSubmit(e) {
            e.preventDefault()
            this.createUser({newUser: this.dataNewUser, router: this.$router})
        }
    }
}
</script>
<style lang="scss">

</style>

