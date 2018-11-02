<template>
    <div v-if="$store.state.matches">
        <h2 v-if="$store.getters.getNameChampionschip">{{$store.getters.getNameChampionschip}}</h2>
        <div class="text-xs-center">
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
            <v-pagination
            v-model="page"
            :length="9"
            ></v-pagination>
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
        })
    },
    data() {
        return {
            loader: false,
            page: 1,
            matches: []
        }
    },
    watch: {
        page(e) {
            this.getMatches(e)
            .then(response => {
                this.matches = this.$store.state.matches
            })
        }
    },
    methods: {
        ...mapActions({
           getMatches:'getMatches'
        }),
        updateResults(item) {
            console.log(item)
        }
    }
}
</script>
<style lang="scss">
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
            }
        }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
            }
        }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
            }
        }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
            }
        }
</style>

