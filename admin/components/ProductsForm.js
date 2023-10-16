import Layout from '@/components/Layout';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useReducer } from 'react';

export default function ProductsForm({
  id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [newItem, setNewItem] = useState({
    title: existingTitle || '',
    description: existingDescription || '',
    price: existingPrice || '',
  });
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();
  console.log({ id });
  const addItem = async (e) => {
    e.preventDefault();
    if (id) {
      if (newItem.title !== '' && newItem.price !== '' && newItem.description !== '') {
        try {
          const response = await axios.put('/api/products', { ...newItem, id });
          console.log('Сервер вернул:', response.data);
          setNewItem({ title: '', description: '', price: '' });
        } catch (error) {
          console.error('Ошибка при отправке данных на сервер:', error);
        }
      }
    } else {
      if (newItem.title !== '' && newItem.price !== '' && newItem.description !== '') {
        try {
          const response = await axios.post('/api/products', newItem);
          console.log('Сервер вернул:', response.data);
          setNewItem({ title: '', description: '', price: '' });
        } catch (error) {
          console.error('Ошибка при отправке данных на сервер:', error);
        }
      }
    }
    setGoToProduct(true);
  };
  if (goToProduct) {
    router.push('/products');
  }

  return (
    <form>
      <label>Название товара</label>
      <input
        className="input-product"
        type="text"
        placeholder="Введите название товара"
        value={newItem.title}
        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      />
      <label>Описание</label>
      <textarea
        placeholder="Введите описание"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        className="input-product"
        type="text"
        placeholder="Введите цену"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <button onClick={addItem} className="btn-primary">
        Сохранить
      </button>
    </form>
  );
}
