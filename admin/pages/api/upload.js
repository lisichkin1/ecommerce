import multiparty from 'multiparty';
import EasyYandexS3 from 'easy-yandex-s3';
const path = require('path');
const dotenv = require('dotenv');
dotenv.config(); // Загрузить переменные окружения из файла .env

export default async function handle(req, res) {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Ошибка при разборе формы:', err);
      return res.status(500).json({ error: 'Ошибка при разборе формы' });
    }

    console.log('Длина файлов:', files.file);

    const s3 = new EasyYandexS3({
      auth: {
        accessKeyId: process.env.YANDEX_CLOUD_ID,
        secretAccessKey: process.env.YANDEX_CLOUD_KEY,
      },
      Bucket: 'ecommerce',
      debug: true,
    });

    const links = [];

    try {
      await Promise.all(
        files.file.map(async (file) => {
          const ext = file.originalFilename.split('.').pop();
          const newFileName = Date.now() + '.' + ext;

          console.log({ ext, file });

          const uploadResult = await s3.Upload(
            {
              path: file.path, // Убедитесь, что вы передаете путь к файлу, а не содержимое
              name: newFileName,
            },
            '/images/',
          );

          const link = `https://ecommerce.storage.yandexcloud.net/images/${newFileName}`;
          links.push(link);
        }),
      );
      return res.json({ links });
    } catch (error) {
      console.error('Ошибка при загрузке файлов:', error);
      return res.status(500).json({ error: 'Ошибка при загрузке файлов' });
    }
  });
}

export const config = {
  api: { bodyParser: false },
};
