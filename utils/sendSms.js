const axios = require("axios");

const sendSms = async (phone, message) => {
  try {
    await axios.post(process.env.SMS_API_URL, {
      phone: phone,
      message: message
    });
    console.log("SMS sent successfully");
  } catch (err) {
    console.error("SMS failed:", err.message);
  }
};

module.exports = sendSms;