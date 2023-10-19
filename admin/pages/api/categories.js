import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default async function handle(req, res) {
  const { method } = req;
  if (method === 'POST') {
    try {
      const { name } = req.body;
      const newDocRef = await addDoc(collection(db, 'categories'), {
        name: name,
      });
      console.log('Категория успешно добавлена с идентификатором: ', newDocRef.id);
      res.status(200).json({ message: 'категория успешно создана' });
    } catch (error) {
      console.error('ошибка при создании категории:', error);
      res.status(500).json({ message: 'произошла ошибка при создании категории' });
    }
  }
}
