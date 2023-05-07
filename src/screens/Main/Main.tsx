import PlaylistsSection from "./Sections/Playlists";
import SongsSection from "./Sections/Songs";

const Main = () => {
  return (
    <div className="flex h-screen bg-[#0B1017]">
      <PlaylistsSection />
      <SongsSection />
      <div className="w-[50vw]"></div>
    </div>
  );
};

export default Main;
