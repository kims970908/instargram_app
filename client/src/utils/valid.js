const valid = ({ fullname, username, email, password, cf_password }) => {
  const err = {};

  if (!fullname) {
    err.fullname = "이름을 입력해주세요";
  } else if (fullname.length > 6) {
    err.fullname = "6자리 미만으로 입력해주세요";
  }

  if (!username) {
    err.username = "아이디를 입력해주세요";
  } else if (username.replace(/ /g, "").length > 15) {
    err.username = "15자리 미만으로 입력해주세요";
  }

  if (!email) {
    err.email = "이메일을 입력해주세요";
  } else if (!validateEmail(email)) {
    err.email = "이메일 형식이 맞지 않습니다";
  }

  if (!password) {
    err.password = "비밀번호를 입력해주세요";
  } else if (password.length > 10) {
    err.password = "10자리 미만으로 입력해주세요";
  }

  if (password !== cf_password) {
    err.cf_password = "비밀번호가 맞지 않습니다";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

//regex email js
function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
