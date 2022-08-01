

# Social_Web
> [💻SOCIAL 사이트 바로가기](https://dashboard.heroku.com/apps/social-web-prj, "social-web")

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
| 서비스형 플랫폼 | <img src="https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=Heroku&logoColor=white"/> |

### 📃라이브러리


```
* axios (RESTfull API 데이터 통신)
* react-router-dom (컴포넌트 이용을 위해 사용 #V6와 V5의 문법이 달라짐)
* Socket.io (서버간 통신을 실시간으로 하기 위해 사용)
* redux (상태 관리를 위해서 사용)
* moment (게시물 날짜를 한글로 표현하기위해서 사용)
* peerjs (영상 통화 기능을 위해 사용)
* bcrypt (암호화를 위해서 사용)
* dotenv (.env파일을 사용 하기 위해서 사용)
* concurrently (server와 client를 동시에 실행 시키기 위해서 사용)
* cors (cross-origin HTTP 요청 방식)
```





## 🔑주요기능
```

📦 src
>> 📂pages
>>> 📂message (유저간 메시지를 보내고 통화를 할 수 있는 페이지 )
>>> 📂post (유저의 게시물을 볼 수 있는 페이지)
>>> 📂profile (유저의 프로필을 볼 수 있는 페이지)
>>> 📑discover.jsx (팔로우 하지 않은 유저들의 게시물을 볼 수 있는 페이지)
>>> 📑home.jsx (로그인 시 홈 페이지로 컴포넌트에서 여러가지 기능을 가져온다)
>>> 📑login.jsx (로그인 페이지 이메일로 로그인 가능)
>>> 📑register.jsx (회원가입 페이지)

```
</div>

## 페이지 소개


### 로그인 회원가입 페이지

<div align=center>

<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1658983701/Social_media/escz07d5xy9tqumsnnou.png"
width="400px" height="600px">
</img>
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1658992048/Github_Readme/register_page_hoxz3d.png"
width=400px height="600px">
</img>
</div>

```
회원가입 시 웹 토큰을 발급 받아서 로그인 시 자동 로그인을 도와 준다
```

### 홈페이지

<div align=center>

<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1658992536/Github_Readme/Home_page_wowme8.png"
width="400px" height="600px">
</img>
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1659330333/Github_Readme/create_post_gjeodi.png"
width="400px" height="600px">
</img>

</div>

```
여러 게시물들을 볼 수 있고, 사용자 검색기능으로 사용자의 ID를 입력 시 사용자가 나오며,
게시물은 동영상 및 여러 사진이 게시 가능하며 게시물의 업로드 크기를 10MB 지정하였습니다.
```

### 프로필 페이지
<div align="center">
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1659329806/Github_Readme/profile_page_m9sege.png"
width="400px" height="600px">
</img>
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1659330333/Github_Readme/create_profile_ggxpdf.png"
width="400px" height="600px">
</img>
</div>

```
프로필을 수정이 가능하며, 본인이 올련던 게시물들을 볼 수 있고,
북마크를 해놓은 게시물을 따로 볼 수 있다.
```

### 커버 페이지
<div align="center">
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1659333888/Github_Readme/discover_lnwdvq.png"
width="400px" height="600px">
</img>
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1659334651/Github_Readme/detail_page_y1ovjy.png"
width="400px" height="600px">
</img>
</div>

```
팔로우 하지 않은 유저들의 모든 게시물을 볼 수 있고, 
게시물 클릭 시 게시물을 상세히 볼 수 있습니다.
```

### 메세지 페이지
<div align="center">
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1659334694/Github_Readme/message_page_bgstqz.png"
width="400px" height="600px">
</img>
<img
src="https://res.cloudinary.com/dlb43l9iy/image/upload/v1659334577/Github_Readme/message_call_page_csnbrt.png"
width="400px" height="600px">
</img>
</div>

```
메시지 및 통화가 가능하여, 유저가 팔로우 되어 있다면 유저의 접속 상태를 확인 할 수 있다.
```
