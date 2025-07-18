import { useAuthStore } from "../Store/Auth";
import Logo from "../../assets/SocialLogo.svg";
import { MdPerson, MdLogout, MdHome } from "react-icons/md";

import Button from "../Common/Button";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="flex items-center justify-between p-4 w-full  gap-2 sticky z-2000 top-0 bg-dark  backdrop-blur-xs sm:flex-row i  text-light">
      <Link to={"/"} className="flex items-center justify-center  gap-2">
        <img src={Logo} className="w-10 h-10 object-cover rounded-full " />
        <h1 className="text-2xl text-center">Roviyost Chat</h1>
      </Link>
      <article className="flex gap-5 items-center ">
        {authUser && (
          <>
            <Link to={"/"}>
              <Button className="flex items-center text-lightPrime hover:text-second">
                <MdHome className="w-7 h-7" />
                <span className="ml-2">Home</span>
              </Button>
            </Link>
            <Link to={"/account"}>
              <Button className="flex items-center text-lightPrime hover:text-second">
                <MdPerson className="w-7 h-7" />
                <span className="ml-2">Account</span>
              </Button>
            </Link>

            <Button
              onClick={logout}
              className="flex items-center text-lightPrime hover:text-second"
            >
              <MdLogout className="w-7 h-7" />
              <span className="ml-2">Logout</span>
            </Button>
          </>
        )}
      </article>
    </nav>
  );
};

export default NavBar;
