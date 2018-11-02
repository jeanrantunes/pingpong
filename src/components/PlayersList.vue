<template>
    <div>
        <table>
            <thead>
                <th>Nome</th>
                <th>Pontuação</th>
            </thead>
            <tbody>
                <tr v-for="element in listUsers" :key="element.index">
                    <td>{{element.name}}</td>
                    <td v-if="element.rating">{{element.rating}}</td>
                    <td v-else>0</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'PlayersList',
    beforeMount() {
        this.listUsers = this.$store.getters.getListUser
        console.log(this.listUsers)
    },
    data() {
        return {
            listUsers:[]
        }
    },
    methods: {

    }
}
</script>
<style lang="scss">

</style>

