import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import { v4 as uuidv4 } from 'uuid';
// ---------------------- SIGNUP ----------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const accountId = uuidv4();
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      accountId: accountId,
      verificationToken: token,
      tokenExpiry: Date.now() + 15 * 60 * 1000,
    });

    const link = `${process.env.BASE_URL}/api/auth/verify/${token}`;
    await sendEmail(email, "Verify your Email", `<a href="${link}">Click here to verify your email</a>`);

    res.status(201).json({ message: "Verification email sent! Please check your inbox." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------- VERIFY EMAIL ----------------------
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email, verificationToken: token });

    if (!user) return res.status(400).send("<h3>Invalid token</h3>");
    if (user.tokenExpiry < Date.now()) return res.status(400).send("<h3>Token expired. Please resend.</h3>");

    user.isVerified = true;
    user.verificationToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();

    // Redirect to login page after success
    const redirectURL = "https://email-verfication-app.vercel.app/login";
    res.send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="3;url=${redirectURL}" />
          <style>
            body { font-family: Arial; text-align:center; margin-top:50px; }
          </style>
        </head>
        <body>
          <h2>Email verified successfully ✅</h2>
          <p>Redirecting to login...</p>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(400).send("<h3>Invalid or expired token</h3>");
  }
};

// ---------------------- LOGIN ----------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified) return res.status(401).json({ message: "Please verify your email first" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------- PROTECTED USER INFO ----------------------
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
// ---------------------- RESEND VERIFICATION ----------------------
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    user.verificationToken = token;
    user.tokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const link = `${process.env.BASE_URL}/api/auth/verify/${token}`;
    
    await sendEmail(email, "Resend Verification Link", `<a href="${link}">Click here to verify again</a>`);

    res.json({ message: "New verification email sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

