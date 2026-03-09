<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 shadow-lg w-96 rounded">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border w-full p-2 mb-3 rounded"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border w-full p-2 mb-3 rounded"
      />

      <button
        @click="login"
        class="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>

      <p class="mt-4 text-sm text-center">
        Don't have an account?
        <span @click="$router.push('/signup')" class="text-blue-500 cursor-pointer">
          Signup
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { default as jwtDecode } from "jwt-decode"; 
import { API_URL } from "@/config.js"; // ✅ centralized backend URL

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert("Please fill all fields");
        return;
      }

      try {
        const res = await axios.post(`${API_URL}/api/auth/login`, { // ✅ use env variable
          email: this.email,
          password: this.password
        });

        localStorage.setItem("token", res.data.token);

        const decoded = jwtDecode(res.data.token);

        alert("Login successful");

        if (decoded.role === "employee") {
          this.$router.push("/dashboard");
        } else if (decoded.role === "employer") {
          this.$router.push("/admin");
        }

      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Invalid email or password");
      }
    }
  }
};
</script>
