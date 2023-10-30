import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Layout({ children }) {
  const { data: session } = useSession();
  const inactiveLink =
    'flex gap-2 p-4 rounded-xl hover:shadow-lg transition duration-300 ease-in-out';
  if (!session) {
    return (
      <div className="bg-blue-500 w-full h-screen flex items-center justify-center">
        <div>
          <button
            onClick={() => signIn('google')}
            className="text-black transition duration-300 ease-in-out bg-white p-3 rounded-md border-none px-4 transform  hover:bg-indigo-100 hover:scale-105">
            Войсти с помощью Google
          </button>
          <button onClick={() => signOut()} className={inactiveLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Выйти
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-green-100 min-h-screen flex">
      <Nav />
      <div className="bg-slate-100 flex-grow p-4">{children}</div>
    </div>
  );
}
