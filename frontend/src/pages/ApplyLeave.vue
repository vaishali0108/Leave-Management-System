<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Apply for Leave
      </h2>

      <!-- Leave Type -->
      <label class="block mb-1 text-gray-600">Leave Type</label>
      <input
        v-model="leaveType"
        placeholder="Sick Leave / Casual Leave"
        class="border w-full p-2 rounded mb-4"
      />

      <!-- Start Date -->
      <label class="block mb-1 text-gray-600">Start Date</label>
      <input
        v-model="startDate"
        type="date"
        class="border w-full p-2 rounded mb-4"
      />

      <!-- End Date -->
      <label class="block mb-1 text-gray-600">End Date</label>
      <input
        v-model="endDate"
        type="date"
        class="border w-full p-2 rounded mb-4"
      />

      <!-- Reason -->
      <label class="block mb-1 text-gray-600">Reason</label>
      <textarea
        v-model="reason"
        placeholder="Write your reason..."
        class="border w-full p-2 rounded mb-6"
      ></textarea>

      <!-- Button -->
      <button
        @click="apply"
        class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
      >
        Submit Leave Request
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config.js"; // ✅ centralized API URL

export default {
  data() {
    return {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: ""
    };
  },

  methods: {
    async apply() {
      // validation
      if (!this.leaveType || !this.startDate || !this.endDate || !this.reason) {
        alert("Please fill all fields");
        return;
      }

      try {
        await axios.post(
          `${API_URL}/api/leave/apply-leave`, // ✅ use env variable
          {
            leaveType: this.leaveType,
            startDate: this.startDate,
            endDate: this.endDate,
            reason: this.reason
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );

        // success message
        alert("Leave Applied Successfully");

        // reset form
        this.leaveType = "";
        this.startDate = "";
        this.endDate = "";
        this.reason = "";

        // redirect to My Leaves page
        this.$router.push("/my-leaves");
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          alert("Unauthorized. Please login again.");
        } else {
          alert("Error applying leave");
        }
      }
    }
  }
};
</script>
