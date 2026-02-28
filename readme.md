I'll help you transform this README into a professional, polished version. Let me first check the actual GitHub repository to ensure I have the most accurate and up-to-date information about your project.  
 Here's your professionally rewritten README with improved structure, clarity, and presentation:

```markdown
# 📱 Custom OTP System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A lightweight, cost-effective OTP (One Time Password) verification system built with Node.js and Express. Uses your Android device as an SMS gateway—perfect for small-scale applications requiring ~20 SMS/day without third-party SMS provider costs.

---

## ✨ Features

- 🔢 **6-digit OTP Generation** - Secure random code generation
- ⏱️ **Time-bound Security** - 5-minute expiration window
- 🛡️ **Attempt Limiting** - Maximum 3 verification attempts per OTP
- 🚦 **Rate Limiting** - Anti-spam protection (5 requests/minute)
- 📱 **Android SMS Gateway** - Use your own phone to send SMS
- 🧹 **Auto-cleanup** - OTPs deleted after successful verification
- 🔄 **Single Active OTP** - Only one valid OTP per phone number at a time

---

## 🏗️ Architecture
```

┌─────────┐ ┌──────────────┐ ┌─────────┐
│ User │────▶│ Express API │────▶│ MongoDB │
└─────────┘ └──────────────┘ └─────────┘
│
▼
┌──────────────┐
│ Android SMS │
│ Gateway │
└──────────────┘
│
▼
┌──────────────┐
│ SMS Sent │
└──────────────┘

````

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- [MongoDB](https://www.mongodb.com/) running locally or cloud instance
- Android device with SMS capability
- Both devices on the same WiFi network

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Himanshu4-Deshmukh/otp-system.git
   cd otp-system
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Environment Configuration

Create a `.env` file in the project root:

```env
# Database
MONGO_URI=mongodb://127.0.0.1:27017/otpdb

# SMS Gateway (Android Phone IP)
SMS_API_URL=http://192.168.1.x:8080/send-sms

# Server
PORT=5000
```

> **Note:** Replace `192.168.1.x` with your Android device's actual IP address (see setup below).

---

## 📱 Android SMS Gateway Setup

### 1. Install SMS Gateway App

Download [Simple SMS Gateway](https://play.google.com/store/apps/details?id=com.pabrikaplikasi.simplesmsgateway) from the Play Store.

### 2. Network Configuration

- Ensure your Android phone and server are on the **same WiFi network**
- Keep the SMS Gateway app running in the foreground or background

### 3. Find Your Phone's IP Address

```
Settings → WiFi → [Connected Network] → IP Address
```

### 4. Verify Connectivity

Open your browser and navigate to:

```
http://YOUR_PHONE_IP:8080
```

You should see the SMS Gateway API interface.

---

## 🖥️ Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

**Expected Output:**

```
✓ MongoDB Connected
✓ Server running on port 5000
```

---

## 📡 API Reference

Base URL: `http://localhost:5000/api/otp`

### Send OTP

**Endpoint:** `POST /send-otp`

**Request Body:**

```json
{
  "phone": "9876543210",
  "message": "Your verification code is: {otp}"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Error Responses:**

- `429` - Rate limit exceeded
- `500` - SMS gateway error

---

### Verify OTP

**Endpoint:** `POST /verify-otp`

**Request Body:**

```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**Error Responses:**

- `400` - Invalid OTP or exceeded attempts
- `404` - OTP expired or not found
- `429` - Too many verification attempts

---

## 🔐 Security Features

| Feature              | Implementation                                    |
| -------------------- | ------------------------------------------------- |
| **Expiration**       | 5-minute TTL on all OTPs                          |
| **Attempt Limiting** | Max 3 verification attempts                       |
| **Rate Limiting**    | 5 requests per minute per IP                      |
| **Auto-deletion**    | OTP removed after successful verification         |
| **Singleton OTP**    | New OTP invalidates previous ones for same number |

---

## 📁 Project Structure

```
otp-system/
├── server.js              # Application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in git)
├── .env.example           # Example environment template
├── models/
│   └── Otp.js            # Mongoose OTP schema
├── routes/
│   └── otpRoutes.js      # API route definitions
└── utils/
    └── sendSms.js        # SMS gateway integration
```

---

## 🧪 Testing

### Using cURL

**Send OTP:**

```bash
curl -X POST http://localhost:5000/api/otp/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "message": "Test OTP: {otp}"}'
```

**Verify OTP:**

```bash
curl -X POST http://localhost:5000/api/otp/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "otp": "123456"}'
```

### Using Postman

Import the provided `postman-collection.json` (if available) or use the endpoints above.

---

## ⚠️ Limitations & Considerations

- **Scale:** Designed for ~20 SMS/day (Android device limitation)
- **Network:** Requires local WiFi connection between server and phone
- **Availability:** Phone must be powered on with app running
- **Carrier Rates:** Standard SMS rates from your carrier apply

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Himanshu Deshmukh**

- GitHub: [@Himanshu4-Deshmukh](https://github.com/Himanshu4-Deshmukh)

---

## 🙏 Acknowledgments

- [Simple SMS Gateway](https://play.google.com/store/apps/details?id=com.pabrikaplikasi.simplesmsgateway) for the Android app
- Built with [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/)

```

---


```
