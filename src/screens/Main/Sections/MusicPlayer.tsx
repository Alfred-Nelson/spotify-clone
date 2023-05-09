import { useRecoilValue } from "recoil";
import { SelectedMusicAtom } from "../../../utils/atom";
import { motion } from "framer-motion";
import { useRef } from "react";
import useMusicPlayer from "../../../hooks/useMusicPlayer";
import PlayIcon from "../../../assets/PlayIcon";
import PauseIcon from "../../../assets/PauseIcon";
import LeftForwardIcon from "../../../assets/LeftForwardIcon";
import RightForwardIcon from "../../../assets/RightForwardIcon";
import DotsIcon from "../../../assets/DotsIcon";
import SoundIcon from "../../../assets/SoundIcon";
import "../../../styles/slider.css";

const MusicPlayerSection = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const selectedMusic = useRecoilValue(SelectedMusicAtom);
  const {
    songProgress,
    isPlaying,
    allowNext,
    allowPrev,
    onPlaying,
    updateProgress,
    playNPause,
    playNext,
    playPrev,
  } = useMusicPlayer({
    audioRef,
  });

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="w-[80vw] sm:w-[60vw] lg:w-[50vw] order-2 lg:order-3 lg:overflow-hidden flex flex-col min-h-[90dvh] md:min-h-screen lg:h-full justify-center items-center "
    >
      <div className="h-fit w-fit text-white">
        <motion.div
          key={selectedMusic?._id}
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold">{selectedMusic?.title}</h2>
          <p className="text-white/60">{selectedMusic?.artist}</p>
          <motion.img
            src={selectedMusic?.photo}
            alt={"song image"}
            className="h-[60vh] aspect-square object-cover my-5 rounded-xl"
          />
        </motion.div>
        <input
          min={0}
          max={audioRef.current?.duration}
          value={songProgress}
          onChange={updateProgress}
          type="range"
          className="my-3 w-full music-progress"
        />
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="w-full flex justify-between items-center"
        >
          <button className="h-10 w-10 flex justify-center items-center rounded-full bg-white/10">
            <DotsIcon />
          </button>
          <div className="flex gap-x-6">
            <button
              onClick={playPrev}
              className={
                allowPrev ? "opacity-60" : "opacity-20 cursor-not-allowed"
              }
            >
              <LeftForwardIcon />
            </button>
            <button onClick={playNPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={playNext}
              className={
                allowNext ? "opacity-60" : "opacity-20 cursor-not-allowed"
              }
            >
              <RightForwardIcon />
            </button>
          </div>
          <button className="h-10 w-10 flex justify-center items-center rounded-full bg-white/10">
            <SoundIcon />
          </button>
        </motion.div>
      </div>
      <audio
        key={selectedMusic?.url}
        ref={audioRef}
        src={selectedMusic?.url}
        onTimeUpdate={onPlaying}
      />
    </motion.div>
  );
};

export default MusicPlayerSection;
