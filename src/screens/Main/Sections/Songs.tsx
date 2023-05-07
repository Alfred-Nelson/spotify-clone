import SearchIcon from "../../../assets/SearchIcon";
import InputField from "../../../components/InputField";
import useCurrentPlaylist from "../../../hooks/useCurrentPlaylist";
import { motion } from "framer-motion";
import useFetchSongs from "../../../hooks/useFetchSongs";
import { convertToTime } from "../../../utils/helperFunctions";
import { Ring } from "@uiball/loaders";
import { useRecoilState } from "recoil";
import { QueueAtom, SelectedMusicAtom } from "../../../utils/atom";

const SongsSection = () => {
  const [selectedMusic, setSelectedMusic] = useRecoilState(SelectedMusicAtom);
  const [queue, setQueue] = useRecoilState(QueueAtom);
  const currentPlaylist = useCurrentPlaylist();
  const { songs, loading, search, setSearch } = useFetchSongs({
    currentPlaylist,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="w-[30vw] text-white mt-8 px-3 max-h-screen flex flex-col"
    >
      <div className="">
        <motion.h1
          key={currentPlaylist?.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-semibold text-3xl mb-6"
        >
          {currentPlaylist?.title}
        </motion.h1>
        <InputField
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
          <div className="w-full flex justify-center">
            <Ring size={30} speed={0.9} color="white" />
          </div>
        ) : (
          songs.map((song) => (
            <button
              onClick={() => {
                setSelectedMusic(song);
                if (
                  currentPlaylist?.id &&
                  queue?.playlistId !== currentPlaylist.id
                ) {
                  setQueue({ playlistId: currentPlaylist?.id, songs });
                }
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
                    <p className="text-white max-w-[17vw] truncate">
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
  );
};

export default SongsSection;
