import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [newItem, setNewItem] = useState({ title: '', description: '', price: '' });
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.title !== '' && newItem.price !== '' && newItem.description !== '') {
      try {
        const response = await axios.post('/api/products', newItem);
        console.log('Сервер вернул:', response.data);
        setNewItem({ title: '', description: '', price: '' });
      } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
      }
    }
  };

  return (
    <Layout>
      <form>
        <h1>Новый товар</h1>
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
    </Layout>
  );
}
