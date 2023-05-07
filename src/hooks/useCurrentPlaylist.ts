import { useLayoutEffect, useState } from "react";
import { findPlaylistFromSlug } from "../utils/helperFunctions";
import { useRecoilValue } from "recoil";
import { PlaylistsAtom } from "../utils/atom";
import { PlaylistType } from "..";
import { useLocation } from "react-router";

const useCurrentPlaylist = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType | null>(null);
  const playlists = useRecoilValue(PlaylistsAtom)
  const location = useLocation()

  useLayoutEffect(() => {
    console.log(window.location.pathname, 'path')
    const playlistFromSlug: PlaylistType = findPlaylistFromSlug(
      window.location.pathname,
      playlists,
      "title"
    );
    setCurrentPlaylist(playlistFromSlug)
  }, [location, playlists]);

  return currentPlaylist;
};

export default useCurrentPlaylist;
