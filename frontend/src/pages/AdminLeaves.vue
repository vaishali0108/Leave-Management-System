<template>
  <div class="min-h-screen bg-gray-100 p-10">
    <h2 class="text-3xl font-bold mb-6 text-center">All Leave Requests</h2>

    <div class="bg-white shadow rounded-lg p-6">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b">
            <th class="p-3">Leave Type</th>
            <th class="p-3">Start Date</th>
            <th class="p-3">End Date</th>
            <th class="p-3">Status</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaves" :key="leave._id" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ leave.leaveType }}</td>
            <td class="p-3">{{ new Date(leave.startDate).toLocaleDateString() }}</td>
            <td class="p-3">{{ new Date(leave.endDate).toLocaleDateString() }}</td>
            <td class="p-3">
              <span
                :class="{
                  'text-yellow-500 font-semibold': leave.status === 'Pending',
                  'text-green-600 font-semibold': leave.status === 'Approved',
                  'text-red-600 font-semibold': leave.status === 'Rejected'
                }"
              >
                {{ leave.status }}
              </span>
            </td>
            <td class="p-3">
              <button @click="approve(leave._id)" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2">
                Approve
              </button>
              <button @click="reject(leave._id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      leaves: []
    };
  },

  async mounted() {
    const token = localStorage.getItem("token"); // JWT token

    if (!token) {
      alert("You are not logged in");
      this.$router.push("/"); // Redirect to login
      return;
    }

    try {
      const res = await axios.get("https://leave-management-system-1-l7gl.onrender.com/api/leave/all-leaves", {
        headers: { Authorization: `Bearer ${token}` } // ✅ Send token
      });

      this.leaves = res.data;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error loading leave requests");
    }
  },

  methods: {
    async approve(id) {
      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `https://leave-management-system-1-l7gl.onrender.com/api/leave/approve/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } } // ✅ Send token
        );
        alert("Leave Approved");
        this.fetchLeaves(); // Reload leaves without full page reload
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error approving leave");
      }
    },

    async reject(id) {
      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `https://leave-management-system-1-l7gl.onrender.com/api/leave/reject/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } } // ✅ Send token
        );
        alert("Leave Rejected");
        this.fetchLeaves();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error rejecting leave");
      }
    },

    async fetchLeaves() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://leave-management-system-1-l7gl.onrender.com/api/leave/all-leaves", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.leaves = res.data;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
