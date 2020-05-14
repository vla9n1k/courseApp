import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import notify from './modules/notify'
import ws from './modules/websocket'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        user,
        notify,
        ws
    }
});