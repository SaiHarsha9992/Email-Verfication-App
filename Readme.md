# MERN Stack Email Verification Application

A full-stack MERN (MongoDB, Express, React, Node.js) application demonstrating a complete and secure user registration flow with email verification using JSON Web Tokens (JWT). This project is built to production-grade standards, focusing on security, scalability, and a clean user experience.

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Live Demo & Screenshots](#live-demo--screenshots)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Design Choices & Implementation](#design-choices--implementation)
- [Setup and Run Instructions](#setup-and-run-instructions)
- [API Endpoints](#api-endpoints)
- [Deployment Notes](#deployment-notes)

## Project Overview
This application addresses a critical component of modern web services: secure user onboarding. It implements a robust signup system where new users must verify their email address via a time-sensitive link before their account becomes active. This process prevents spam, ensures users provide a valid email, and establishes a trusted communication channel.

## Key Features
- **Secure Signup Flow:** Users register with their name, email, and a strong password.
- **Inactive Account on Creation:** New accounts are created in an inactive state (`isVerified: false`) in the database.
- **Secure, Time-Bound JWT Tokens:** On signup, a unique JWT is generated, signed with a server-side secret, and includes a 15-minute expiry.
- **Automated Email Verification:** Users receive an email with a unique verification link.
- **Account Activation:** Clicking the link validates the token. If valid and not expired, the user's account is marked as active.
- **Error Handling:** Invalid or expired tokens result in a clear error message on the frontend.
- **Resend Verification Link:** *(Future implementation)* Users can request a new verification email.
- **Password Strength Meter:** Real-time feedback on the signup form helps users create strong, secure passwords.

## Live Demo & Screenshots
*(Optional) A live demo is hosted here: [Link to Deployed App]*  

- **Frontend:** [https://email-verification-trizen-app.vercel.app](https://email-verification-trizen-app.vercel.app).  
- **Backend:** [https://email-verfication-app.onrender.com](https://email-verfication-app.onrender.com)

1. **Signup Page with Password Validation:** Users get real-time feedback on password strength.
2. **Verification Email Sent:** Notification appears after successful submission.
3. **Verification Email:** Professionally formatted email with a call-to-action button.
4. **Successful Verification:** Confirmation page after clicking the link.
5. **Dashboard Access:** Verified users can log in and access their dashboard.

## Tech Stack & Libraries

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt.js
- Nodemailer
- dotenv

**Frontend**
- React.js
- React Router
- Axios
- Tailwind CSS

## Design Choices & Implementation

1. **Token Strategy: JWT vs. Database Token**
   - **Stateless:** Token payload contains all necessary info; no database lookup needed.
   - **Security:** Signed on server; authenticity verifiable without DB.
   - **Built-in Expiration:** `expiresIn` option manages token expiry reliably.

2. **Account State Management**
   - `isVerified` boolean field in the User schema controls account activation.
   - Login checks this flag to restrict access to protected routes.

3. **Email Delivery**
   - Nodemailer with SMTP.
   - Credentials stored in `.env` for security.
   - HTML email formatting for better UX.

4. **Security Considerations**
   - **Password Hashing:** Bcrypt used to hash and salt passwords.
   - **Token Invalidation:** Tokens become effectively invalid after verification.
   - **Environment Variables:** Sensitive data stored in `.env` files.

## Setup and Run Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud, e.g., MongoDB Atlas)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-username/Email-Verfication-App.git
cd Email-Verfication-App/backend

# Install dependencies
npm install

# Create a .env file in the /backend directory with the following variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
BASE_URL=http://localhost:3000
EMAIL_HOST=your_smtp_host
EMAIL_USER=your_smtp_email_address
EMAIL_PASS=your_smtp_password

# Start the server
npm start

```
### Frontend Setup
```bash

# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the React development server
npm start
The application will be available at http://localhost:3000.
```
## API Endpoints

| Method | Endpoint               | Description                                  |
|--------|------------------------|----------------------------------------------|
| POST   | `/api/auth/signup`     | Registers a new user and sends verification email |
| POST   | `/api/auth/login`      | Logs in a verified user                      |
| GET    | `/api/auth/verify/:token` | Verifies the email using the provided token |
| GET    | `/api/auth/profile`    | Retrieves the logged-in user's profile      |

## Deployment Notes

- **Frontend:** Successfully deployed on Vercel.  
- **Backend:** Successfully deployed on Render.  

## Deployment Notes

- **Frontend:** Successfully deployed on Vercel.  
- **Backend:** Successfully deployed on Render.  

**Note:**  

- During development, I tried using SMTP (e.g., Gmail or Mailgun) for sending verification emails, and it worked perfectly on localhost.  
- However, after deploying the backend to Render, email sending does not work because Render blocks outgoing SMTP connections on standard ports (587/465).  
- This causes the signup process to hang when trying to send emails from the deployed backend.  

**Possible Solutions:**  

1. Use an email API service like Mailgun, SendGrid, or Postmark via their HTTP API instead of SMTP.  
2. Alternatively, deploy the backend to a VPS or cloud server that allows outbound SMTP connections.  
3. Ensure all SMTP credentials are correctly configured in environment variables.
