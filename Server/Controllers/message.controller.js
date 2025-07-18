import Users from "../Models/User.module.js";
import Messages from "../Models/Message.module.js";
import { uploadImage } from "../Utils/ImageUplaoder.js";
import { getReceiverSocketID, io } from "../Utils/socket.js";

//! Get Users
export const GetUsers = async (req, res) => {
  const LoggedInUser = req.user._id;
  try {
    const users = await Users.find({
      _id: { $ne: LoggedInUser },
      verified: true,
    }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//! Get Messages
export const GetMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const messages = await Messages.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//! Send Message
export const SendMessages = async (req, res) => {
  try {
    const image = req.files?.image;
    const { text } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageURL;
    if (image) {
      imageURL = await uploadImage(image);
      if (!imageURL)
        return res
          .status(500)
          .json({ error: { message: "Failed to upload image" } });
    }
    const message = await Messages.create({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });
    const receiverSocketId = getReceiverSocketID(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }
    res.status(201).json(message);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
