import { useEffect, useState } from "react";
import { PlaylistType, SongType } from "..";
import { useLazyQuery } from "@apollo/client";
import { GET_SONGS_IN_PLAYLIST } from "../utils/queries";

type FetchSongsPropsType = {
  currentPlaylist: PlaylistType | null;
};

const useFetchSongs = ({ currentPlaylist }: FetchSongsPropsType) => {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [search, setSearch] = useState("");
  const [getSongs, { data, loading }] = useLazyQuery(GET_SONGS_IN_PLAYLIST);

  const fetchSongs = (playlistId: number, search = "") => {
    const variables = { playlistId, search };
    getSongs({ variables });
  };

  useEffect(() => {
    if (search && currentPlaylist?.id) {
      const id = setTimeout(() => {
        fetchSongs(currentPlaylist?.id, search);
      }, 500);
      return () => clearInterval(id);
    } else if (currentPlaylist?.id) {
      fetchSongs(currentPlaylist?.id, search);
    }
  }, [currentPlaylist, search]);

  useEffect(() => {
    if (data) {
      setSongs(data.getSongs);
    }
  }, [data]);

  return { songs, loading, search, setSearch };
};

export default useFetchSongs;
