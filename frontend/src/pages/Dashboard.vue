<template>
  <div class="h-screen bg-gray-100 flex flex-col">

    <!-- Navbar -->
    <div class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-blue-600">
        HuskyVoice Leave Portal
      </h1>

      <!-- Logout Button -->
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
      >
        Logout
      </button>
    </div>

    <!-- Main Dashboard -->
    <div class="flex-1 flex items-center justify-center">

      <div class="max-w-5xl w-full p-8">

        <!-- Welcome Section -->
        <div class="bg-white shadow rounded-lg p-6 mb-6">
          <h2 class="text-3xl font-bold mb-3">
            Welcome to Employee Leave Dashboard
          </h2>

          <p class="text-gray-600">
            This portal allows employees to easily manage their leave requests.
            You can apply for leave, track your requests, and stay updated with
            approval status from your employer.
          </p>
        </div>

        <!-- Buttons -->
        <div class="bg-white shadow rounded-lg p-8 text-center">

          <h3 class="text-xl font-semibold mb-6">
            Quick Actions
          </h3>

          <div class="flex justify-center gap-4">

            <router-link
              to="/apply-leave"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
            >
              Apply Leave
            </router-link>

            <router-link
              to="/my-leaves"
              class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow"
            >
              View My Leaves
            </router-link>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // remove JWT token
      localStorage.removeItem("token");
      
      // redirect to login page
      this.$router.push("/");
    }
  }
}
</script>