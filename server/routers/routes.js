const questions = require("./questions");
const themes = require("./themes");

module.exports = function (app, dbClient) {
    questions(app, dbClient);
    themes(app, dbClient);
}