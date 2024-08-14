import { defineStore } from 'pinia';
import { useUserStore } from './userStore.js';
import router from "../router/index.js";

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    isOpen: JSON.parse(localStorage.getItem('cartIsOpen')) || false,
  }),
  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addItem(item) {
      const userStore = useUserStore();

      if (!userStore.isAuthenticated) {
        alert('You must be logged in to add items to the cart. Youre redirecting to Login page. Please wait...');

        this.clearStorage();
        router.push('/');
        return;
      }

      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.items.push(item);
      }
      this.saveToLocalStorage();
    },
    removeItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
      this.saveToLocalStorage();
    },
    proceedCheckout() {
      const userStore = useUserStore();

      if (!userStore.isAuthenticated) {
        alert('You must be logged in before proceed payment. Youre redirecting to Login page. Please wait...');

        this.clearStorage();
        router.push('/');
        return;
      }

      alert(
        "Total Sum: " + this.cartTotal.toFixed(2) + "\nThank you for shopping."
      );
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    clearStorage() {
      this.isOpen = false;
      localStorage.removeItem('isOpen');
    },
    toggleCart() {
      this.isOpen = !this.isOpen;
      this.saveToLocalStorage();
    },

    //Saves the current state of the cart to localStorage.
    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
      localStorage.setItem('cartIsOpen', JSON.stringify(this.isOpen));
    },
  },
});
