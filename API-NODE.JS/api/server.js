import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import db from './src/db.js';

const app = express();
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log('acessou middleware *********');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});
app.use(express.json());
app.use(routes);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.listen(3333, () => console.log('Servidor iniciado na porta 3333'));
