import { useState } from "react";
import { useAuthStore } from "../Store/Auth";
import Button from "../Common/Button";
import Input from "../Common/Input";

type ModalProps = {
  email?: string;
};
const ForgetModal = ({ email }: ModalProps) => {
  const { recover, error } = useAuthStore();
  const [Email, setEmail] = useState<string>(email || "");
  const HandleRecover = () => {
    recover(Email);
  };

  return (
    <div className="text-center border-2 border-prime text-light px-3 py-2 bg-base-100 rounded-lg">
      <h1>We Will Send You A New Password Via Email</h1>

      <Input
        type="text"
        placeholder="Enter An Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        classPrefix={`${
          error?.recover && "!border-error !text-error"
        }   focus:border-primary outline-0 border-2   rounded-lg`}
      />

      {error?.recover && <p className="text-error">{error?.recover}</p>}
      <Button
        onClick={HandleRecover}
        className="block btn  w-full p-2 btn-primary  rounded-lg my-3"
      >
        Recover Password
      </Button>
    </div>
  );
};

export default ForgetModal;
