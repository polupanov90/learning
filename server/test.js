const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello!')
})

app.use(express.static("public")); // статические файлы будут в папке public
app.use(express.json()); // подключаем автоматический парсинг json
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(4000, () => {
    console.log("server is running on port 4000")
});

