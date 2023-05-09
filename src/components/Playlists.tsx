import { toSlug } from "../utils/helperFunctions";
import { PlaylistType } from "..";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { PlaylistsAtom } from "../utils/atom";

type PlaylistsPropType = {
  moreGap?: boolean;
  onClick?: () => void
};

const Playlists = ({ moreGap = false, onClick = () => {} }: PlaylistsPropType) => {
  const playlists = useRecoilValue(PlaylistsAtom);

  return (
    <>
      {playlists.map((playlist: PlaylistType) => (
        <NavLink
          onClick={onClick}
          to={`${toSlug(playlist.title)}`}
          className={({ isActive }) =>
            `${isActive ? "text-white" : "text-white/40"} w-fit`
          }
        >
          {({ isActive }) => (
            <motion.p
              className={moreGap ? `py-[3vh]` : ""}
              whileHover={{ scale: isActive ? 1 : 0.98 }}
            >
              {playlist.title}
            </motion.p>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default Playlists;
