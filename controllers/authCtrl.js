const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  //회원가입 인증
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      //username중복확인
      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res.status(400).json({ msg: "이미 존재하는 이름 입니다." });

      //email중복확인
      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "이미 존재하는 이메일 입니다." });

      //password 최소자리 확인
      if (password.length < 6)
        return res.status(400).json({ msg: "비밀번호는 6자리 이상입니다." });

      //password 암호화
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      //연장 토큰
      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      console.log({ access_token, refresh_token });

      console.log(newUser);

      // const access_token = createAccessToken({id:newUser._id})
      // const refresh_token = createRefreshToken({id:newUser._id})

      res.json({
        msg: "회원가입성공",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //로그인 인증
  login: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //로그아웃 인증
  logout: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //
  generateAccessToken: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = authCtrl;
