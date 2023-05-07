import { motion } from "framer-motion";
import SpotifyLogo from "../assets/SpotifyLogo";

const SplashScreen = () => {
  return (
    <div className="w-screen h-screen bg-[#0B1017] pb-[8vh] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 0.1 } }}
        layoutId="logo"
        className="w-[133px] h-[40px]"
      >
        <SpotifyLogo />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
