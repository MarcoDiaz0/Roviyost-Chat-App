import { useAuthStore } from "../../Store/Auth";
import Input from "../../Common/Input";
import { useEffect, useState } from "react";
import type { RegisterFormData } from "../../../types";
import { MdOutlinePassword, MdMail, MdImage } from "react-icons/md";
import { RiIdCardLine } from "react-icons/ri";
import Logo from "../../../assets/SocialLogo.svg"; // Assuming you have a logo image
import { BsSendFill } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { TbArrowsExchange } from "react-icons/tb";
import { Link } from "react-router-dom";
import Modal from "../../Common/Modal";
import OTPModal from "../../Layouts/OTPModal";
import Button from "../../Common/Button";

const Register = () => {
  const { isRegistering, register, error, setError } = useAuthStore();
  const [modalState, setModalState] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) setModalState(true);
  };
  useEffect(() => {
    setError();
  }, []);
  return (
    <div className=" grid grid-cols-2 ">
      {/* left Side  */}
      {modalState && formData.email && (
        <Modal state={modalState} hideModal={() => setModalState(false)}>
          <OTPModal email={formData.email} />
        </Modal>
      )}
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-bold text-center mb-4 text-lightPrime">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col w-full "
        >
          <Input
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            type="text"
            placeholder="Enter your name"
            label="username"
            required
            icon={<RiIdCardLine />}
            err={error?.username}
            classPrefix="focus:text-prime"
          />

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
          <Input
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            type="password"
            placeholder="Enter your password"
            label="Confirm Password"
            required
            icon={<MdOutlinePassword />}
            classPrefix="focus:text-prime"
            err={error?.confirmPassword}
          />
          <Button
            type="submit"
            className={` btn btn-primary my-2  ${
              isRegistering && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isRegistering}
          >
            {isRegistering ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Register"
            )}
          </Button>
          <p className="my-5 self-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-prime hover:text-secondary duration-300"
            >
              Login
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
        <h1 className="text-xl m-2 ">Join Our Community</h1>
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

export default Register;
