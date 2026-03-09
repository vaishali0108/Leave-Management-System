const express = require("express");
const router = express.Router();

const Leave = require("../models/Leave");
const auth = require("../middleware/authMiddleware"); // JWT auth middleware


// ================= APPLY LEAVE (Employee) =================
router.post("/apply-leave", auth, async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = new Leave({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending"
    });

    await leave.save();
    
    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= EMPLOYEE → VIEW MY LEAVES =================
router.get("/my-leaves", auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id });
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= EMPLOYER → VIEW ALL LEAVES =================
router.get("/all-leaves", auth, async (req, res) => {
  try {
    // Check if user is employer
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leaves = await Leave.find();
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= APPROVE LEAVE (Employer) =================
router.put("/approve/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.json({ message: "Leave approved", leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= REJECT LEAVE (Employer) =================
router.put("/reject/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.json({ message: "Leave rejected", leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;