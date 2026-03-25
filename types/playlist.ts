export interface Track {
  title: string;
  artist: string;
  album: string;
  durationMs: number;
}

export interface SharedPlaylist {
  id: string;
  createdAt: string;
  sourcePlatform: "spotify" | "apple";
  title: string;
  coverArt: string;
  tracks: Track[];
}