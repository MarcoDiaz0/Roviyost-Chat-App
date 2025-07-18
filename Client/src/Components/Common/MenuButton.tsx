import { useState } from "react";

type props = {
  children?: React.ReactNode[];
  icon: React.ReactNode;
  list?: string[];
  className?: string;
};
const MenuButton = ({ children, className, icon }: props) => {
  const [state, setState] = useState<boolean>(true);
  return (
    <article className={`${className} flex flex-col `}>
      <div className="relative w-full">
        <button
          onClick={() => setState(!state)}
          className="btn btn-neutral relative z-2"
        >
          {icon}
        </button>
        <aside
          className={`${
            state ? "flex " : "opacity-0 pointer-events-none -translate-y-1/5 "
          } flex flex-col items-end  absolute duration-500`}
        >
          {children}
        </aside>
      </div>
    </article>
  );
};

export default MenuButton;
