import Layout from '@/components/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';

export default function products() {
  useEffect(() => {
    axios.get('/api/products').then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link className="bg-green-400 p-2 rounded-lg pb-3 text-white" href={'products/new'}>
        Добавить новый товар
      </Link>
    </Layout>
  );
}
