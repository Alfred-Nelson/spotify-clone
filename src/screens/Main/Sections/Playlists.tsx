import { AnimatePresence, motion } from "framer-motion";
import SpotifyLogo from "../../../assets/SpotifyLogo";
import HamburgerIcon from "../../../assets/HamburgerIcon";
import { useState } from "react";
import Modal from "../../../components/Modal";
import SearchIcon from "../../../assets/SearchIcon";
import Playlists from "../../../components/Playlists";
import profile_pic from "../../../assets/images/alfred-nelson.jpeg"

type PlaylistSectionPropType = {
  scrollToSearch: () => void;
};

const PlaylistsSection = ({ scrollToSearch }: PlaylistSectionPropType) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="w-full md:w-[40vw] lg:w-[25vw] relative md:min-h-[100dvh]">
        <div className="w-full flex items-center justify-between px-4 md:px-0">
          <button onClick={() => setOpenModal(true)} className="md:hidden">
            <HamburgerIcon />
          </button>
          <motion.div
            className="w-[133px] h-[40px] mt-2 md:mt-8 md:ml-8 mb-2 md:mb-0"
            transition={{
              layout: {
                duration: 1,
                ease: "anticipate",
              },
            }}
            layoutId="logo"
          >
            <SpotifyLogo />
          </motion.div>
          <button
            onClick={scrollToSearch}
            className="w-[22px] stroke-white text-white h-[18px] md:hidden"
          >
            <SearchIcon />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="hidden md:flex flex-col justify-center mt-12 ml-12 gap-y-4"
        >
          <Playlists />
        </motion.div>
        <img src={profile_pic} alt="profile picture" className="w-10 h-10 rounded-full absolute bottom-8 left-10 hidden md:block" />
      </div>
      <AnimatePresence>
        {openModal && (
          <Modal handleCancel={() => setOpenModal(false)}>
            <div className="h-full flex flex-col justify-between pb-8 px-[5vw]">
            <div className="min-w-[40vw] pt-[10vh]">
              <Playlists onClick={() => setOpenModal(false)} moreGap />
            </div>
            <img src={profile_pic} alt="profile picture" className="w-10 h-10 rounded-full" />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlaylistsSection;
