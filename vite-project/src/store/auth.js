
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: useLocalStorage('token', null),
    }),
    getters: {
        getToken: (state) => state.token,
    },
    actions: {
        isAuthenticated() {
            return this.token !== null;
        },
        async login({ email, password }) {
            try {
                const {
                    data: {  token }
                } = await axios.post(domain + '/api/login', {
                    email,
                    password
                });
                this.token = token;
            } catch ({ response }) {
                // alert('auth ='+ response);
                throw new Error(response.data.message);
            }
        }
    }
});