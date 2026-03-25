import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import PlaylistPicker from "@/components/PlaylistPicker";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">PlaylistBridge</h1>
      <p className="text-lg text-gray-500 mb-8">
        Share playlists across Spotify and Apple Music
      </p>

      {session ? (
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <p className="text-gray-400">Signed in as {session.user?.name}</p>
          <PlaylistPicker />
          <Link href="/api/auth/signout" className="text-red-500 underline text-sm">
            Sign out
          </Link>
        </div>
      ) : (
        <Link
          href="/api/auth/signin"
          className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600"
        >
          Sign in with Spotify
        </Link>
      )}
    </main>
  );
}