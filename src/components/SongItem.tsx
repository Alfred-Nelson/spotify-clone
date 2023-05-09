import { SongType } from "..";
import { convertToTime } from "../utils/helperFunctions";

type SongItemPropType = {
    onClick: () => void;
    selected: boolean;
    song: SongType;
}

const SongItem = ({ onClick, selected, song }: SongItemPropType) => {
  return (
    <button
      onClick={onClick}
      className={`w-full relative my-2 py-2 ${
        selected ? "bg-white/10" : "hover:bg-white/5"
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
        <p className="text-white/40 text-sm">{convertToTime(song.duration)}</p>
      </div>
    </button>
  );
};

export default SongItem;
