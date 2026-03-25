"use client";

import { useEffect, useState } from "react";
import { SpotifyPlaylist } from "@/lib/spotify";

export default function PlaylistPicker() {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/playlist/spotify")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPlaylists(data);
        }
      })
      .catch(() => setError("Something went wrong."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading your playlists...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Pick a playlist to share</h2>
      <ul className="space-y-2">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
          >
            {playlist.imageUrl && (
              <img
                src={playlist.imageUrl}
                alt={playlist.name}
                className="w-12 h-12 rounded object-cover"
              />
            )}
            <div>
              <p className="font-medium">{playlist.name}</p>
              <p className="text-sm text-gray-400">{playlist.trackCount} tracks</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}