import ChatContainer from "../Layouts/ChatContainer";
import ChatList from "../Layouts/ChatList";
import NoChatSelected from "../Layouts/NoChatSelected";
import { useChatStore } from "../Store/Chat";


const Home = () => {
  const { SelectedUser } = useChatStore()
  return (
    <div className="flex w-full overflow-hidden grow ">
      <ChatList />
      {SelectedUser ? <ChatContainer /> :<NoChatSelected />  }
    </div>
  );
};

export default Home;
