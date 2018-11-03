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
            this.loader = false
            let ids = []
            /*get ids of users*/
            this.selected.forEach(item => {
                ids.push(item.id)
            })
            if(this.selected.length > 0) {
                this.addUsers({
                    name: this.$store.getters.getNameChampionschip,
                    users: ids
                }).then(response => {
                    if(response.status === 200) {
                        this.loader = false
                        this.$emit('go-step-3')
                    }
                }) 
            }
            else {
                alert("Selecione os jogadores")
            }
        }
    }
}
</script>
<style lang="scss">
.v-select {
    margin-bottom: 83px;
}
.v-select-list {
    max-height: 150px;
}
.v-btn {
    float: right;
}
</style>

