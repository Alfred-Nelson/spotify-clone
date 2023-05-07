import { useQuery } from "@apollo/client";
import SplashScreen from "./screens/SplashScreen";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { findPlaylistFromSlug, toSlug } from "./utils/helperFunctions";
import Main from "./screens/Main";
import { useSetRecoilState } from "recoil";
import { PlaylistsAtom } from "./utils/atom";
import { GET_PLAYLISTS } from "./utils/queries";

function App() {
  const { loading, data, error } = useQuery(GET_PLAYLISTS);
  const setPlaylists = useSetRecoilState(PlaylistsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const playlists = data.getPlaylists;
      setPlaylists(playlists);
      if (!findPlaylistFromSlug(window.location.pathname, playlists, "title")) {
        const first_playlist = playlists[0];
        navigate(`/${toSlug(first_playlist.title)}`);
      }
    }
  }, [data]);

  return <>{loading || error ? <SplashScreen /> : <Main />}</>;
}

export default App;
