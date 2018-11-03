<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="listUsers"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right" v-if="props.item.rating">{{ props.item.rating }}</td>
                <td class="text-xs-right" v-else>0</td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'PlayersList',
    beforeMount() {
        this.listUsers = this.$store.getters.getListUser
    },
    data() {
        return {
            headers: [
                {
                    text: 'Nome',
                    value: 'name',
                    sortable: false
                },
                {
                    text: 'Pontuação',
                    value: 'name',
                    sortable: false
                }
            ],
            listUsers:[]
        }
    },
    methods: {

    }
}
</script>
<style lang="scss">

</style>

