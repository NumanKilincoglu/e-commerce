import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
        username: localStorage.getItem('username') || '',
    }),
    actions: {
        setAuthenticated(value) {
            this.isAuthenticated = value;
            localStorage.setItem('isAuthenticated', JSON.stringify(value));
        },
        setUsername(username) {
            this.username = username;
            localStorage.setItem('username', username);
        },
        logout() {
            this.isAuthenticated = false;
            this.username = '';
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('username');
        },
    },
});
