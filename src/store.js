import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

const requester = axios.create({
	baseURL: "http://api-navetest.herokuapp.com/v1"
})

axios.defaults.headers.common['Authorization'] = "bearer " + window.localStorage.getItem('token-app')

requester.interceptors.response.use((config) => {
	return config
}, function (error) {
	if (error.response.status === 401) {
		router.push('/')
	}
    return Promise.reject(error);
})

export default new Vuex.Store({
	state: {
		user: {
			"id": "",
			"name": "",
			"email": "",
			"rating": "",
			"created_at": "",
			"updated_at": "",
			"token": ""
		},
		listUsers: [],
		dataChampionschip: {},
		matches: [],
		step: 1,
		page: 9,
		btnRanking: false,
		btnGetOut: false,
		nrUsers: 0
	},
	getters: {
		getListUser: state => {
			return state.listUsers
			.sort((a,b) => {
				a.rating = parseFloat(a.rating)
				b.rating = parseFloat(b.rating)
				if(!a.rating) {
					a.rating = 0
				}
				if(!b.rating) {
					b.rating = 0
				}
				if (a.rating > b.rating) {
					return -1
				}
				if (a.rating < b.rating) {
					return 1
				}
				return 0
			})
		},
		getNameChampionschip: state => {
			return state.dataChampionschip.name
		}
	},
	mutations: {
		setUserData: (state, userData) => state.user = userData,
		setListUsers: (state, data) => state.listUsers = data,
		setChampionschip: (state, data) => state.dataChampionschip = data,
		setMatchs: (state, data) => state.matches = data,
		setStep: (state, s) => state.step = s,
		setPage: (state, p) => state.page = p,
		toggleBtnRanking: (state, s) => state.btnRanking = s,
		toggleBtnGetOut: (state, s) => state.btnGetOut = s,
		setNrUsers: (state, n) => state.nrUsers = n
	},
	actions: {
		login(ctx, params) {
			return requester.post('/users/login', params.dataUser )
			.then(response => {
				if(response.status === 200) {
					ctx.commit('setUserData',response.data)
					axios.defaults.headers.common = {'Authorization': "bearer " + response.data.token}
					window.localStorage.setItem('token-app', response.data.token)
					params.router.push('home')
				}
				return response
			}).catch(error => {
				alert('Verifique se o e-mail e/ou senha estão corretas')
				return error
			})
		},
		createNewUser(ctx, params) {
			return requester.post('/users/signup', params.newUser)
			.then(response => {
				if(response.status === 200) {
					ctx.commit('setUserData', response.data)
					ctx.dispatch('login', {
						dataUser: {
							email: params.newUser.email,
							password: params.newUser.password
						},
						router: params.router
					})
				}
			}).catch(error => {
				return error
			})
		},
		getUsers(ctx) {
			return requester.get('/users')
			.then(response => {
				if(response.status === 200) {
					ctx.commit('setListUsers', response.data)
				}
				return response
			})
			.catch(error => {
				return error
			})
		},
		createChampionschip(ctx, name) {
			return requester.post('/championships', {name: name})
			.then(response => {
				ctx.commit('setChampionschip', response.data)
				return response
			})
			.catch(error => {
				return error
			})
		},
		includeUsers(ctx, data) {
			return requester.put('/championships/'+ this.state.dataChampionschip.id, data)
			.then(response => {
				return response
			})
			.catch(error => {
				return error
			})
		},
		getMatches(ctx, page) {
			return requester.get('/championships/'+ this.state.dataChampionschip.id + '/matches?page=' + page)
			.then(response => {
				if(response.data.data.length > 0) {
					ctx.commit('setMatchs', response.data)	
				}
				return response
			})
			.catch(error => {
				return error
			})
		},
		updateResult(ctx, params) {
			return requester.put('/matches/'+ params.id, params.data)
			.then(response => {
				return response
			})
			.catch(error => {
				return error
			})
		}
	}
})
