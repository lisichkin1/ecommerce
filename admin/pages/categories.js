import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function categories() {
  const [name, setName] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = () => {
    axios.get('/api/categories').then((response) => {
      console.log(response.data);
      setCategoriesList(response.data);
    });
  };
  const saveCategory = async (ev) => {
    ev.preventDefault();
    await axios.post('/api/categories', { name, parentCategory });
    setName('');
    fetchCategories();
  };
  const sortedCategoriesList = categoriesList.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
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
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}>
          <option value="0">Нет родительской категории</option>
          {sortedCategoriesList.length > 0 &&
            sortedCategoriesList.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-primary">
          Сохранить
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Название категории</td>
            <td>Родительская категория</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {sortedCategoriesList.length > 0 &&
            sortedCategoriesList.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  {category.parent
                    ? categoriesList.find((c) => c.id === category.parent)?.name
                    : 'Нет родительской категории'}
                </td>
                <td className="flex flex-grow gap-2">
                  <button className="btn-primary-second">Сохранить</button>
                  <button className="btn-primary-second">Удалить</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
