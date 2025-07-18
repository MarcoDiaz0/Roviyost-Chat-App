import type { Socket } from "socket.io-client";

export type User = {
  _id: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
};
export type AuthStore = {
  authUser: User | null;
  socket: Socket | null;
  onlineUsers: string[];
  isRegistering: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
  error: error | null;
  checkAuth: () => Promise<void>;
  register: (data: RegisterFormData) => Promise<true | false>;
  updateProfile: (data: profileData) => Promise<void>;
  OTPConfirmation: (OTPcode: number, email: string) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
  recover: (email: string) => void;
  connect: () => void;
  disconnect: () => void;
};

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LoginFormData = {
  email: string;
  password: string;
};
export type error = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  OTPError?: string;
  recover?: string;
  message?: string;
};
export type profileData = {
  username: string;
  bio: string;
  profilePicture: File | string | null;
};
export type MessagesStore = {
  Messages: Message[];
  users: User[];
  SelectedUser: User | null;
  IsUsersLoading: boolean;
  IsMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  getMessages: (id: string | undefined) => Promise<void>;
  sendMessage: (message: { image: File | null; text: string }) => Promise<void>;
  messagesListener: () => void;
  stopListen: () => void;
};
export type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string | File | null;
  createdAt: string;
};
