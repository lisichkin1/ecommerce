import Layout from '@/components/Layout';
import ProductsForm from '@/components/ProductsForm';

export default function Home() {
  return (
    <Layout>
      <h1>Новый товар</h1>
      <ProductsForm />
    </Layout>
  );
}
