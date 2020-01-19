import axios from 'axios'
import ApiService from "@/utils/ApiService"

export default ({
    state: {
        token: null,
        user: null,
        userEmail: null
    },
    mutations: {
        // RESTORE USER DATA FROM LOCAL STORAGE
        RESTORE_USER_DATA(state, userData) {
            state.user = userData
        },

        // LOGIN
        SET_USER_DATA(state, resData) {
            // Login action Set userdata into localstorage (if page refresh it keep the token and info)
            state.token = resData.token
            state.user = resData
            state.userEmail = resData.userEmail
            // Local storage expect string so we user stringify to change JSON into string
            localStorage.setItem('user', JSON.stringify(resData))
            // Set header Bearer token
            axios.defaults.headers.common['Authorization'] = `Bearer ${
        resData.token
      }`
        },

        // LOGOUT
        CLEAR_USER_DATA() {
            // Clear local storage removing user data
            localStorage.removeItem("user")
            // Refresh the page, vuex state and axios won"t survive this refresh so clear out all info
            location.reload()
        }
    },
    actions: {
        login({
            commit
        }, credentials) {
            return ApiService.userLogin(credentials)
                .then(response => {
                    commit('SET_USER_DATA', response.data)
                })
        },
        logout({
            commit
        }) {
            commit(("CLEAR_USER_DATA"))
        },
        // REGISTRATION ACTIONS
        registerValidate(credentials) {
            return ApiService.registerValidate(credentials)
        },
        registerConfirmation(credentials) {
            console.log("send validation", credentials)
            return ApiService.regConfirmation(credentials)
        },
        registerPending(credentials) {
            return ApiService.registerPending(credentials)
        },
        forgotPassword(credentials) {
            return ApiService.forgotPassword(credentials)
        },
        resetPassword({
            commit
        }, credentials) {
            return ApiService.resetPassword(credentials)
                .then(response => {
                    commit('SET_USER_DATA', response.data)
                })
        },
        // GENERAL SECURITY
        // Used in navigation guard to check token before going to new route, logout user if token not valid anymore.
        checkToken({
            commit
        }, token) {
            return ApiService.checkToken(token)
                .then(response => {
                    console.log(response.data)
                }).catch(err => {
                    if (err.response.data.statusCode === 401) {
                        commit('CLEAR_USER_DATA')
                    }

                })
        }
    },
    getters: {
        // Help identifying if there is a user in state (to show or hide login button for example using v-if="!loggedIn")
        loggedIn(state) {
            // double !! return a boolean depending if value is true or false
            return !!state.token
        },
        // Help identifying if the user is admin
        isAdmin(state) {
            return !!state.user.isAdmin
        }
    }
})