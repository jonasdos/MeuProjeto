const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/salvar', (req, res) => {
  const novoRegistro = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao ler o arquivo de dados.');
    }

    const registros = JSON.parse(data);
    registros.push(novoRegistro);

    fs.writeFile('data.json', JSON.stringify(registros, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao salvar o arquivo de dados.');
      }

      res.status(200).send('Dados salvos com sucesso!');
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
