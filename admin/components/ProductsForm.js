import Layout from '@/components/Layout';
import axios from 'axios';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactSortable } from 'react-sortablejs';
import React, { useState, useEffect, useReducer } from 'react';
import { setCategories } from '@/redux/slices/categorySlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';

export default function ProductsForm({
  id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
}) {
  const [newItem, setNewItem] = useState({
    title: existingTitle || '',
    description: existingDescription || '',
    price: existingPrice || '',
    images: existingImages || [],
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [goToProduct, setGoToProduct] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState('' || existingCategory);
  const categoriesList = useSelector((state) => state.categorySlice.sortedCategories);

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    console.log(category);
  }, [category]);
  const addItem = async (e) => {
    e.preventDefault();
    if (id) {
      if (newItem.title !== '' && newItem.price !== '' && newItem.description !== '') {
        try {
          const response = await axios.put('/api/products', {
            ...newItem,
            id,
            images,
            category,
          });
          console.log('Сервер вернул:', response.data);
          setNewItem({ title: '', description: '', price: '', images: [] });
        } catch (error) {
          console.error('Ошибка при отправке данных на сервер:', error);
        }
      }
    } else {
      if (newItem.title !== '' && newItem.price !== '' && newItem.description !== '') {
        try {
          const response = await axios.post('/api/products', { ...newItem, images, category });
          console.log('Сервер вернул:', response.data);
          setNewItem({ title: '', description: '', price: '', images: [] });
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
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  };
  const updateImagesOrder = (images) => {
    setImages(images);
  };
  const fetchCategories = () => {
    axios.get('/api/categories').then((response) => {
      dispatch(setCategories(response.data));
    });
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
      <label>Категория</label>
      <select className="mb-0" value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="0">Нет родительской категории</option>
        {categoriesList.length > 0 &&
          categoriesList.map((category) => <option value={category.id}>{category.name}</option>)}
      </select>
      <label>Фотографии</label>
      <div className="mb-4 flex flex-wrap gap-2">
        <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-2">
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-32 ">
                <img src={link} alt="photo" className="rounded-xl" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-32 flex items-center w-32 justify-center">
            <Spinner />
          </div>
        )}
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
