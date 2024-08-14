import { defineStore } from 'pinia';

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
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
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
