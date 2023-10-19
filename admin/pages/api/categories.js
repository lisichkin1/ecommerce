import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

export default async function handle(req, res) {
  const { method } = req;
  if (method === 'POST') {
    try {
      const { name, parentCategory } = req.body;
      const newDocRef = await addDoc(collection(db, 'categories'), {
        name: name,
        parent: parentCategory,
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
  }
}
