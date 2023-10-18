import multiparty from 'multiparty';
import EasyYandexS3 from 'easy-yandex-s3';
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

export default async function handle(req, res) {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Ошибка при разборе формы:', err);
      return res.status(500).json({ error: 'Ошибка при разборе формы' });
    }
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

          const uploadResult = await s3.Upload(
            {
              path: file.path,
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
