const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  //회원가입 인증
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");
      let newfullname = fullname.toLowerCase().replace(/ /g, "");

      const user_fullname = await Users.findOne({
        fullname: newfullname,
      });
      if (user_fullname)
        return res.status(400).json({
          msg: "이미 존재하는 이름 입니다.",
        });

      //username중복확인
      const user_name = await Users.findOne({
        username: newUserName,
      });
      if (user_name)
        return res.status(400).json({
          msg: "이미 존재하는 아이디 입니다.",
        });

      //email중복확인
      const user_email = await Users.findOne({
        email,
      });
      if (user_email)
        return res.status(400).json({
          msg: "이미 존재하는 이메일 입니다.",
        });

      //password 최소자리 확인
      if (password.length < 6)
        return res.status(400).json({
          msg: "비밀번호는 6자리 이상입니다.",
        });

      //password 암호화
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      //user 연장 토큰 생성
      const access_token = createAccessToken({
        id: newUser._id,
      });
      const refresh_token = createRefreshToken({
        id: newUser._id,
      });

      //쿠키만료일 설정  (24*60*60*1000 =>1day)
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
      });

      //mongoDB user에 저장
      await newUser.save();

      // console.log({ access_token, refresh_token });

      res.json({
        msg: "회원가입성공",
        access_token,
        user: {
          //user의 모든정보를 복사
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  //로그인 인증
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //populate =>  필드가 null값일
      const user = await Users.findOne({
        email,
        //-password
      }).populate(
        "followers following",
        "avatar username fullname followers following"
      );

      if (!user)
        return res.status(400).json({
          msg: "존재하지않는 이메일입니다",
        });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({
          msg: "비밀번호가 맞지않습니다",
        });

      //user 연장 토큰 생성
      const access_token = createAccessToken({
        id: user._id,
      });
      const refresh_token = createRefreshToken({
        id: user._id,
      });

      //쿠키만료일 설정  (24*60*60*1000 =>1day)
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "로그인 성공",
        access_token,
        user: {
          //user의 모든정보를 복사
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  //로그아웃 인증
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", {
        path: "/api/refresh_token",
      });
      return res.json({
        msg: "로그아웃 되었습니다",
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  //
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "로그인을 해주세요" });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "로그인을 해주세요" });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ msg: "존재하지 않는 사용자 입니다" });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//토큰생성 (기간 1일) 짧은 유효기간
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

//토큰생성(기간30일) 유효기간 길게설정
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
