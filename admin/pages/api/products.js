import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  updateDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

export default async function handle(req, res) {
  const { method } = req;
  const { id } = req.query; // Получение параметра id из параметров запроса
  if (req.method === 'GET') {
    if (id) {
      try {
        const productId = id;
        const productDocRef = doc(db, 'products', productId);
        const productDoc = await getDoc(productDocRef);
        if (productDoc.exists()) {
          const productData = productDoc.data();
          res.status(200).json({ id: productId, ...productData });
        } else {
          res.status(404).json({ message: 'Товар не найден' });
        }
      } catch (error) {
        console.error('Ошибка при получении товара:', error);
        res.status(500).json({ message: 'Произошла ошибка при получении товара' });
      }
    } else {
      try {
        const productsCollection = collection(db, 'products');
        const productsQuery = query(productsCollection);

        const snapshot = await getDocs(productsQuery);

        const products = [];
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(products);
      } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        res.status(500).json({ message: 'Произошла ошибка при получении товаров' });
      }
    }
  } else if (method === 'POST') {
    try {
      const { title, description, price, images } = req.body;

      const newDocRef = await addDoc(collection(db, 'products'), {
        title: title.trim(),
        description: description,
        price: price,
        images: images,
      });

      console.log('Документ успешно добавлен с идентификатором: ', newDocRef.id);

      // Отправьте клиенту успешный статус
      res.status(200).json({ message: 'Товар успешно создан' });
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
      res.status(500).json({ message: 'Произошла ошибка при создании товара' });
    }
  } else if (method === 'PUT') {
    const { title, description, price, images, id } = req.body;
    console.log('КАРТИНКА ', { images });
    try {
      const productDocRef = doc(db, 'products', id);
      await updateDoc(productDocRef, {
        title: title.trim(),
        description,
        price,
        images: images,
      });

      res.status(200).json({ message: 'Товар успешно обновлен' });
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
      res.status(500).json({ message: 'Произошла ошибка при обновлении товара' });
    }
  } else if (method === 'DELETE') {
    if (id) {
      try {
        await deleteDoc(doc(db, 'products', id));
        res.status(200).json({ message: 'Товар успешно удален' }); // Отправляем успешный ответ
      } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        res.status(500).json({ message: 'Произошла ошибка при удалении товара' });
      }
    }
  } else {
    res.status(405).end(); // Метод не поддерживается
  }
}
