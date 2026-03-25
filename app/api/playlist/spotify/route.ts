import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMyPlaylists } from "@/lib/spotify";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const playlists = await getMyPlaylists(session.accessToken);
    return Response.json(playlists);
  } catch (err) {
    console.error("Failed to fetch Spotify playlists:", err);
    return Response.json({ error: "Failed to fetch playlists" }, { status: 500 });
  }
}