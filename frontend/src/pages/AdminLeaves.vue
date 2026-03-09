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
import { API_URL } from "@/config.js"; // ✅ centralized API URL

export default {
  data() {
    return {
      leaves: []
    };
  },

  async mounted() {
    this.fetchLeaves();
  },

  methods: {
    async fetchLeaves() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        this.$router.push("/");
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/leave/all-leaves`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.leaves = res.data;
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error loading leave requests");
      }
    },

    async approve(id) {
      const token = localStorage.getItem("token");
      try {
        await axios.put(`${API_URL}/api/leave/approve/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Leave Approved");
        this.fetchLeaves();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error approving leave");
      }
    },

    async reject(id) {
      const token = localStorage.getItem("token");
      try {
        await axios.put(`${API_URL}/api/leave/reject/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Leave Rejected");
        this.fetchLeaves();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error rejecting leave");
      }
    }
  }
};
</script>
