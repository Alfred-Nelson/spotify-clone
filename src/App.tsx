import { useQuery } from "@apollo/client";
import { GET_PLAYLISTS } from "./queries/playlists";
import SplashScreen from "./screens/SplashScreen";
import PlaylistsSection from "./screens/Main/PlaylistsSection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkIfSlugPresent, toSlug } from "./utils/helperFunctions";

function App() {
  const { loading, data } = useQuery(GET_PLAYLISTS);
  const navigate = useNavigate()

  useEffect(() => {
    if(data) {
      const playlists = data.getPlaylists
      if(!checkIfSlugPresent(window.location.pathname, playlists, "title")){
        const first_playlist = playlists[0]
        navigate(`/${toSlug(first_playlist.title)}`)
      }
    }
  }, [data])

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="flex h-screen bg-[#0B1017]">
          <PlaylistsSection playlists={data.getPlaylists} />
          <div className="w-[30vw]"></div>
          <div className="w-[50vw]"></div>
        </div>
      )}
    </>
  );
}

export default App;
