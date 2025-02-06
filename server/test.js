const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors')
const routes = require('./routers/routes');
const { MONGO_DB_CONNECT_URL } = require('./constants');

const app = express();
app.use(cors());

app.use(express.static("public")); // статические файлы будут в папке public
app.use(express.json()); // подключаем автоматический парсинг json
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(4000, () => {
    console.log("server is running on port 4000")
});

