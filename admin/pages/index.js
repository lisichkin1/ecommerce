import { useSession, signIn, signOut } from 'next-auth/react';
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in
      <div className="bg-blue-500 w-full h-screen flex items-center justify-center">
        <div>
          <button
            onClick={() => signIn('google')}
            className="text-black transition duration-300 ease-in-out bg-white p-3 rounded-md border-none px-4 transform  hover:bg-indigo-100 hover:scale-105">
            Войсти с помощью Google
          </button>
        </div>
      </div>
    </>
  );
}
