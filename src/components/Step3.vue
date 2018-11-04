<template>
    <div v-if="$store.state.matches">
        <h2 v-if="$store.getters.getNameChampionschip">{{$store.getters.getNameChampionschip}}</h2>
        <div class="text-xs-center" v-if="loader">
            <v-list two-line>
                <template v-for="item in matches.data">
                    <v-list-tile
                        :key="item.id"
                        ripple
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>Partida: {{item.users[0].name}} <strong>X</strong> {{item.users[1].name}}</v-list-tile-title>
                            <v-list-tile-sub-title>Pontuação 1: <strong>{{item.score_1}}</strong></v-list-tile-sub-title>
                            <v-list-tile-sub-title>Pontuação 2: <strong>{{item.score_2}}</strong></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <div v-if="!item.finished">
                                <v-chip color="teal" text-color="white">
                                    <span class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                                    Partida em andamento
                                </v-chip>
                                <v-btn @click="updateResults(item)" outline small fab color="indigo">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </div>
                            <v-chip v-else color="teal" text-color="white">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                Partida finalizada
                            </v-chip>
                        </v-list-tile-action>   
                    </v-list-tile>
                </template>
            </v-list>
            <div>
                <v-btn @click="navigator(0)" class="prev" fab dark color="indigo">
                    <v-icon dark>navigate_before</v-icon>
                </v-btn>

                <v-btn @click="navigator(1)" class="next" fab dark color="indigo">
                    <v-icon dark>navigate_next</v-icon>
                </v-btn>
            </div>
        </div>
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
    name: 'Step3',
    beforeMount() {
        this.getMatches(this.page)
        .then(response => {
            this.matches = this.$store.state.matches
            this.page = this.$store.state.matches.page
            this.loader = true
        })
    },
    data() {
        return {
            loader: false,
            page: this.$store.state.matches.page,
            matches: [],
            flag: true
        }
    },
    methods: {
        ...mapActions({
           getMatches:'getMatches'
        }),
        updateResults(item) {
            this.$router.push({ name: 'update-result', params: { item: item } })
        },
        navigator(c) {
            this.loader = false
            /*previous*/
            if(c == 0 && this.page > 1) {
                this.page -- 
                this.$store.commit("setPage", this.page)
                this.flag = true
            }
            else if(c == 1 && this.flag) {
                this.page ++
                this.$store.commit("setPage", this.page)
            }
            else {
                this.loader = true
                return
            }
            if(this.flag) {
                this.$store.commit('setPage', this.page)
                this.getMatches(this.page)
                .then(response => {
                    if(response.data.data.length > 0) {
                        this.matches = this.$store.state.matches
                        this.flag = true
                    }
                    else {
                        this.page --
                        this.$store.commit("setPage", this.page)
                        this.flag = false
                    }
                    this.loader = true
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.v-chip {
    .v-icon {
        font-size: 25px;
    }
}
.v-btn {
    float: none;
}
</style>

