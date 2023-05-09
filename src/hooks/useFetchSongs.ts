import { useEffect, useState } from "react";
import { PlaylistType, SongType } from "..";
import { useLazyQuery } from "@apollo/client";
import { GET_SONGS_IN_PLAYLIST } from "../utils/queries";
import { useRecoilState, useSetRecoilState } from "recoil";
import { QueueAtom, SelectedMusicAtom } from "../utils/atom";

type FetchSongsPropsType = {
  currentPlaylist: PlaylistType | null;
};

const useFetchSongs = ({ currentPlaylist }: FetchSongsPropsType) => {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMusic, setSelectedMusic] = useRecoilState(SelectedMusicAtom);
  const setQueue = useSetRecoilState(QueueAtom);
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
      if (!selectedMusic) {
        if (currentPlaylist) {
          setQueue({ playlistId: currentPlaylist.id, songs: data.getSongs });
        }
        setSelectedMusic(data.getSongs[0]);
      }
    }
  }, [data]);

  return { songs, loading, search, setSearch };
};

export default useFetchSongs;
