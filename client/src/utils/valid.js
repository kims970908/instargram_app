import { validate } from "../../../models/userModel";

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
  }
};
