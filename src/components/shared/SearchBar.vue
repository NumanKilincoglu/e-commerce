<template>
  <div class="search_bar_custom">
    <VueIcon height="24px" color="black" icon="mdi:search" />
    <input
      v-model="search"
      @input="handle"
      type="text"
      :placeholder="holder"
      class="search_input"
    />
    <button class="clear-btn" @click="clear">
      <VueIcon icon="mdi:remove" width="24px" color="black" />
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    holder: {
      type: String,
      default: "Search...",
    },
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handle() {
      this.$emit("handleSearch", this.search);
    },
    clear() {
      this.search = " ";
      this.$emit("handleSearch", this.search);
    },
  },
};
</script>

<style scoped>
.search_bar_custom {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0 * x;
  border: 1.5px transparent solid;
  height: 40px;
  border: 1px #ccc transparent;
  border-bottom: 1px #ccc solid;
}

.search_bar_custom:hover {
  transition: 0.4s;
  border-color: rgb(98, 98, 98);
}

.search_input {
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 5px;
  border-width: 0px 0px 1px;
  background-color: #ffffff;
  text-align: left;
  letter-spacing: 0.5px;
  color: black;
  width: 90%;
  border-bottom: none;
  min-height: 25px !important;
  height: 28px;
}

.clear-btn {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.clear-btn:hover {
  background-color: transparent !important;
}

input:focus {
  outline: none;
}

.search_input {
  padding-left: 12px;
  outline-width: 0;
}

@media screen and (max-width: 576px) {
  .search_bar_custom {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }

  .search_input {
    margin-left: 0px;
    padding-left: 5px;
  }
}
</style>
