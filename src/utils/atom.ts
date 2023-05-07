import { atom } from "recoil";
import { PlaylistType, SongType, QueueType } from "..";

export const PlaylistsAtom = atom({
  key: "playlists",
  default: [] as PlaylistType[],
});

export const SelectedMusicAtom = atom({
  key: "selectedMusic",
  default: null as SongType | null
})

export const QueueAtom = atom({
  key: "Queue",
  default: null as QueueType | null
})
