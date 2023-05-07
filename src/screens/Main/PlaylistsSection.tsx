import { motion } from "framer-motion";
import SpotifyLogo from "../../assets/SpotifyLogo";
import { PlaylistType } from "../..";
import { NavLink } from "react-router-dom";
import { toSlug } from "../../utils/helperFunctions";

type PlaylistsSectionPropType = {
  playlists: PlaylistType[];
};

const PlaylistsSection = ({ playlists }: PlaylistsSectionPropType) => {
  return (
    <div className="w-[20vw]">
      <motion.div
        className="w-[133px] h-[40px] mt-8 ml-8"
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
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 1, staggerChildren: 0.5 }}
       className="flex flex-col justify-center mt-12 ml-12 gap-y-4">
        {playlists.map((playlist: PlaylistType) => (
          <NavLink to={`${toSlug(playlist.title)}`} className={({ isActive }) => `${isActive ? "text-white" : "text-white/40" }`}>
            {({ isActive }) => (
                <motion.p
                whileHover={{ scale: isActive ? 1 : 0.98}}
              >
                  {playlist.title}
              </motion.p>
            )}
          </NavLink>
        ))}
      </motion.div>
    </div>
  );
};

export default PlaylistsSection;
