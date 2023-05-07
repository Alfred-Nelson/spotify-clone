import { atom } from "recoil";
import { PlaylistType } from "..";

export const PlaylistsAtom = atom({
  key: "playlists",
  default: [] as PlaylistType[],
});
