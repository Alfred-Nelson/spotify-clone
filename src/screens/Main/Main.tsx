import { useRecoilValue } from "recoil";
import MusicPlayerSection from "./Sections/MusicPlayer";
import PlaylistsSection from "./Sections/Playlists";
import SongsSection from "./Sections/Songs";
import { motion } from "framer-motion";
import { SelectedMusicAtom } from "../../utils/atom";
import "../../styles/background.css"

const Main = () => {
  const selectedMusic = useRecoilValue(SelectedMusicAtom)

  return (
    <div className="h-screen relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        key={selectedMusic?.photo}
        className="z-10 absolute w-screen h-screen top-0 left-0"
      >
          <div className="image-container">
            <div 
             style={{ backgroundImage: `url(${selectedMusic?.photo})`}} 
             className="image"></div>  
          </div>
      </motion.div>
      <div
        style={{
          background:
            "linear-gradient(to bottom right, transparent, #000000 80%)",
        }}
        className="relative z-20 flex h-screen"
      >
        <PlaylistsSection />
        <SongsSection />
        <MusicPlayerSection />
      </div>
    </div>
  );
};

export default Main;
