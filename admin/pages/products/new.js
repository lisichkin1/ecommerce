import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useState } from 'react';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [descriprion, setDescription] = useState('');
  const [price, setPrice] = useState('');
  console.log(title, descriprion, price);
  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, descriprion, price };
    await axios.post('/api/products', data);
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>Новый товар</h1>
        <label>Название товара</label>
        <input
          className="input-product"
          type="text"
          placeholder="Введите название товара"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Описание</label>
        <textarea
          placeholder="Введите описание"
          value={descriprion}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Цена(руб)</label>
        <input
          className="input-product"
          type="text"
          placeholder="Введите цену"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Сохранить
        </button>
      </form>
    </Layout>
  );
}
