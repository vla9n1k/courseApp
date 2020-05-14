const state = {
    notification: []
};

const getters = {
    getNotifications(state) {
        return state.notification
    }
};

const mutations = {
    addNotify(state, data) {
        state.notification.push(data);
    },
    removeLastNotify(state) {
        if (state.notification.length > 0) {
            state.notification.shift();
        }
    }
};

const actions = {
    addNotification({commit}, data) {
        commit('addNotify', data);
        setTimeout(() => {commit('removeLastNotify')}, 3500)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}