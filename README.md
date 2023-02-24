# 소개 

Next.js, Firebase를 이용하여 CRUD 기능이 있는 기본적인 어플리케이션을 만들어본 토이 프로젝트입니다. 

- 배포 페이지: https://nextjs-crud-ruby.vercel.app/login
  
- 프로젝트 설명 & 회고 포스팅: [Next.js + Firebase로 어플리케이션 만들기](https://velog.io/@sanglee/Next.js-Firebase%EB%A1%9C-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85)





# 스택

### React, Next.js, TypeScript, Firebase

전역 상태관리: Context API
그외 라이브러리: classnames, antd


#  파일구조

### src

```
├── assets
│   ├── fonts
│   └── images
├── components
│   ├── auth
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── index.module.scss
│   ├── layout
│   │   ├── MainNavigation.module.scss
│   │   ├── MainNavigation.tsx
│   │   ├── MobileHeader.module.scss
│   │   ├── MobileHeader.tsx
│   │   ├── index.module.scss
│   │   └── index.tsx
│   ├── posts
│   │   ├── NewPost.module.scss
│   │   ├── NewPost.tsx
│   │   ├── PostDetail.module.scss
│   │   ├── PostDetail.tsx
│   │   ├── PostItem.module.scss
│   │   ├── PostItem.tsx
│   │   └── PostList.tsx
│   └── shared
│       ├── Button.module.scss
│       ├── Button.tsx
│       ├── Card.module.scss
│       ├── Card.tsx
│       ├── Message.module.scss
│       ├── Message.tsx
│       ├── PostEditForm.module.scss
│       ├── PostEditForm.tsx
│       ├── ProfileMenu.module.scss
│       └── ProfileMenu.tsx
├── firebase
│   ├── errors.ts
│   ├── firebaseAdmin.ts
│   ├── firebaseClient.ts
│   └── serviceAccount.json
├── pages
│   ├── [postId]
│   │   └── index.tsx
│   ├── _app.tsx
│   ├── api
│   │   ├── new-post.ts
│   │   └── update-post.ts
│   ├── index.tsx
│   ├── login
│   │   └── index.tsx
│   ├── new-post
│   │   └── index.tsx
│   ├── search
│   │   └── index.tsx
│   └── signup
│       └── index.tsx
├── context
│   ├── auth.tsx
│   └── authProvider.tsx
├── styles
│   ├── base
│   │   ├── _fonts.scss
│   │   ├── _more.scss
│   │   └── _reset.scss
│   ├── constants
│   │   ├── _colors.scss
│   │   ├── _sizes.scss
│   │   └── _theme.scss
│   ├── index.scss
│   └── mixins
│       └── _responsive.scss
└── utils
    ├── db
    │   └── serviceAccoutKey.json
    └── index.ts

```


# 구조

## Frontend & Firebase
<img width="729" alt="스크린샷 2023-02-12 오후 5 58 22" src="https://user-images.githubusercontent.com/92660097/218301909-d0eabbbb-6d3b-4dbb-b526-0d1d99ff0817.png">



### 회원가입 
→ `createUserWithEmailAndPassword`함수에 입력받은 email과 password를 인자로 넣고, Firebase auth에 사용자 계정을 생성한다.
```ts
// SignupForm.tsx
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void | Promise<UserCredential | undefined> => {
    event.preventDefault();
    if (error) setError('');
    if (signupForm.password !== signupForm.confirmPassword) return setError('동일한 비밀번호를 입력해주세요.');
    return createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };
```

### 로그인
1. `signInWithEmailAndPassword`함수가 호출되면 `auth`에 로그인한 사용자 정보가 저장된다.
```ts
// LoginForm.tsx

import { auth } from '../../firebase/firebaseClient';

  ...

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(loginForm.email, loginForm.password);
    });
  };
```

2. authProvider.tsx에서 firebaseClient auth 에 저장된 사용자 정보를 가져와 쿠키에 저장한다.

```ts
// authProvider.tsx 
import { getAuth, User } from 'firebase/auth';
import nookies from 'nookies';

...

export const AuthProvider = ({ children }: any) => {
  ...

  useEffect(() => {
    // 로그인된 사용자(getAuth)의 ID토큰을 가져와서(onIdTokenChanged) 쿠키에 저장한다.
    return getAuth().onIdTokenChanged(async (user) => { 
      if (!user) {
        setUserState(null);
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      setUserState(user);
      const token = await user.getIdToken();
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

...

```

### 글 생성


PostEditForm.tsx 에서 새로운 글 생성됨 → pages/new-post/index.tsx 의 addPostHandler를 통해 api/new-post 
```ts

```


```ts

```

## Next.js API

<img width="780" alt="스크린샷 2023-02-12 오후 5 59 28" src="https://user-images.githubusercontent.com/92660097/218302402-619dd61d-a3cd-400f-b0ec-bf8425f9f709.png">




  

# 주요기능 

- 로그인, 회원가입 및 구글 로그인
  - 로그인, 회원가입 form에서 유효성 검사
  - Firebase Auth와 연동
  - 로그아웃 상태에서 login page로 리다이렉트
- 글 생성, 수정, 삭제, 읽기
  - 로그인된 회원의 uid로 Firebase Stor와 연동 
- 반응형 UI
  - 모바일, 태블릿, 데스크탑 화면 모두 대응


## 로그인, 회원가입

회원가입 인증 에러 핸들링
- 이미 있는 이메일일 경우 또는 비밀번호 재입력 시 입력 값이 일치하지 않을 경우 안내 메세지를 띄웁니다.
![회원가입](https://user-images.githubusercontent.com/92660097/218301991-5e48e0a5-9a30-4ae5-a1b1-30247cf36d23.gif)

로그인 인증 에러 핸들링
- 로그인 실패시 안내 메세지를 띄웁니다.
![로그인](https://user-images.githubusercontent.com/92660097/218301995-d8f86a2b-9dae-4cd1-b292-b1f1a485b16f.gif)

src/firebase/errors.ts 파일에 에러 메세지를 모듈화해두었습니다.
```ts
export const FIREBASE_ERRORS = {
  'Firebase: Error (auth/email-already-in-use).': '이미 사용 중인 이메일입니다.',
  'Firebase: Error (auth/invalid-email).': '이메일 형식을 확인해주세요.',
  'Firebase: Password should be at least 6 characters (auth/weak-password).': '비밀번호를 6자리 이상 입력해주세요.',
  'Firebase: Error (auth/user-not-found).': '이메일 또는 비밀번호를 확인해주세요.',
  'Firebase: Error (auth/wrong-password).': '이메일 또는 비밀번호를 확인해주세요.',
};
```

사용 예) `src/components/auth/SignupForm.tsx`에서 회원가입 중 오류가 있을 경우 안내 메세지를 노출합니다. 

```ts
  ...

  const [error, setError] = useState(''); 
  const [createUserWithEmailAndPassword, userCredential, loading, authError] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmitSignup = (event: React.FormEvent<HTMLFormElement>): void | Promise<UserCredential | undefined> => {
  event.preventDefault();
  if (error) setError(''); // error값 초기화

  // 비밀번호 재입력 불일치할 경우 error state값에 에러 메세지가 할당된다. 
  if (signupForm.password !== signupForm.confirmPassword) return setError('동일한 비밀번호를 입력해주세요.');

  return createUserWithEmailAndPassword(signupForm.email, signupForm.password); // 회원가입 함수 실행
};
  
  ...

  return (
    ...
    // 비밀번호 불일치 error 메세지가 존재할 경우 
    {(error && <div className={classes.error_message}> {error} </div>) || (

      <div className={classes.error_message}>
        {FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]} 
      </div>
        // 👆 authError가 있을 경우 authError type에 해당하는 FIREBASE_ERRORS 값을 가져온다.
 
  )}  
    ...
  )
```


## 로그아웃

![로그아웃](https://user-images.githubusercontent.com/92660097/221105147-00a1843d-0ff1-4195-8989-65b3947fb546.gif)

```ts
// MainNavigation.tsx

import { signOut } from 'firebase/auth';

...

const MainNavigation = () => {

  const handleLogoutClick = () => {
    signOut(auth).then(() => {
      alert('로그아웃합니다.');
    });
    router.push('/login');
  };

  ...

  return (
    <nav>
      
      ...

      {user ? ( // 로그인 상태일 경우에 로그아웃 버튼이 노출된다.
        <>
          <div className={cx('profile')}>
            <span className="profile__name">{user?.email?.split('@')[0]}</span> // 사용자 이름
            <span className="profile__name">님</span>
          </div>
          <button className={cx('auth-btn')} onClick={handleLogoutClick}> // 로그아웃 버튼
            <span className="auth-btn__text">LOG OUT</span>
            <LoginOutlined style={{ fontSize: 24 }} />
          </button>
        </>
      ) : (
        <button className={cx('auth-btn')} onClick={() => router.push('/login')}> // 로그아웃 상태일 경우 
          <span className="auth-btn__text">LOG IN</span> // 로그인 버튼이 노출된다.
          <LoginOutlined style={{ fontSize: 24 }} />
        </button>
      )}

      ...

    </nav>
  )

}
```


## 글 생성, 수정, 삭제

생성

![글작성 수정](https://user-images.githubusercontent.com/92660097/218302016-4182b128-7eb3-491d-b836-ab0350cb6344.gif)

수정

![수정2](https://user-images.githubusercontent.com/92660097/221109866-1810de0f-4b37-447b-a896-000f8ab111f3.gif)


삭제

![삭제](https://user-images.githubusercontent.com/92660097/218302032-8ad940bb-0b6b-416b-b4cd-52c365975ef3.gif)


```ts

```


## 반응형
(용량 문제로 화질이 좋지 않은 점 양해바랍니다.)
![반응형2](https://user-images.githubusercontent.com/92660097/218304080-a9b3c860-7ebb-467f-a585-1dd8feab5cf9.gif)


