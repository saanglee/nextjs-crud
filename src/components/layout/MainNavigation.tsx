import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './MainNavigation.module.scss';
import { HomeOutlined, PlusCircleOutlined, SearchOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { auth } from '../../firebase/firebaseClient';
import { useIdToken } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const cx = classNames.bind(styles);

const iconStyle = {
  fontSize: 28,
  paddingRight: 20,
};

// firebase:authUser:AIzaSyDjFy4PGbLxPVE6dYHzFimyyoPm7MCr9jU
// const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

const MainNavigation = () => {
  const [user] = useIdToken(auth);
  console.log('MainNavigation - user: ', user?.email, user?.uid);

  const logout = () => {
    signOut(auth).then(() => {
      alert('로그아웃!');
    });
  };

  return (
    <nav className={cx('main-nav')}>
      <div className="main-nav__logo">
        <Link href="/" className="main-nav__logo-a">
          React CRUD
        </Link>
      </div>
      <ul className="main-nav__ul">
        <li className="main-nav__li">
          <Link href="/">
            <HomeOutlined style={iconStyle} />
            <span className="main-nav__span">All Posts</span>
          </Link>
        </li>
        <li className="main-nav__li">
          <Link href="/new-post">
            <PlusCircleOutlined style={iconStyle} />
            <span className="main-nav__span">Add New Post</span>
          </Link>
        </li>

        <li className="main-nav__li">
          <Link href="/search">
            <SearchOutlined style={iconStyle} />
            <span className="main-nav__span">Search</span>
          </Link>
        </li>
      </ul>
      {user ? (
        <div className="main-nav__profile">
          <UserOutlined style={iconStyle} />
          <span className="profile__span">{user?.email?.split('@')[0]}</span>
          <button className="main-nav__li" onClick={logout}>
            <Link href="/login">
              <LoginOutlined style={iconStyle} />

              <span className="main-nav__span">LOG OUT</span>
            </Link>
          </button>
        </div>
      ) : (
        <button className="main-nav__li">
          <Link href="/login">
            <LoginOutlined style={iconStyle} />
            <span className="main-nav__span">LOG IN</span>
          </Link>
        </button>
      )}
    </nav>
  );
};

export default MainNavigation;
