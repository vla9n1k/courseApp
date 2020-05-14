const state = {
    socket: null
};

const getters = {

};

const mutations = {
};

const actions = {
    'SOCKET_INIT'({commit}, payload) {
        commit('SOCKET_CHANGE', payload)
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
}