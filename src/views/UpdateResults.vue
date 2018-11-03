<template>
    <v-layout v-if="!loader" row>
        <v-flex>
            <v-form @submit="onSubmit" v-model="valid">
                <v-text-field
                    v-model="points1"
                    :label="match.users[0].name"
                    value="0"
                    type="number"
                    min="0"
                    max="11"
                    :rules="pointsRules"
                ></v-text-field>
                <v-text-field
                    v-model="points2"
                    :label="match.users[1].name"
                    value="0"
                    type="number"
                    min="0"
                    max="11"
                    :rules="pointsRules"
                ></v-text-field>
                <v-btn
                    type="submit"   
                    right
                    >
                    Atualizar
                </v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: "UpdateResults",
    beforeMount() {
        this.match = this.$route.params.item
        this.loader = false
        this.points1 = this.match.score_1.split(" ")[0] 
        this.points2 = this.match.score_1.split(" ")[2]

        if(this.points1 == 11 || this.points2 == 11) {
            this.points1 = this.match.score_2.split(" ")[0]
            this.points2 = this.match.score_2.split(" ")[2]
        }

    },
    data() {
        return {
            valid: false,
            points1: '',
            points2: '',
            match: [],
            loader: false,
            pointsRules: [
                v => v >= 0 || "Não pode ser menor que 0 pontos",
                v => v <= 11 || "Máximo 11 pontos"
            ]
        }
    },
    methods: {
        ...mapActions({
           update:'updateResult'
        }),
        onSubmit(e) {
            e.preventDefault()
            if(this.valid) {
                this.update({id: this.match.id, data: {score:  this.points1 + " x " + this.points2, winner_id: this.points1 > this.points2 ? this.match.users[0].id :  this.match.users[1].id}})
                .then(response => {
                    if(response.status === 200) {
                        window.history.back()
                    }
                })
            }
            else {
                alert("Dados inválidos.")
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.v-btn {
    float: right;
}
</style>

