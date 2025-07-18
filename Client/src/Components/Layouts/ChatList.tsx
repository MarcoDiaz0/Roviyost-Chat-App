import { MdPerson } from "react-icons/md";
import { useChatStore } from "../Store/Chat";
import { useEffect } from "react";
import ChatListSkeleton from "../Skeletons/ChatListSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../Store/Auth";

const ChatList = () => {
  const { getUsers, users, SelectedUser, setSelectedUser, IsUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (IsUsersLoading) return <ChatListSkeleton />;
  return (
    <div className="w-1/5 border-r px-3 ">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`${
              SelectedUser?._id === user._id &&
              "!bg-base-300  ring-base-300"
            } flex justify-center p-2  gap-2 items-center rounded`}
          >
            <div className="relative  size-10">
              {user.profilePicture ? (
                <img
                  className="size-10 rounded-box"
                  src={user.profilePicture}
                />
              ) : (
                <MdPerson className=" size-10 h-full  object-cover rounded-full" />
              )}
              <span
                className={`w-2 h-2 rounded-full absolute bottom-0 right-0  ${
                  onlineUsers?.includes(user._id)
                    ? "bg-emerald-500 "
                    : "bg-gray-500"
                }  `}
              ></span>
            </div>
            <div className="hidden lg:block">{user.username}</div>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
