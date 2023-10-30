import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { isAdminAuth } from './auth/[...nextauth]';

export default async function handle(req, res) {
  const { method } = req;
  await isAdminAuth(req, res);
  if (method === 'POST') {
    try {
      const { name, parentCategory, properties } = req.body;
      const newDocRef = await addDoc(collection(db, 'categories'), {
        name: name,
        parent: parentCategory,
        properties: properties,
      });
      console.log('Категория успешно добавлена с идентификатором: ', newDocRef.id);
      res.status(200).json({ message: 'категория успешно создана' });
    } catch (error) {
      console.error('ошибка при создании категории:', error);
      res.status(500).json({ message: 'произошла ошибка при создании категории' });
    }
  } else if (method === 'GET') {
    try {
      const productsCollection = collection(db, 'categories');
      const productsQuery = query(productsCollection);
      const snapshot = await getDocs(productsQuery);
      const categories = [];
      snapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(categories);
    } catch (error) {
      consolel.error('ошибка при получении категорий', error);
      res.status(500).json({ message: 'Произошла ошибка при получении категорий' });
    }
  } else if (method === 'PUT') {
    try {
      const { name, parentCategory, id, properties } = req.body;
      const productDocRef = doc(db, 'categories', id);
      await updateDoc(productDocRef, {
        name: name,
        parent: parentCategory,
        properties: properties,
      });
      res.status(200).json({ message: 'категория успешно обновлена' });
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      res.status(500).json({ message: 'Произошла ошибка при обновлении категории' });
    }
  } else if (method === 'DELETE') {
    const id = req.query.id;
    console.log('ID', id);
    if (id) {
      try {
        await deleteDoc(doc(db, 'categories', id));
        res.status(200).json({ message: 'категория успешно удалена' });
      } catch (error) {
        console.error('Ошибка при удалении категории:', error);
        res.status(500).json({ message: 'Произошла ошибка при удалении категории' });
      }
    }
  }
}
