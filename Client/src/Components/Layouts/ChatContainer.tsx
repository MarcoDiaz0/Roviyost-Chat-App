import { useEffect, useRef, useState } from "react";
import MessagesSkeleton from "../Skeletons/MesagesSkeleton";
import { useChatStore } from "../Store/Chat";
import { MdImage, MdPerson } from "react-icons/md";
import { useAuthStore } from "../Store/Auth";
import Button from "../Common/Button";
import { FaXmark } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import FileButton from "../Common/FileButton";
import toast from "react-hot-toast";
import { formatMessageTime } from "../../lib/utils";

const ChatContainer = () => {
  const {
    Messages,
    getMessages,
    SelectedUser,
    setSelectedUser,
    IsMessagesLoading,
    sendMessage,
    messagesListener,
    stopListen,
  } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const removeImage = () => {
    setImagePreview(null);
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && imagePreview == null) return;
    try {
      setText("");
      setImagePreview(null);
      await sendMessage({ text: text, image: imagePreview });
    } catch (error) {
      console.log(error);
      toast.error("failed to send the message");
    }
  };
  useEffect(() => {
    getMessages(SelectedUser?._id);
    messagesListener();
    return () => stopListen();
  }, [SelectedUser?._id, getMessages, messagesListener, stopListen]);
  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);
  return (
    <article className="w-full flex flex-col ">
      {/* chat header */}
      <nav className="flex justify-between items-center w-full bg-base-300 z-2">
        <div className="flex p-2 items-center gap-4">
          <article className=" border-b border-base-300 ">
            <aside>
              {SelectedUser?.profilePicture ? (
                <img
                  className="size-10 rounded-box"
                  src={SelectedUser.profilePicture}
                />
              ) : (
                <MdPerson className=" size-10 border h-full  object-cover rounded-full" />
              )}
            </aside>
          </article>
          {/* user Info  */}
          <article>
            <h1 className="font-medium">{SelectedUser?.username}</h1>
            <p
              className={`${
                onlineUsers?.includes(SelectedUser?._id || "") &&
                "text-emerald-500"
              }`}
            >
              {SelectedUser?._id && onlineUsers?.includes(SelectedUser._id)
                ? "Online"
                : "Offline"}
            </p>
          </article>
        </div>

        <Button className=" w-14" onClick={() => setSelectedUser(null)}>
          <FaXmark className="w-7 h-7" />
        </Button>
      </nav>

      {/*//! Messages */}
      {IsMessagesLoading ? (
        <MessagesSkeleton />
      ) : (
        <div className=" overflow-y-scroll p-4  h-100 grow">
          <div className="flex-1 overflow-y-hidden space-y-4">
            {Messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === authUser?._id ? "chat-end" : "chat-start"
                }`}
                ref={messageEndRef}
              >
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    {(SelectedUser?.profilePicture &&
                      message.senderId !== authUser?._id) ||
                    (authUser?.profilePicture &&
                      message.senderId === authUser?._id) ? (
                      <img
                        src={
                          message.senderId === authUser?._id
                            ? authUser?.profilePicture
                            : SelectedUser?.profilePicture
                        }
                      />
                    ) : (
                      <MdPerson className=" size-10 h-full  object-cover rounded-full" />
                    )}
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && !(message.image instanceof File) && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Messages Input  */}
      <nav className="flex flex-col p-2 w-full sticky bg-base-300  bottom-0 ">
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={URL.createObjectURL(imagePreview)}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                type="button"
              >
                <FaXmark className="size-3" />
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex w-full gap-2 ">
          <input
            placeholder="type message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="grow border rounded px-2 "
          />
          <Button
            disabled={!text.trim() && !imagePreview}
            type="submit"
            className={`hover:bg-primary p-3  ${
              !text.trim() && !imagePreview && "text-zinc-500"
            } `}
          >
            <BsSendFill className="h-7 w-7" />
          </Button>
          <FileButton
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImagePreview(file);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }
            }}
            type="image/*"
            className="hover:bg-primary  rounded"
            ref={fileInputRef}
          >
            <MdImage className="h-7 w-7 m-3" />
          </FileButton>
        </form>
      </nav>
    </article>
  );
};

export default ChatContainer;
