import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useState } from 'react';

export default function categories() {
  const [name, setName] = useState('');
  const saveCategory = async () => {
    await axios.post('/api/categories', { name });
    setName('');
  };
  return (
    <Layout>
      <h1>Категории</h1>
      <label>Название новой категории</label>
      <form onSubmit={saveCategory} className="flex gap-4">
        <input
          className=""
          type="text"
          placeholder="Название категории"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Сохранить
        </button>
      </form>
    </Layout>
  );
}
