import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";

import Button from "./Button";
interface ModalProps {
  hideModal: () => void;
  children: React.ReactNode;
  className?: string;
  state?: boolean;
}
const Modal = ({ state, hideModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<string>("scale-90 opacity-0");
  useEffect(() => {
    if (state) setStyle("scale-100 opacity-100");
  }, [state]);
  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setStyle("scale-90 opacity-0");
          setTimeout(() => {
            hideModal();
          }, 300);
        }
      }}
      className="bottom-0 backdrop-blur-sm right-0 top-0 left-0 isolate overflow-scroll fixed z-3330 bg-dark/30 duration-300 flex justify-center items-center"
    >
      <div className={`m-10 max-w-9/10 relative duration-500 ${style}`}>
        <Button
          onClick={() => {
            setStyle("scale-90 opacity-0");
            setTimeout(() => {
              hideModal();
            }, 300);
          }}
          className="absolute p-2  text-base-100  bg-primary  -top-2 -translate-y-full right-0  "
        >
          <FaXmark className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>
  );
};
export default Modal;
