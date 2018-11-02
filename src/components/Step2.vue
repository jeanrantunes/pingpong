<template>
    <div>
        <v-form v-if="loader" @submit="onSubmit">
            <h2 v-if="$store.getters.getNameChampionschip">{{$store.getters.getNameChampionschip}}</h2>
            <v-select
                v-model="selected"
                :items="users"
                item-text="name"
                item-value="id"
                attach
                chips
                label="Escolha os jogadores"
                multiple
                return-object
          ></v-select>
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
    name: 'Step2',
    beforeMount() {
        this.getUsers()
        .then(response => {
            this.users = this.$store.getters.getListUser
            this.loader = true
        })
    },
    data() {
        return {
            loader: false,
            users: [],
            selected: []
        }
    },
    methods: {
        ...mapActions({
           getUsers: 'getUsers',
           addUsers: 'includeUsers'
        }),
        onSubmit(e) {
            e.preventDefault()
            this.loader = true
            let ids = []
            /*get ids of users*/
            this.users.forEach(item => {
                ids.push(item.id)
            })
            this.addUsers({
                name: this.$store.getters.getNameChampionschip,
                users: ids
            }).then(response => {
                if(response.status === 200) {
                    this.$emit('go-step-3')
                }
            }) 
        }
    }
}
</script>
<style lang="scss">
.v-select-list {
    max-height: 150px;
}
.v-btn {
    float: right;
}
</style>

