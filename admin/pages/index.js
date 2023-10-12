import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
export default function Component() {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <Layout>
      <div className="flex text-green-500 justify-between items-center">
        <h2>
          Привет, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex gap-4 text-black items-center">
          <span className="font-medium text-lg">{session?.user?.name}</span>

          <img src={session?.user.image} alt="user image" className="w-12 h-12 rounded-full" />
        </div>
      </div>
    </Layout>
  );
}
