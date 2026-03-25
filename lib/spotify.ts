const SPOTIFY_API = "https://api.spotify.com/v1";

export interface SpotifyPlaylist {
  id: string;
  name: string;
  imageUrl: string;
  trackCount: number;
}

export async function getMyPlaylists(
  accessToken: string
): Promise<SpotifyPlaylist[]> {
  const res = await fetch(`${SPOTIFY_API}/me/playlists?limit=50`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }

  const data = await res.json();

  return data.items
  .filter((item: any) => item !== null)
  .map((item: any) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.images?.[0]?.url ?? "",
    trackCount: item.tracks?.total ?? 0,
  }));
}