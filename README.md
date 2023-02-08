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

