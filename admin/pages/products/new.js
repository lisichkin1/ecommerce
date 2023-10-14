import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const [newItem, setNewItem] = useState({ title: '', descriprion: '', price: '' });

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.title !== '' && newItem.price !== '' && newItem.descriprion !== '') {
      await addDoc(collection(db, 'products'), {
        title: newItem.title.trim(),
        descriprion: newItem.descriprion,
        price: newItem.price,
      });
      setNewItem({ title: '', descriprion: '', price: '' });
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
          value={newItem.descriprion}
          onChange={(e) => setNewItem({ ...newItem, descriprion: e.target.value })}
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
