import ApiService from "@/utils/ApiService"

export default ({
    namespaced: true,

    state: {
        users: []
    },
    mutations: {
        SET_USER_LIST(state, resData) {
            state.users = resData
        },
    },
    actions: {
        // Get list of users
        fetchUserList({
            commit
        }) {
            return ApiService.adminUserList()
                .then(response => {
                    commit('SET_USER_LIST', response.data)
                })
        },
        // Update user
        updateStatus({
            commit
        }, userId) {
            return ApiService.updateUserStatus(userId)
                .then(response => {
                    commit('UPDATE_USER_STATUS', response.data)
                })
        },
        // Delete user
        deleteUser({
            commit
        }, userId) {
            return ApiService.deleteUser(userId)
                .then(response => {
                    commit('UPDATE_USER_STATUS', response.data)
                })
        }
    }
})