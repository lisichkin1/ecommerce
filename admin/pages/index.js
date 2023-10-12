import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
export default function Component() {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <Layout>
      <div>Привет, {session?.user?.name}</div>
    </Layout>
  );
}
