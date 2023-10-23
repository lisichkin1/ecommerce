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
  const [properties, setProperties] = useState([]);
  const categoriesList = useSelector((state) => state.categorySlice.sortedCategories);

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    console.log(properties);
  }, [properties]);
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
  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  };
  const updatePropertyName = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const updatePropertyValues = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
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
          <button className="button-default-secondary" onClick={addProperty} type="button">
            Добавить характеристику
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 items-center justify-center">
                <input
                  className="mb-0"
                  type="text"
                  placeholder="Название характеристики"
                  value={property.name}
                  onChange={(ev) => updatePropertyName(index, property, ev.target.value)}
                />
                <input
                  className="mb-0"
                  type="text"
                  placeholder="Значение(разделённое запятой)"
                  value={property.values}
                  onChange={(ev) => updatePropertyValues(index, property, ev.target.value)}
                />
                <button className="button-default-third">
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Удалить
                </button>
              </div>
            ))}
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Редактировать
                  </button>
                  <button className="btn-primary-second" onClick={() => deleteCategory(category)}>
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
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
