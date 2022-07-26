

# Social_Web
> [💻SOCIAL 사이트 바로가기](https://som-social-web.herokuapp.com/, "social-web")

## 소개

친구들과 사용할 수 있는 소셜 웹 사이트로 영상 통화 및 통화가 가능하고 <br>
팔로우 및 팔로윙이 가능하여 여러 사용자의 게시물을 볼 수 있습니다.

### 🛠사용 기술🛠

| 사용 | 기술명 |
| --- | --- |
| 데이터베이스 | <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> |
| 서버 프레임워크 | <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>  |
| 프레임워크 | <img src="https://img.shields.io/badge/React-0088CC?style=flat-square&logo=React&logoColor=white"/> (Redux 프레임워크) |
| 서버 사이드플랫폼 | <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> |

### 📃라이브러리


```
* axios (RESTfull API 데이터 통신)
* react-router-dom
* Socket.io (서버간 통신을 실시간으로 하기 위해 사용)
* redux (상태 관리를 위해서 사용)
* moment (게시물 날짜를 한글로 표현하기위해서 사용)
* peerjs (영상 통화 기능을 위해 사용)
* bcrypt (암호화를 위해서 사용)
* dotenv (.env파일을 사용 하기 위해서 사용)
* concurrently (server와 client를 동시에 실행 시키기 위해서 사용)
* cors (server를 위해서 사용)
* peer
```





## 🔑주요기능
```

📦 src
>> 📂pages
>>> 📂message (유저간 메시지를 보내고 통화를 할 수 있는 페이지 )
>>> 📂post ()
>>> 📂profile (유저의 프로필 및 게시물을 볼 수 있는 페이지)
>>> 📑discover.jsx (팔로우 하지 않은 유저들의 게시물을 볼 수 있는 페이지)
>>> 📑home.jsx (로그인 시 홈 페이지로 컴포넌트에서 여러가지 기능을 가져온다)
>>> 📑login.jsx (로그인 페이지 이메일로 로그인 가능)
>>> 📑register.jsx (회원가입 페이지)

```
</div>
