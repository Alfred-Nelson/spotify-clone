import { useRecoilValue } from "recoil";
import MusicPlayerSection from "./Sections/MusicPlayer";
import PlaylistsSection from "./Sections/Playlists";
import SongsSection from "./Sections/Songs";
import { motion } from "framer-motion";
import { SelectedMusicAtom } from "../../utils/atom";
import "../../styles/background.css";
import { useRef } from "react";

const Main = () => {
  const songsContainerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selectedMusic = useRecoilValue(SelectedMusicAtom);

  const scrollToSearch = () => {
    songsContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => searchRef.current?.focus(), 1000);
  };

  return (
    <div className="h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        key={selectedMusic?.photo}
        className="z-10 absolute w-screen h-screen top-0 left-0"
      >
        <div className="blur-[100px] w-full h-full opacity-60">
          <div
            style={{ backgroundImage: `url(${selectedMusic?.photo})` }}
            className="w-full h-full"
          ></div>
        </div>
      </motion.div>
      <div
        style={{
          background:
            "linear-gradient(to bottom right, transparent, #000000 70%)",
        }}
        className="w-full relative top-0 z-20 flex flex-col justify-center items-center md:items-start md:flex-row h-screen"
      >
        <PlaylistsSection scrollToSearch={scrollToSearch} />
        <div className="w-full flex items-center md:items-start flex-col lg:flex-row h-[100vh] overflow-y-auto scrollbar">
          <SongsSection
            songsContainerRef={songsContainerRef}
            searchRef={searchRef}
          />
          <MusicPlayerSection />
        </div>
      </div>
    </div>
  );
};

export default Main;
