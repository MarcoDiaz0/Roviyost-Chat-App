import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Store/Auth";
import type { LoginFormData } from "../../../types";
import Modal from "../../Common/Modal";
import Input from "../../Common/Input";
import { MdImage, MdMail, MdOutlinePassword } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { RiMailSendLine } from "react-icons/ri";
import { BsSendFill } from "react-icons/bs";
import Logo from "../../../assets/SocialLogo.svg"; // Assuming you have a logo image
import ForgetModal from "../../Layouts/ForgetModal";
import Button from "../../Common/Button";

const Login = () => {
  const { login, isLoggingIn, error } = useAuthStore();
  const [modalState, setModalState] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className=" grid grid-cols-2 min-h-[88vh]">
      {/* Left Side */}
      {modalState && (
        <Modal state={modalState} hideModal={() => setModalState(false)}>
          <ForgetModal email={formData.email} />
        </Modal>
      )}
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-bold text-center mb-4 text-lightPrime">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col w-full "
        >
          <Input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            placeholder="Enter your email"
            label="email"
            required
            icon={<MdMail />}
            classPrefix="focus:text-prime"
            err={error?.email}
          />
          <Input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            placeholder="Enter your password"
            label="password"
            required
            icon={<MdOutlinePassword />}
            classPrefix="focus:text-prime"
            err={error?.password}
          />

          <Button
            type="submit"
            className={`btn btn-primary my-2  ${
              isLoggingIn && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Log in"
            )}
          </Button>
          <Button
            className="hover:text-secondary cursor-pointer self-center"
            onClick={() => setModalState(true)}
          >
            Forget password?
          </Button>
          <p className="my-5 self-center">
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              className="text-prime hover:text-secondary duration-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      {/* Right Side */}
      <div className="flex flex-col justify-center items-center ">
        <div className="grid grid-cols-3 gap-3 grid-rows-3 w-7/10 h-7/10">
          <div className="flex items-center  justify-center bg-secondary rounded-3xl flex-col ">
            <BsSendFill className="text-dark text-5xl" />
          </div>
          <div className="flex items-center  justify-center bg-primary rounded-3xl flex-col "></div>
          <div className="flex items-center  justify-center bg-secondary rounded-3xl flex-col">
            <RiMailSendLine className="text-dark text-5xl" />
          </div>
          <div className="flex items-center  justify-center bg-primary rounded-3xl flex-col"></div>
          <div className="flex items-center  justify-center flex-col gap-2">
            <img src={Logo} className="w-1/2 rounded-full " />
          </div>
          <div className="flex items-center  justify-center bg-primary rounded-3xl flex-col "></div>
          <div className="flex items-center justify-center bg-secondary rounded-3xl flex-col ">
            <TbArrowsExchange className="text-dark text-5xl" />
          </div>
          <div className="flex items-center justify-center bg-primary rounded-3xl flex-col "></div>
          <div className="flex items-center justify-center bg-secondary rounded-3xl flex-col ">
            <MdImage className="text-dark text-5xl" />
          </div>
        </div>
        <h1 className="text-xl m-2 ">Welcome Back</h1>
        <p>
          <span className="text-second">connect</span> with friends,{" "}
          <span className="text-second">share</span> momments, and{" "}
          <span className="text-second">stay</span> in touch with your loved
          ones
        </p>
      </div>
    </div>
  );
};

export default Login;
