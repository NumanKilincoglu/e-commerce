<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <h2>Note</h2>
        <h6>Username=user</h6>
        <h6>passsword=password</h6>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore.js";

export default {
  setup() {
    const username = ref("user");
    const password = ref("password");
    const router = useRouter();
    const userStore = useUserStore();

    const login = () => {
      if (username.value === "user" && password.value === "password") {
        // Set isAuthenticated to true
        
        userStore.setAuthenticated(true);
        userStore.setUsername(username.value);
        router.push("/products"); // Redirect after login
      } else {
        alert("Invalid credentials");
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-color: #f0f0f0;
}

.login-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
