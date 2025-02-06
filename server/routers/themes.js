const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

function themes(dbClient) {
    const themesCollection = dbClient.db('questions').collection('themes');
    const questionsCollection = dbClient.db('questions').collection('questions');

    return router
        .get('/:id', function(req, res) {
            Promise.all([
                questionsCollection.find().toArray().then((questions) => questions),
                themesCollection.findOne({id: req.params.id }).then((theme) => theme)
            ]).then(([ questions, themeItem]) => {
                const questionsResult = (questions || []).filter(({  themeId }) =>  themeId === themeItem.id);
                res.send({
                    ...themeItem,
                    questions: questionsResult
                });
            });
        })
        .get('/', function(req, res) {
            themesCollection.find().toArray().then((themes) => {
                res.send(themes);
            })
        })
        .post('/', function(req, res) {
            themesCollection.insertOne({
                ...req.body,
                id: uuidv4()
            }).then((data) => {
                res.send(data);
            });
        })
        .put('/', function(req, res) {
            const {_id, ...theme}  = req.body;
            themesCollection.updateOne({
                id: req.body.id
            }, {
                $set: theme
            }).then((data) => {
                res.send(data);
            });
        })
        .delete('/', function(req, res) {
            const { id }  = req.body;
            Promise.all([
                themesCollection.deleteOne({id}).then((data) => data),
                questionsCollection.deleteMany({themeId:id}).then((data) => data),
            ]).then(((themes, questions) => {
                res.send({
                    themes,
                    questions
                })
            }))
        });
}


module.exports = function (app, dbClient) {
    app.use('/themes', themes(dbClient));
}