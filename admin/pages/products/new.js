import Layout from '@/components/Layout';
import React from 'react';

export default function NewProduct() {
  return (
    <Layout>
      <h1>Новый товар</h1>
      <label>Название товара</label>
      <input className="input-product" type="text" placeholder="Введите название товара" />
      <label>Описание</label>
      <textarea placeholder="Введите описание" />
      <label>Цена(руб)</label>
      <input className="input-product" type="text" placeholder="Введите цену" />
      <button className="btn-primary">Сохранить</button>
    </Layout>
  );
}
