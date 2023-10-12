import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-500 w-full h-screen flex items-center justify-center">
        <div>
          <button
            onClick={() => signIn('google')}
            className="text-black transition duration-300 ease-in-out bg-white p-3 rounded-md border-none px-4 transform  hover:bg-indigo-100 hover:scale-105">
            Войсти с помощью Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-green-100 min-h-screen flex">
      <Nav />
      <div className="bg-slate-100 flex-grow">{children}</div>
    </div>
  );
}
