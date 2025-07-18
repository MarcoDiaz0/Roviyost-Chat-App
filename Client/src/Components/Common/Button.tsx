interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type,
  onClick,
  children,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`flex justify-center items-center rounded-md duration-300 transition-colors ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
