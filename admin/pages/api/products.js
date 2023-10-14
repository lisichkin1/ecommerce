import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { db } from '../firebase';

export default async function handle(req, res) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { title, description, price } = req.body;
      const newDocRef = await addDoc(collection(db, 'products'), {
        title: title.trim(),
        description: description,
        price: price,
      });

      console.log('Документ успешно добавлен с идентификатором: ', newDocRef.id);

      // Отправьте клиенту успешный статус
      res.status(200).json({ message: 'Товар успешно создан' });
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
      res.status(500).json({ message: 'Произошла ошибка при создании товара' });
    }
  } else {
    res.status(405).end(); // Метод не поддерживается
  }
}
