import Layout from '@/components/Layout';
import ProductsForm from '@/components/ProductsForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function EditProductPage() {
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

  return (
    <Layout>
      <h1>Редактировать товар</h1>
      {productInfo && <ProductsForm {...productInfo} />}
    </Layout>
  );
}
