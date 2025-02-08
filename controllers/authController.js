import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, sendOTP, hashOTP, verifyOTP } from "../services/otpService.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, date_of_birth, employment_status } = req.body;

  
    if (!name || !email || !password || !phone || !date_of_birth || !employment_status) {
      return res.status(400).json({ message: "All required fields must be filled!" });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      date_of_birth,
      employment_status
    });


    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Error in registration:", error);
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user and return JWT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    const hashedOtp = await hashOTP(otp);
    const otpExpires = new Date(Date.now() + 5 * 60000); // Valid for 5 minutes

    // Save OTP in DB
    await User.findOneAndUpdate(
      { email },
      { email, otp: hashedOtp, otpExpires },
      { upsert: true, new: true }
    );

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Verify OTP and Login
const verifyOTPAndLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const user = await User.findOne({ email });
    if (!user || !user.otpExpires || user.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired or invalid" });

    const isOtpValid = await verifyOTP(otp, user.otp);
    if (!isOtpValid) return res.status(400).json({ message: "Invalid OTP" });

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Clear OTP after successful login
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const authController = {
  registerUser,
  loginUser,
  verifyOTPAndLogin,
  requestOTP
};

export default authController;