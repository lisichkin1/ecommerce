import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      axios.get(`/api/products?id=${id}`).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [id]);

  const goBack = () => {
    router.push('/products');
  };
  const deleteProduct = async () => {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  };
  return (
    <Layout>
      <h1 className="text-center">Вы действительно хотите удалить этот товар?</h1>
      <p className="delete-title text-center">Название товара:{productInfo?.title}</p>
      <div className="flex gap-8 justify-center">
        <button className="button-red" onClick={deleteProduct}>
          Да
        </button>
        <button className="button-default" onClick={goBack}>
          Нет
        </button>
      </div>
    </Layout>
  );
}
