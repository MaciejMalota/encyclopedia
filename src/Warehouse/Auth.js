import axios from 'axios';
import router from '../router';

const state = {
    token: localStorage.getItem('token') || '',
    permission: localStorage.getItem('permission'),
    user: {},
    users: {},
    status: '',
    error: null
};

const getters = {
    // isLoggedIn: function (state) {
    //     if (state.token != '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.permission==3,
    isModerator: state => state.permission>=2,
    authState: state => state.status,
    user: state => state.user,
    users: state => state.users,
    error: state => state.error
};

const actions = {
    // Login Action
    async login({
        commit
    }, user) {
        commit('auth_request');
      
        try {
            let res = await axios.post('http://localhost:5000/api/users/login', user)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                localStorage.setItem('permission', user.permission);
                
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:5000/api/users/register', userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // Update User
    // async update({
    //     commit
    // }, userData) {
    //     try {
    //         commit('register_request');
    //         let res = await axios.put('http://localhost:5000/api/users/:id', userData);
    //         if (res.data.success !== undefined) {
    //             commit('register_success');
    //         }
    //         return res;
    //     } catch (err) {
    //         commit('register_error', err)
    //     }
    // },
    // // Delete User
    // async delete({
    //     commit
    // }) {
        
    //         commit('register_request');
    //         let res = await axios.put('http://localhost:5000/api/users/:id');
    //         if (res.data.success !== undefined) {
    //             commit('register_success');
    //         }
    //         return res;
       
    // },
    // Get the user Profile
    async getProfile({
        commit
    }) {
        commit('profile_request');
        let res = await axios.get('http://localhost:5000/api/users/profile')
        commit('user_profile', res.data.user)
        return res;
    },
    //get users
    async getUsers({
        commit
    }) {
        commit('users_request');
        let res = await axios.get('http://localhost:5000/api/users/')
        commit('users_profiles', res.data)
      
        return res;
    },
    // Logout the user
    async logout({
        commit
    }) {
        await localStorage.removeItem('token');
        await localStorage.removeItem('permission');
        
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    }
};

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    users_request(state) {
        state.status = 'loading'
    },
    users_profiles(state, users) {
        state.users = users
    },
    user_profile(state, user) {
        state.user = user
    }
};

export default {
    state,
    actions,
    mutations,
    getters
    
};