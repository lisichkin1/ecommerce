import Layout from '@/components/Layout';
import Link from 'next/link';

export default function products() {
  return (
    <Layout>
      <Link className="bg-green-400 p-2 rounded-lg pb-3 text-white" href={'products/new'}>
        Добавить новый товар
      </Link>
    </Layout>
  );
}
