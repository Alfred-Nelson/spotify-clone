import SearchIcon from "../../../assets/SearchIcon";
import InputField from "../../../components/InputField";
import useCurrentPlaylist from "../../../hooks/useCurrentPlaylist";
import { motion } from "framer-motion";
import useFetchSongs from "../../../hooks/useFetchSongs";
import { convertToTime } from "../../../utils/helperFunctions";
import { Ring } from "@uiball/loaders";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  PlayingStatusAtom,
  QueueAtom,
  SelectedMusicAtom,
} from "../../../utils/atom";

type SongsSectionPropType = {
  songsContainerRef: React.RefObject<HTMLDivElement>;
  searchRef: React.RefObject<HTMLInputElement>;
};

const SongsSection = ({
  songsContainerRef,
  searchRef,
}: SongsSectionPropType) => {
  const [selectedMusic, setSelectedMusic] = useRecoilState(SelectedMusicAtom);
  const [queue, setQueue] = useRecoilState(QueueAtom);
  const setIsPlaying = useSetRecoilState(PlayingStatusAtom);
  const currentPlaylist = useCurrentPlaylist();
  const { songs, loading, search, setSearch } = useFetchSongs({
    currentPlaylist,
  });

  return (
    <div className="min-h-[100vh] order-3 lg:order-2">
      <motion.div
        ref={songsContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-[90vw] sm:w-[60vw] lg:w-[30vw] order-3 lg:order-2 text-white px-3 max-h-fit lg:max-h-screen flex flex-col"
      >
        <div className="mt-8">
          <motion.h1
            key={currentPlaylist?.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-3xl mb-6"
          >
            {currentPlaylist?.title}
          </motion.h1>
          <InputField
            inputRef={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Song / Artist"
            rightElement={<SearchIcon />}
          />
        </div>
        <motion.div
          key={currentPlaylist?.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full overflow-y-auto mt-6 pr-2"
        >
          {loading ? (
            <div className="w-full flex justify-center mt-[4vh]">
              <Ring size={30} speed={0.9} color="white" />
            </div>
          ) : (
            songs.map((song) => (
              <button
                onClick={() => {
                  if (
                    currentPlaylist?.id &&
                    queue?.playlistId !== currentPlaylist.id
                  ) {
                    setQueue({ playlistId: currentPlaylist?.id, songs });
                  }
                  setSelectedMusic(song);
                  setIsPlaying(true);
                }}
                className={`w-full relative my-2 py-2 ${
                  selectedMusic?._id === song._id
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                } transition ease-in-out px-2 rounded-md`}
              >
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-x-2">
                    <img
                      src={song.photo}
                      alt="song image"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex flex-col justify-between text-left">
                      <p className="text-white max-w-[34vw] md:max-w-[30vw] lg:max-w-[17vw] truncate">
                        {song.title}
                      </p>
                      <p className="text-white/40 text-sm">{song.artist}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm">
                    {convertToTime(song.duration)}
                  </p>
                </div>
              </button>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SongsSection;
