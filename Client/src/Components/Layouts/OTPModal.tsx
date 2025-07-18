import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import Button from "../Common/Button";
import { useAuthStore } from "../Store/Auth";

type OTPModalProps = {
  length?: number;
  email: string;
};

const OTPModal: React.FC<OTPModalProps> = ({ length = 6, email }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const { isRegistering, OTPConfirmation, error } = useAuthStore();

  const HandleChange = (e: HTMLInputElement, i: number) => {
    const value = e.value.trim();
    if (!/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);
    if (i < length - 1 && e.nextSibling instanceof HTMLInputElement) {
      e.nextSibling.focus();
    }
  };

  const handleBackSpace = (e: HTMLInputElement, i: number) => {
    const newOtp = [...otp];
    newOtp[i] = "";
    setOtp(newOtp);
    if (i > 0 && !e.value && e.previousSibling instanceof HTMLInputElement) {
      e.previousSibling.focus();
    }
  };

  const HandleConfirmation = () => {
    const transOTP = otp.join("");
    OTPConfirmation(Number(transOTP), email);
  };

  return (
    <div className="text-center border-2 text-light px-3 p-2 bg-base-100 rounded-lg">
      <h1 className="mb-4">Enter The Code That We Sent You Via Email</h1>
      {otp.map((value, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          className={`${
            error?.OTPError && "!border-error !text-error"
          } w-14 h-14 m-1 text-center  focus:border-prime outline-0 border-3 text-2xl border-light text-medium rounded-lg`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            HandleChange(e.target, i)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace") {
              handleBackSpace(e.currentTarget, i);
            }
          }}
        />
      ))}
      {error?.OTPError && <p className="text-error">{error?.OTPError}</p>}
      <Button
        onClick={HandleConfirmation}
        className="block text-center btn btn-primary w-full p-2 rounded-lg my-3"
      >
        {isRegistering ? (
          <span className="loading loading-dots loading-sm"></span>
        ) : (
          "Register"
        )}
      </Button>
    </div>
  );
};

export default OTPModal;
