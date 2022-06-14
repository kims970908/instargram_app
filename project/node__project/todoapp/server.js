require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
let multer = require("multer");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { response } = require("express");
const { request } = require("express");
const req = require("express/lib/request");

const app = express();
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/public", express.static("public"));
app.use(methodOverride("_method"));
app.use("/shop", require("./routes/shop.js"));
app.use("/board", require("./routes/sports.js"));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//upload ----multer라이브러리 사용법
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  }, //업로드 위치
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }, //업로드 파일명
});

var upload = multer({
  storage: storage,
});

// passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      console.log(입력한아이디, 입력한비번);
      db.collection("login").findOne(
        {
          id: 입력한아이디,
        },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, {
              message: "존재하지않는 아이디요",
            });
          if (입력한비번 == 결과.pw) {
            return done(null, 결과);
          } else {
            return done(null, false, {
              message: "비번틀렸어요",
            });
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// DB의 user.id로 유저의 정보를 찾음
passport.deserializeUser((id, done) => {
  db.collection("login").findOne(
    {
      id: id,
    },
    (error, result) => {
      done(null, result);
    }
  );
});

//  mogodb 연결
MongoClient.connect(process.env.DB_URL, (error, clinet) => {
  if (error) return console.log(error);

  db = clinet.db("todoapp");

  app.listen(8080, function () {
    console.log("listening on 8080");
  });
});

app.get("/", (request, response) => {
  response.render("index.ejs");
});

app.get("/write", function (request, response) {
  response.render("write.ejs");
});

// -------------------list페이지-----------------------
app.get("/list", (request, response) => {
  db.collection("post")
    .find()
    .toArray((error, result) => {
      if (error) return console.log(error);
      console.log(result);

      response.render("list.ejs", {
        posts: result,
      });
    });
});

app.get("/login", (request, response) => {
  response.render("login.ejs");
});

app.get("/mypage", 로그인했니, (request, response) => {
  console.log(request.user);
  response.render("mypage.ejs", {
    user: request.user,
  });
});

//------------------Detail------------------------
app.get("/detail/:id", (request, response) => {
  db.collection("post").findOne(
    {
      _id: parseInt(request.params.id),
    },
    (error, result) => {
      console.log(result);

      response.render("detail.ejs", {
        data: result,
      });
    }
  );
});

//------------------edit------------------------
app.get("/edit/:id", (request, response) => {
  db.collection("post").findOne(
    {
      _id: parseInt(request.params.id),
    },
    (error, result) => {
      if (error) return console.log("오류입니다");
      if (result == null)
        return response.status(200).send({
          message: "없는 게시물 입니다",
        });
      console.log(result);
      response.render("edit.ejs", {
        post: result,
      });
    }
  );
});

//-----------------DB데이터 전송-----------------------------
app.post("/add", function (request, response) {
  db.collection("counter").findOne(
    {
      name: "products",
    },
    (error, result) => {
      let seqs = result.seq;
      var addContent = {
        _id: seqs + 1,
        제목: request.body.title,
        날짜: request.body.date,
        내용: request.body.content,
        작성자: request.user._id,
      };

      db.collection("post").insertOne(addContent, (error, result) => {
        console.log("저장완료");
        db.collection("counter").updateOne(
          {
            name: "products",
          },
          {
            $inc: {
              seq: 1,
            },
          },
          (error, result) => {
            if (error) return error;
            response.redirect("/list");
          }
        );
      });
    }
  );
});

//------------------edit기능------------------------
app.put("/edit", (request, response) => {
  db.collection("post").updateOne(
    {
      _id: parseInt(request.body.id),
    },
    {
      $set: {
        제목: request.body.title,
        날짜: request.body.date,
        내용: request.body.content,
      },
    },
    (error, result) => {
      console.log("수정완료");
      response.redirect("/list");
    }
  );
});

// app.post("/login", (request, response) => {
//   db.collection("login").findOne({}, {}, (error, result) => {
//     if (error) return "로그인오류";

//     response.render("login.ejs");
//   });
// });

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/fail",
  }),
  (request, response) => {
    response.redirect("/");
  }
);

// Login function
function 로그인했니(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.send("로그인안하셨어요");
  }
}

app.post("/chatroom", 로그인했니, function (request, response) {
  var store = {
    title: "타이틀",
    member: [request.body.chatId, request.user._id],
    date: new Date(),
  };
  db.collection("chatroom")
    .insertOne(store)
    .then((result) => {});
});
//-----------------search----------------------
app.get("/search", (requset, response) => {
  var Seacrh = [
    {
      $search: {
        index: "titleSearch",
        text: {
          query: requset.query.value,
          path: "제목",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];
  console.log(request.query); //여기에 검색값이 담겨있다.
  db.collection("post")
    .aggregate(Seacrh)
    .toArray((error, result) => {
      console.log(result);
      response.render("search.ejs", {
        posts: result,
      });
    });
});

app.get("/member", (request, response) => {
  response.render("member.ejs");
});

// -----------------------회원가입-----------------------------
app.post("/register", (request, response) => {
  // 비밀번호 같음 확인
  if (request.body.pw == request.body.pwCheck) {
    db.collection("login").insertOne(
      {
        id: request.body.id,
        pw: request.body.pw,
      },
      (error, result) => {
        response.redirect("/login");
      }
    );
  } else {
    console.log("비번다름");
  }
});
// ---------------DB데이터 삭제----------------------------
app.delete("/delete", (request, response) => {
  request.body._id = parseInt(request.body._id);
  var deleteData = {
    _id: request.body._id,
    작성자: request.user._id,
  };
  db.collection("post").deleteOne(deleteData, (error, result) => {
    if (error) return console.log(error);
    console.log("삭제성공");
    response.status(200).send({
      message: "성공했습니다",
    });
    // response.status(400).send({ message: "실패했습니다" });
    // response.status(500).send({ message: "실패했습니다" });
  });
});

// ---------------------upload--------

app.get("/upload", (request, response) => {
  response.render("upload.ejs");
});

app.post("/upload", upload.single("profile"), (request, response) => {
  response.send("upload완료");
});
