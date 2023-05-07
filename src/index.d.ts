export type PlaylistType = {
    title: string;
    id: number;
}

export type IconType = {
    color?: string
}

export type SongType = {
    _id: number;
    artist: string;
    duration: number;
    photo: string;
    title: string;
    url: string;
}