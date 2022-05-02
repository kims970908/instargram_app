import React, {useState} from "react";
import {Link} from 'react-router-dom'

const Login = () => {
  const initialState = {email:'', password:''}
  const [userDate, setUserDate] = useState(initialState)
  const {email, password} = userDate

  const handleChangeInput = e =>{
    const {name, value} = e.target
    setUserDate({...userDate, [name]:value})
  }
  return (

    <div className="auth_page">
      <form onSubmit={''}>
        <h3 className="text-uppercase text-center mb-4">
          Social Media
        </h3>
        <div className="form-group">
          <label htmlFor="이메일을 입력해주세요">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1"
          aria-describedby="email-help" placeholder="email" onChange={handleChangeInput} value={email} />
          <small id="emailHelp" className="form-text text-muted">email</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
           placeholder="비밀번호" onChange={handleChangeInput} value={password} name="password" />
        </div>
          <button type="submit" className="btn btn-dark w-100" disabled={email&&password?false: true}>로그인</button>
          <p className="my-2 text-center">
            <Link to='/register' style={{color:"crimson"}}>회원가입</Link>
          </p>
    </form>
    </div>

  );
};

export default Login;
