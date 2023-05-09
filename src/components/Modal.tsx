import { createPortal } from "react-dom";
import { motion } from "framer-motion";

type ModalPropType = {
  handleCancel: () => void;
  children: React.ReactNode;
  long?: boolean;
};

const Modal = ({ handleCancel = () => {}, children }: ModalPropType) => {
  return createPortal(
    <>
      <div onClick={handleCancel}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          className="w-screen h-screen fixed top-0 left-0 z-30 bg-black/60"
        ></motion.div>
        <div className="w-screen h-screen fixed top-0 left-0 z-40 backdrop-blur-[1px]"></div>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="pointer-events-none w-screen z-[50] h-screen fixed top-0 left-0"
      >
        <motion.div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          initial={{ x: "-100%", opacity: 0.8 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          exit={{
            x: "-100%",
            opacity: 0.8,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className={`w-fit select-none z-50 pointer-events-auto  h-[100dvh] flex flex-col p-3 bg-[#0B1017] shadow-lg`}
        >
          {children}
        </motion.div>
      </div>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
