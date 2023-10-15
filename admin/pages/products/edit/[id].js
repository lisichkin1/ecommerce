import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      // Измените запрос, чтобы передать id как параметр запроса
      axios.get(`/api/products?id=${id}`).then((response) => {
        console.log(response.data);
      });
    }
  }, [id]);

  return <Layout>Редактирование</Layout>;
}
