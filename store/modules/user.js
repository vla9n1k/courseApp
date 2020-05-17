import {router} from '../../router'

const serverUrl = process.env.VUE_APP_SERVER_URL;

const state = {
    userId: null,
    token: null,
    isAuth: false,
    balance: null,
    role: null
};


const getters = {
    isLogged() {
        return state.isAuth
    },
    getId() {
        return state.userId;
    },
    getBalance() {
        return state.balance;
    },
    getRole() {
        return state.role;
    }
};

const mutations = {
    'SOCKET_loggedIn'(state, payload) {
        state.balance = payload.balance
    },
    'SOCKET_balanceUpdate'(state, payload) {
        state.balance = payload.balance;
    },
    'SOCKET_sendStatus'(state, payload) {
        state.role = payload.statusId
    },
    userLogin(state, userData) {
        state.userId = userData.userId;
        state.token = userData.token;
        state.isAuth = true;
    },
    clearAuthData(state) {
        state.userId = null;
        state.token = null;
        state.isAuth = null;
        state.role = null;
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
    }
};

const actions = {
    // eslint-disable-next-line no-unused-vars
    async signUp({commit}, signUpData) {
        const result = await fetch(`${serverUrl}auth/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
        });
        const data = await result.json();

        if (result.status === 201) {
            data.success = true;
        }
        return data;
    },
    async login({commit}, loginData) {
        const result = await fetch(`${serverUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        const data = await result.json();
        if (result.status === 200) {
            commit('userLogin', {
                userId: data.id,
                token: data.token,
                balance: data.balance,
                role: data.role
            });
            localStorage.setItem('id', data.id);
            localStorage.setItem('token', data.token);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            await router.push('/shop');
            data.success = true;
        }
        return data
    },

    tryAutoLogin({commit}) {
        const token = localStorage.getItem('token');
        if (!token) {
            return
        }
        const expiryDate = localStorage.getItem('expiryDate');
        const now = new Date;
        if (now >= new Date(expiryDate)) {
            return
        }
        const userId = localStorage.getItem('id');
        this._vm.$socket.emit('getStatus', userId);

        commit('userLogin', {
            userId,
            token,
        })
    },
    logout({commit}) {
        commit('clearAuthData');
        router.push('/login')
    },
    setAutoLogout({dispatch}, ms) {
        setTimeout(() => {
            dispatch('logout')
        }, ms)
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
}