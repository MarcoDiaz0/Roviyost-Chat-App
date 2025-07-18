import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

type props = {
  options: string[];
  label?: string;
  className?: string;
  classPrefix?: string;
  classOption?: string;
  value: string;
  arrow?: boolean;
  setValue: (option: string) => void;
};
export const DropDown = ({
  label,
  options,
  className,
  classPrefix,
  classOption,
  arrow= true,
  value,
  setValue,
}: props) => {
  const [state, setState] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropUp, setDropUp] = useState(false); // حالة لتحديد الاتجاه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (state && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [state]);
  return (
    <article
      ref={dropdownRef}
      className={`${className} !cursor-default relative w-full `}
    >
      <label
        htmlFor={label}
        className="block mb-2 z-20 text-lg bg-dark font-medium "
      >
        {label && label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <aside className="relative">
        <h1
          className={` w-full px-3 py-2 rounded-md z-20 relative bg-dark ${classPrefix}`}
          onClick={() => setState(!state)}
        >
          {value}
         {arrow && <span className={`absolute top-1/2 right-3 `}>
            <FaChevronDown
              className={`-translate-y-1/2 duration-400 ${
                state && "rotate-180"
              }`}
            />
          </span>}
        </h1>
        <div
          className={`
            absolute w-full max-h-[40vh] border overflow-y-auto bg-dark rounded-md shadow-md 
            transition-all duration-300 z-10 
            ${
              state
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }
            ${dropUp && "bottom-full "}
          `}
        >
          {state &&
            options.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  setValue(option);
                  setState(false);
                }}
                className={`${classOption}  w-full block p-2 duration-300`}
              >
                {option}
              </button>
            ))}
        </div>
      </aside>
    </article>
  );
};
