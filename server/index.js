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
const client = new MongoClient(MONGO_DB_CONNECT_URL);

client.connect().then((_client) => {
    routes(app, _client);
    app.listen(4000);
})

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {
    await client.close();
    console.log("Приложение завершило работу");
    process.exit();
});









