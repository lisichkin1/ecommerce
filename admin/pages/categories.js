import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function categories() {
  const [name, setName] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  useEffect(() => {
    axios.get('/api/categories').then((response) => {
      setCategoriesList(response.data);
    });
  }, []);

  const saveCategory = async (ev) => {
    ev.preventDefault();
    await axios.post('/api/categories', { name });
    setName('');
  };
  return (
    <Layout>
      <h1>Категории</h1>
      <label>Название новой категории</label>
      <form onSubmit={saveCategory} className="flex gap-4 justify-center items-center">
        <input
          className="mb-0"
          type="text"
          placeholder="Название категории"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Сохранить
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Название категории</td>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
