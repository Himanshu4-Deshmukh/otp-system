const express = require("express");
const router = express.Router();
const Otp = require("../models/Otp");
const sendSms = require("../utils/sendSms");

// Generate OTP
router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expires = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.findOneAndUpdate(
    { phone },
    { otp, expiresAt: expires, attempts: 0 },
    { upsert: true }
  );

  await sendSms(phone, `Your OTP is ${otp}`);

  res.json({ message: "OTP sent" });
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  const record = await Otp.findOne({ phone });

  if (!record) return res.status(400).json({ message: "No OTP found" });

  if (record.expiresAt < new Date())
    return res.status(400).json({ message: "OTP expired" });

  if (record.attempts >= 3)
    return res.status(400).json({ message: "Too many attempts" });

  if (record.otp !== otp) {
    record.attempts += 1;
    await record.save();
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await Otp.deleteOne({ phone });

  res.json({ message: "OTP verified" });
});

module.exports = router;