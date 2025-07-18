import Users from "../Models/User.module.js";

export const CheckPassword = (password, Confirmpassword) => {
  if (password.length < 6)
    return {
      password: "The Password Should Be At Least 6 Characters.",
      success: false,
    };
  if (!/^(?=.*\d)(?=.*[a-zA-Z])/.test(password))
    return {
      password: "Password Must Contain At Least 1 Digit ,1 Letter.",
      success: false,
    };
  if (password !== Confirmpassword)
    return {
      password: "Passwords Do Not Match.",
      confirmPassword: "Passwords Do Not Match.",
      success: false,
    };
  return {
    success: true,
  };
};

export const CheckEmail = async (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      email: "Please provide a valid email address",
      success: false,
    };
  }
  const existingUser = await Users.findOne({ email });
  if (existingUser?.verified) {
    return {
      email: "This Email Already Exist",
      success: false,
    };
  }
  if (!existingUser?.verified) {
    await Users.deleteOne({ email });
  }
  return {
    success: true,
  };
};
