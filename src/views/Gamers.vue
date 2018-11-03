<template>
    <div>
        <h1>Ranking</h1>
        <players-list v-if="!loader"></players-list>
        <div v-else class="loadind-container">
            <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
            </span>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import PlayersList from '@/components/PlayersList.vue'
export default {
    name: 'Gamers',
    components: {
        PlayersList
    },
    beforeMount() {
        this.users().then(response => {
            this.loader = false  
        })
    },
    data() {
        return {
            loader: true
        }
    },
    methods: {
        ...mapActions({
            users: 'getUsers'
        })
    }
}
</script>
<style lang="scss">

</style>

