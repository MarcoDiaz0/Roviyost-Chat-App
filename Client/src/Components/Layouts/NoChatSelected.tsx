import Logo from "../../assets/SocialLogo.svg";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col p-2 items-center justify-center w-full h-full">
      <aside className="flex flex-col items-center justify-center  gap-2">
        <img
          src={Logo}
          className="w-16 h-full object-cover rounded-full animate-bounce"
        />
        <h1 className="text-2xl text-center my-2">
          Welcome To Roviyost Chat Applicaion
        </h1>
      </aside>
      <p className="text-center">
        Select a conversation from the list in the left side to start chatting{" "}
      </p>
    </div>
  );
};

export default NoChatSelected;
