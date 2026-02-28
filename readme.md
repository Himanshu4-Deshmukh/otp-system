````markdown
# 📱 Custom OTP System

### Node.js + Express + Android SMS Gateway

A lightweight OTP (One Time Password) system built using:

- Node.js
- Express.js
- MongoDB
- Android Phone as SMS Gateway

Designed specifically for small-scale usage (~20 SMS/day).

---

## 🚀 Features

- Generate 6-digit OTP
- 5-minute expiry
- Maximum 3 verification attempts
- Rate limiting (anti-spam protection)
- Uses your Android phone to send SMS
- Simple REST API

---

# 🏗 Architecture

User → Website → Express Server → MongoDB  
 ↓  
 Android SMS Gateway  
 ↓  
 Sends SMS

---

## 📦 Installation Guide

### 1️⃣ Clone the Project

```bash
git clone <your-repo-url>
cd otp-system
```
````

---

### 2️⃣ Install Dependencies

```bash
npm install
```

Dependencies used:

- express
- mongoose
- axios
- dotenv
- cors
- express-rate-limit

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/otpdb
SMS_API_URL=http://192.168.1.8:8080/send-sms
PORT=5000
```

Replace `192.168.1.8` with your phone’s actual IP address.

---

## 📱 Android SMS Gateway Setup

1. Install SMS Gateway API app from Play Store:
   [https://play.google.com/store/apps/details?id=com.pabrikaplikasi.simplesmsgateway](https://play.google.com/store/apps/details?id=com.pabrikaplikasi.simplesmsgateway)

2. Make sure:
   - Phone and PC are connected to the same WiFi network

3. Check your phone IP:
   - Settings → WiFi → Connected Network → IP Address

4. Confirm API endpoint works in browser:

```
http://YOUR_PHONE_IP:8080
```

---

## 🖥 Start the Server

```bash
npm start
```

You should see:

```
MongoDB Connected
Server running on port 5000
```

---

## 📡 API Endpoints

Base URL:

```
http://localhost:5000/api/otp
```

---

## 🔵 Send OTP

### Endpoint

```
POST /send-otp
```

### Request Body (JSON)

```json
{
  "phone": "8010762927",
  "message": "Test from Postman"
}
```

### Response

```json
{
  "message": "OTP sent"
}
```

---

## 🔵 Verify OTP

### Endpoint

```
POST /verify-otp
```

### Request Body (JSON)

```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

### Success Response

```json
{
  "message": "OTP verified"
}
```

---

## 🔐 Security Rules Implemented

- OTP expires in 5 minutes
- Maximum 3 verification attempts
- OTP deleted after successful verification
- Rate limit: 5 requests per minute
- Only one active OTP per phone number

---

## 🛠 Project Structure

```
otp-system/
│
├── server.js
├── models/
│     └── Otp.js
├── routes/
│     └── otpRoutes.js
├── utils/
│     └── sendSms.js
├── .env
└── package.json
```

---

## 🧪 Testing With Postman

### Send OTP

```
POST http://localhost:5000/api/otp/send-otp
```

Body:

```json
{
  "phone": "8010762927",
  "message": "Test from Postman"
}
```

---

### Verify OTP

```
POST http://localhost:5000/api/otp/verify-otp
```

Body:

```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```
