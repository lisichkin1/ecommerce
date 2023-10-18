import Layout from '@/components/Layout';
import axios from 'axios';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useReducer } from 'react';

export default function ProductsForm({
  id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [newItem, setNewItem] = useState({
    title: existingTitle || '',
    description: existingDescription || '',
    price: existingPrice || '',
  });
  const [goToProduct, setGoToProduct] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const router = useRouter();
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
  const uploadImages = async (ev) => {
    const files = ev.target?.files;
    if (files && files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  };

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
      <label>Фотографии</label>
      <div className="mb-4 flex">
        {images?.length &&
          images.map((link) => (
            <div key={link} className="h-32">
              <Image src={link} alt="photo" width={300} height={300} />
            </div>
          ))}
        <label className="w-32 h-32 border flex items-center justify-center gap-2 flex-col text-gray-500 rounded-xl bg-gray-200 border-green-300 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>
          <span>Загрузить</span>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
        {!images?.length && <div>Нет фотографий для этого товара</div>}
      </div>
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
