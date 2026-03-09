<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 shadow-lg w-96 rounded">
      <h2 class="text-2xl font-bold mb-6 text-center">Signup</h2>

      <input 
        v-model="name"
        placeholder="Name"
        class="border w-full p-2 mb-3 rounded"
      />

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

      <select v-model="role" class="border w-full p-2 mb-4 rounded">
        <option value="employee">Employee</option>
        <option value="employer">Employer</option>
      </select>

      <button 
        @click="signup"
        class="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded"
      >
        Signup
      </button>

      <p class="mt-4 text-sm text-center">
        Already have account?
        <span @click="$router.push('/')" class="text-blue-500 cursor-pointer">
          Login
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
      name: "",
      email: "",
      password: "",
      role: "employee"
    };
  },

  methods: {
    async signup() {
      if (!this.name || !this.email || !this.password) {
        alert("Please fill all fields");
        return;
      }

      try {
        const res = await axios.post(`${API_URL}/api/auth/signup`, { // ✅ use env variable
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        });

        // Save JWT token
        localStorage.setItem("token", res.data.token);

        // Decode token to get role
        const decoded = jwtDecode(res.data.token);

        alert("Signup successful");

        // Redirect based on role
        if (decoded.role === "employee") {
          this.$router.push("/dashboard");
        } else if (decoded.role === "employer") {
          this.$router.push("/admin");
        }

      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Signup failed");
      }
    }
  }
};
</script>
