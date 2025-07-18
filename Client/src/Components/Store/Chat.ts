import { create } from "zustand";
import { instance } from "../../axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import type { MessagesStore } from "../../types";
import { useAuthStore } from "./Auth";

export const useChatStore = create<MessagesStore>((set, get) => ({
  Messages: [],
  users: [],
  SelectedUser: null,
  IsUsersLoading: false,
  IsMessagesLoading: false,
  getUsers: async () => {
    set({ IsUsersLoading: true });
    try {
      const res = await instance.get("/messages/users");
      set({ users: res.data });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors) {
        toast.error(fieldErrors);
      } else {
        toast.error("An unexpected error");
      }
    } finally {
      set({ IsUsersLoading: false });
    }
  },
  getMessages: async (id) => {
    set({ IsMessagesLoading: true });
    try {
      const res = await instance.get(`/messages/${id}`);
      set({ Messages: res.data });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors) {
        toast.error(fieldErrors);
      } else {
        toast.error("An unexpected error");
      }
    } finally {
      set({ IsMessagesLoading: false });
    }
  },
  setSelectedUser: (SelectedUser) => set({ SelectedUser }),
  sendMessage: async (message) => {
    console.log(message);

    const form = new FormData();
    form.append("text", message.text);

    if (message.image instanceof File) {
      form.append("image", message.image);
    }
    const { Messages, SelectedUser } = get();
    try {
      const res = await instance.post(
        `messages/send/${SelectedUser?._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ Messages: [...Messages, res.data] });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const fieldErrors = axiosError.response?.data?.error;
      if (fieldErrors) {
        toast.error(fieldErrors);
      } else {
        toast.error("An unexpected error");
      }
    }
  },
  messagesListener: () => {
    const { SelectedUser } = get();
    if (!SelectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== SelectedUser._id) return;
      set({ Messages: [...get().Messages, newMessage] });
    });
  },
  stopListen: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off();
  },
}));
