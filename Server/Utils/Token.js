import jwt from "jsonwebtoken";

export const GenerateToken = (UserId, res) => {
  const token = jwt.sign({ UserId }, process.env.JWT_PASS, { expiresIn: "20d" });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "devlopment",
  });
  return token
};
