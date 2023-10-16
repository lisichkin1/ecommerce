import multiparty from 'multiparty';

export default function handle(req, res) {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Ошибка при разборе формы:', err);
      return res.status(500).json({ error: 'Ошибка при разборе формы' });
    }
    console.log('Длина файлов:', files.file.length);
    return res.json('ok');
  });
}

export const config = {
  api: { bodyParser: false },
};
