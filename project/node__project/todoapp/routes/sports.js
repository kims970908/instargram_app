var sports = require("express").Router();

sports.get("/sub/sports", (request, response) => {
  response.send("스포츠게시판");
});

sports.get("/sub/game", (request, response) => {
  response.send("게임게시판");
});

module.exports = sports;
