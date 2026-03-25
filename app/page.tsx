import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">PlaylistBridge</h1>
      <p className="text-lg text-gray-500 mb-8">
        Share playlists across Spotify and Apple Music
      </p>

      {session ? (
        <div className="text-center">
          <p className="mb-4">Signed in as {session.user?.name}</p>
          <Link
            href="/api/auth/signout"
            className="text-red-500 underline"
          >
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