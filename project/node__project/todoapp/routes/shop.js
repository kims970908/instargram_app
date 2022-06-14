var router = require("express").Router();

router.get("/shirts", (request, response) => {
  response.send("셔츠 페이지");
});

router.get("/pants", (request, response) => {
  response.send("바지 페이지");
});

module.exports = router;
