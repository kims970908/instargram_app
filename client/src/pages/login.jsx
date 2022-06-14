import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/")
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Social Media</h3>
        <div className="form-group">
          <label htmlFor="이메일을 입력해주세요">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="email"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="비밀번호"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small
              onClick={() => {
                setTypePass(!typePass);
              }}
            >
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          로그인
        </button>
        <p className="my-2 text-center">
          회원가입 하시겠습니까?{" "}
          <Link to ="/register" style={{ color: "crimson" }}>
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
