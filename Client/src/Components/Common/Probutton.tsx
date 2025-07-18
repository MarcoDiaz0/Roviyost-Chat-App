import { useState } from "react";

type props = {
  children: React.ReactNode;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};
const ProButton = ({ children, className, text, onClick }: props) => {
    const [style, setStyle] = useState("text-[0px] translate-x-1/3");
  const hover = () => {
    setStyle("text ")
  };
  const noHover = () => {
    setStyle("text-[0px] translate-x-1/3");
  };
  return (
    <article
      onMouseEnter={hover}
      onMouseLeave={noHover}
      className={`flex justify-center items-center p-2  ${className} duration-300  `}
    >
      <h1 className={`${style} duration-400 ease-in-out `}>{text}</h1>
      <button onClick={onClick} className="relative z-2">
        {children}
      </button>
    </article>
  );
};

export default ProButton;
