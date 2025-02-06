const express = require('express');
const {v4: uuidv4} = require("uuid");
const router = express.Router();

function questions(dbClient) {
    const questionsCollection = dbClient.db('questions').collection('questions');

    return router.get('/', function(req, res) {
        questionsCollection.find().toArray().then((all) => {
            res.send(all);
        });
    })
    .post('/', function(req, res) {
        console.log(req.body)
        questionsCollection.insertOne({
            ...req.body,
            id: uuidv4()
        }).then((data) => {
            res.send(data);
        });
    })
    .delete('/', function(req, res) {
        const { id }  = req.body;
        questionsCollection.deleteOne({id}).then((data) => {
            res.send(data);
        });
    });
}


module.exports = function (app, dbClient) {
    app.use('/questions', questions(dbClient));
}