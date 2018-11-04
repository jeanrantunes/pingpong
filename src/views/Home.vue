<template>
	<div>
		<h1>Home</h1>
		<v-layout row wrap align-center>
			<v-stepper v-model="step">
				<v-stepper-header>
					<v-stepper-step :complete="step > 1" step="1">Iniciar campeonato</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="step > 2" step="2">Escolha de jogadores</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step step="3">Visualizar partidas</v-stepper-step>
					</v-stepper-header>

					<v-stepper-items>
					<v-stepper-content step="1">
						<step1 v-if="step == 1" @go-step-2="setStep(2)"></step1>
					</v-stepper-content>

					<v-stepper-content step="2">
						<step2 v-if="step == 2" @go-step-3="setStep(3)"></step2>	
						<v-btn flat left @click="setStep(1)" class="prev">Anterior</v-btn>
					</v-stepper-content>

					<v-stepper-content step="3">
						<step3 v-if="step == 3"></step3>
						<v-btn flat left @click="setStep(2)" class="prev">Anterior</v-btn>	
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</v-layout>
	</div> 
</template>

<script>
import Step1 from '@/components/Step1.vue'
import Step2 from '@/components/Step2.vue'
import Step3 from '@/components/Step3.vue'
export default {
	name: "Home",
	components: {
		Step1,
		Step2,
		Step3
	},
	beforeMount() {
		this.$store.commit('toggleBtnRanking', true)
		this.$store.commit('toggleBtnGetOut', true)
	},
	data() {
		return {
			step: this.$store.state.step
		}
	},
	methods: {
		setStep(step) {
			this.step = step
			this.$store.commit('setStep',step)
		}
	}
};
</script>
<style lang="scss">
.v-stepper {
	width: 100%;
	.v-stepper__wrapper {
		min-height: 200px;
	}
}
.loadind-container {
	display: flex;
	justify-content: center;
}
.prev {
	float: left;
}
.custom-loader {
	animation: loader 1s infinite;
	display: flex;
	i {
		font-size: 130px;
	}
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
