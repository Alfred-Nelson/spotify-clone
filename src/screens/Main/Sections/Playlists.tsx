import { AnimatePresence, motion } from "framer-motion";
import SpotifyLogo from "../../../assets/SpotifyLogo";
import { PlaylistType } from "../../..";
import { NavLink } from "react-router-dom";
import { toSlug } from "../../../utils/helperFunctions";
import { useRecoilValue } from "recoil";
import { PlaylistsAtom } from "../../../utils/atom";
import HamburgerIcon from "../../../assets/HamburgerIcon";
import { useState } from "react";
import Modal from "../../../components/Modal";
import SearchIcon from "../../../assets/SearchIcon";

type PlaylistSectionPropType = {
  scrollToSearch: () => void;
};

const PlaylistsSection = ({ scrollToSearch }: PlaylistSectionPropType) => {
  const [openModal, setOpenModal] = useState(false);
  const playlists = useRecoilValue(PlaylistsAtom);

  return (
    <>
      <div className="w-full md:w-[40vw] lg:w-[25vw]">
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
          {playlists.map((playlist: PlaylistType) => (
            <NavLink
              to={`${toSlug(playlist.title)}`}
              className={({ isActive }) =>
                `${isActive ? "text-white" : "text-white/40"} w-fit`
              }
            >
              {({ isActive }) => (
                <motion.p whileHover={{ scale: isActive ? 1 : 0.98 }}>
                  {playlist.title}
                </motion.p>
              )}
            </NavLink>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {openModal && (
          <Modal handleCancel={() => setOpenModal(false)}>
            <div className="min-w-[50vw] px-[10vw] pt-[10vh]">
              {playlists.map((playlist: PlaylistType) => (
                <NavLink
                  onClick={() => setOpenModal(false)}
                  to={`${toSlug(playlist.title)}`}
                  className={({ isActive }) =>
                    `${isActive ? "text-white" : "text-white/40"}`
                  }
                >
                  {({ isActive }) => (
                    <motion.p
                      whileHover={{ scale: isActive ? 1 : 0.98 }}
                      className="py-[3vh]"
                    >
                      {playlist.title}
                    </motion.p>
                  )}
                </NavLink>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlaylistsSection;
