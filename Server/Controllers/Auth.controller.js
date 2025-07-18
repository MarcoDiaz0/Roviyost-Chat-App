import bcrypt from "bcryptjs";
import { CheckEmail, CheckPassword } from "../Utils/CheckCredetials.js";
import Users from "../Models/User.module.js";
import { sendMail } from "../Utils/SendMail.js";
import { GenerateToken } from "../Utils/Token.js";
import { uploadImage } from "../Utils/ImageUplaoder.js";
//! Register a new user
export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (
    !username?.trim() ||
    !email?.trim() ||
    !password?.trim() ||
    !confirmPassword?.trim()
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Please Provide All Fields" });
  }
  try {
    const validEmail = await CheckEmail(email);
    if (!validEmail.success) {
      return res
        .status(400)
        .json({ success: false, error: { email: validEmail.email } });
    }
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { username: "This Username already exists" },
      });
    }
    const validPassword = CheckPassword(password, confirmPassword);
    if (!validPassword.success) {
      return res.status(400).json({
        success: false,
        error: {
          password: validPassword.password,
          confirmPassword: validPassword?.confirmPassword,
        },
      });
    }

    const OTPNumber = Math.floor(100000 + Math.random() * 900000);

    await sendMail({
      from: {
        name: "Social Media",
        address: "nearbyfoood@gmail.com",
      },
      to: email,
      subject: "Confirmation Code",
      text: String(OTPNumber),
      html: `<b>Your Confirmation Code Is: ${OTPNumber} </b>`,
    });
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      OTPcode: OTPNumber,
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//! Account Confirmation
export const AccountConfirmation = async (req, res) => {
  const { OTPcode, email } = req.body;
  if (!OTPcode || !email) {
    return res.status(400).json({
      success: false,
      error: { OTPError: "Please Provide All Fields" },
    });
  }

  try {
    const user = await Users.findOne({ email }).select(
      "username email OTPcode profilePicture bio"
    );

    if (user?.OTPcode != OTPcode) {
      return res.status(400).json({
        success: false,
        error: { OTPError: "The Verification Code Was Incorrect" },
      });
    }
    await Users.findOneAndUpdate(
      { email },
      {
        $set: { verified: true, OTPcode: null },
      }
    );

    GenerateToken(user._id, res);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//! Login
export const Login = async (req, res) => {
  const { email, password } = req.body;
  

  if (!email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json({ success: false, error: "Please Provide All Fields" });
  }
  try {
    const user = await Users.findOne({ email }).select(
      "password username email profilePicture bio OTPcode"
    );
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        GenerateToken(user._id, res);
        user.password = "";
        res.status(200).json({ success: true, user });
      } else {
        return res.status(404).json({
          success: false,
          error: { password: "Password Is Incorrect " },
        });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, error: { email: "Email Not Found" } });
    }
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//! Logout
export const Logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "Logged Out successfully" });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//! Update Profile
export const updateProfile = async (req, res) => {
  const profilePicture = req.files?.profilePicture;
  const { bio, username } = req.body;
  if (!profilePicture && !bio && !username) {
    return res.status(400).json({ message: "Nothing To Update" });
  }

  let newProfile = {};
  if (username) {
    const existingUser = await Users.findOne({
      username,
      _id: { $ne: req.user._id },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { message: "This username already exists" },
      });
    }
    newProfile.username = username;
  }
  let imageURL;
  if (profilePicture) {
    imageURL = await uploadImage(profilePicture);
    if (!imageURL) {
      return res
        .status(500)
        .json({ error: { message: "Failed to upload image" } });
    } else {
      newProfile.profilePicture = imageURL;
    }
  }
  if (bio) {
    newProfile.bio = bio;
  }
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const newUser = await Users.findByIdAndUpdate(
      userId,
      { $set: newProfile },
      { new: true }
    );
    res.status(202).json({
      success: true,
      message: "Updated profile successfully",
      newUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//! check Auth
export const CheckAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//! Recover Password
export const Recover = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        error: { recover: "Please Provide All Fields" },
      });
    }
    const user = await Users.findOne({ email });
    if (user) {
      const randomString = generateRandomString(10);
      const isSent = await sendMail({
        from: {
          name: "Social Media",
          address: "nearbyfoood@gmail.com",
        },
        to: email,
        subject: "Recover Password",
        text: String(randomString),
        html: `<b>Your New Passwod Is: ${randomString} </b>`,
      });
      if (!isSent) {
        return res.status(400).json({
          success: false,
          error: { recover: "Your email does not exist" },
        });
      }
      user.password = randomString;
      await user.save();
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(404)
        .json({ success: false, error: { recover: "Email Not Found" } });
    }
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
