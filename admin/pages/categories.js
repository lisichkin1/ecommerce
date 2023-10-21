import Layout from '@/components/Layout';
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { setCategories } from '@/redux/slices/categorySlice';
import { useSelector, useDispatch } from 'react-redux';
export default function categories() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const categoriesList = useSelector((state) => state.categorySlice.sortedCategories);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = () => {
    axios.get('/api/categories').then((response) => {
      dispatch(setCategories(response.data));
    });
  };
  const saveCategory = async (ev) => {
    ev.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      await axios.put('/api/categories', { ...data, id: editedCategory.id });
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    fetchCategories();
  };
  const editCategory = (category) => {
    const parentCategoryId = category.parent;
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(parentCategoryId || '0');
    console.log(parentCategoryId);
    console.log(parentCategory);
  };
  const deleteCategory = (category) => {
    Swal.fire({
      title: 'Ты уверен?',
      text: `Удалить категорию ${category.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4ade80',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Да, удалить',
      cancelButtonText: 'Отменить',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/categories?id=${category.id}`, { data: { id: category.id } });
        fetchCategories();
        Swal.fire('Категория удалена!', '', 'success');
      }
    });
  };
  return (
    <Layout>
      <h1>Категории</h1>
      <label>
        {editedCategory ? `Редактировать категорию ${editedCategory.name}` : 'Новая категория'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
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
            {categoriesList.length > 0 &&
              categoriesList.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label>Характеристики</label>
          <button className="button-default-secondary">Добавить характеристику</button>
        </div>
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
          {categoriesList.length > 0 &&
            categoriesList.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  {category.parent
                    ? categoriesList.find((c) => c.id === category.parent)?.name
                    : null}
                </td>
                <td className="flex flex-grow gap-2">
                  <button className="btn-primary-second" onClick={() => editCategory(category)}>
                    Редактировать
                  </button>
                  <button className="btn-primary-second" onClick={() => deleteCategory(category)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
