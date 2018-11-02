<template>
	<div>
		<h1>Home</h1>
		<v-layout row wrap align-center>
			<v-stepper v-model="e1">
				<v-stepper-header>
					<v-stepper-step :complete="e1 > 1" step="1">Iniciar campeonato</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="e1 > 2" step="2">Escolha de jogadores</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step step="3">Visualizar partidas</v-stepper-step>
					</v-stepper-header>

					<v-stepper-items>
					<v-stepper-content step="1">
						<step1 @go-step-2="e1 = 2"></step1>
					</v-stepper-content>

					<v-stepper-content step="2">
						<step2 @go-step-2="e1 = 3"></step2>	
						<v-btn flat @click="e1 = 1">Cancel</v-btn>
					</v-stepper-content>

					<v-stepper-content step="3">
						<v-card
						class="mb-5"
						color="grey lighten-1"
						height="200px"
						></v-card>

						<v-btn
						color="primary"
						@click="e1 = 1"
						>
						Continue
						</v-btn>

						<v-btn flat>Cancel</v-btn>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</v-layout>
		<router-link to="/gamers">Jogadores</router-link>
	</div> 
</template>

<script>
import Step1 from '@/components/Step1.vue'
import Step2 from '@/components/Step2.vue'
export default {
	name: "Home",
	components: {
		Step1,
		Step2
	},
	data() {
		return {
			e1: 0
		}
	}
};
</script>
<style lang="scss" scoped>
.v-stepper {
	width: 100%;
}
</style>
