import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  classname?: string;
  err?: string;
  classPrefix?: string;
  icon?: React.ReactNode;
}
//Todo : Rename classname to className
const Input = ({
  type,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  label,
  classname,
  classPrefix,
  err,
  icon,
}: InputProps) => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  return (
    <div className={`${classname} w-full`}>
      <label htmlFor={label} className="block mb-2 text-lg  font-medium ">
        {label && label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <aside className="relative ">
        {icon && (
          <div className="absolute w-8  flex justify-center items-center  top-0 bottom-0 ">
            {icon}
          </div>
        )}
        <input
          id={label}
          type={type === "password" && !isPassword ? "text" : type}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full px-3 py-2  border-2  duration-500 rounded-md outline-none ${
            err && "border-error text-error"
          } ${classPrefix} ${icon && "!px-8"} ${
            disabled && " cursor-not-allowed"
          }`}
        />
        {type === "password" && (
          <div
            className={`absolute flex ${
              err && "text-error "
            } top-0 bottom-0 flex  items-center right-3`}
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? (
              <IoMdEye className="w-6 h-6 " />
            ) : (
              <IoMdEyeOff className="w-6 h-6" />
            )}
          </div>
        )}
      </aside>
      {
        <p
          className={`${
            !err && "-translate-y-1/3"
          } overflow-hidden text-error duration-500 px-3 `}
        >
          {err}
        </p>
      }
    </div>
  );
};

export default Input;
