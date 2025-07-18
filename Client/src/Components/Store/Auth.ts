import { create } from "zustand";
import { instance } from "../../axios";
import type {
  AuthStore,
  error,
  LoginFormData,
  profileData,
  RegisterFormData,
} from "../../types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { io, Socket } from "socket.io-client";

const BaseURL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  onlineUsers: [],
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isAuthenticated: false,
  error: {},
  socket: null,
  checkAuth: async () => {
    try {
      const res = await instance.get("/auth/check");
      const user = res.data;
      set({
        authUser: user,
        isAuthenticated: !!user,
      });
      get().connect();
    } catch (error) {
      console.error("Auth check failed:", error);
      set({
        authUser: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  register: async (data: RegisterFormData) => {
    set({ isRegistering: true, error: {} });
    try {
      await instance.post("/auth/register", data);
      set({ isRegistering: false });
      return true;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: error }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors) {
        set({ error: fieldErrors });
      } else {
        toast.error("An unexpected error");
      }
      set({ isRegistering: false });
      return false;
    }
  },
  OTPConfirmation: async (OTPcode, email) => {
    set({ isRegistering: true, error: {} });
    try {
      const res = await instance.post("/auth/register/confirm", {
        OTPcode,
        email,
      });
      set({ authUser: res.data.user });
      get().connect();
      toast.success("Account created successfully");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: error }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors) {
        set({ error: fieldErrors });
      } else {
        toast.error("An unexpected error");
      }
    } finally {
      set({ isRegistering: false });
    }
  },
  logout: async () => {
    try {
      await instance.get("auth/logout");
      set({ authUser: null });
      get().disconnect();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error");
    }
  },
  login: async (data: LoginFormData) => {
    set({ isLoggingIn: true, error: {} });
    try {
      const res = await instance.post("auth/login", data);
      set({ authUser: res.data.user });
      get().connect();
      toast.success("Logged in successfully");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: error }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors) {
        set({ error: fieldErrors });
      } else {
        toast.error("An unexpected error");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
  recover: async (email: string) => {
    set({ error: {} });

    try {
      await instance.post("auth/recover", { email });
      toast.success("Check your Email");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: error }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors) {
        set({ error: fieldErrors });
      } else {
        toast.error("An unexpected error");
      }
    }
  },
  updateProfile: async (data: profileData) => {
    const form = new FormData();

    form.append("username", data.username);
    form.append("bio", data.bio);

    if (data.profilePicture instanceof File) {
      console.log(data);
      form.append("profilePicture", data.profilePicture);
    }
    set({ isUpdatingProfile: true, error: {} });
    try {
      const res = await instance.post("auth/updateProfile", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ authUser: res.data.newUser });
      toast.success("Profile Updated successfully");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: { message?: string } }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors?.message) {
        toast.error(fieldErrors.message);
      } else {
        toast.error("An unexpected error");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connect: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket: Socket = io(BaseURL, {
      query: {
        userID: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (usersIDs) => {
      set({ onlineUsers: usersIDs });
    });
  },
  disconnect: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
  setError: () => {
    set({ error: {} });
  },
}));
