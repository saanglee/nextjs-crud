import Link from 'next/link';
import { useRouter } from 'next/router';

import { auth } from '../../firebase/firebaseClient';
import { useIdToken } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import { HomeOutlined, PlusCircleOutlined, SearchOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './MainNavigation.module.scss';

const cx = classNames.bind(styles);

const iconStyle = {
  color: '#000',
  fontSize: 28,
};

const MainNavigation = () => {
  const router = useRouter();
  const [user] = useIdToken(auth);

  const handleLogoutClick = () => {
    signOut(auth).then(() => {
      alert('로그아웃합니다.');
    });
    router.push('/login');
  };

  return (
    <nav className={cx('main-nav')}>
      <div className={cx('logo')}>
        <Link href="/" className="logo__text">
          React CRUD
        </Link>
      </div>
      <ul className="main-nav__list">
        <li>
          <Link href="/" className="main-nav__item">
            <HomeOutlined className="main-nav__icon" style={iconStyle} />
            <span className="main-nav__item--pc">All Posts</span>
          </Link>
        </li>
        <li>
          <Link href="/new-post" className="main-nav__item">
            <PlusCircleOutlined className="main-nav__icon" style={iconStyle} />
            <span className="main-nav__item--pc">Add New Post</span>
          </Link>
        </li>

        <li>
          <Link href="/search" className="main-nav__item">
            <SearchOutlined className="main-nav__icon" style={iconStyle} />
            <span className="main-nav__item--pc">Search</span>
          </Link>
        </li>
      </ul>
      {user ? (
        <>
          <div className={cx('profile')}>
            <UserOutlined className="main-nav__icon" style={{ fontSize: 22 }} />
            <span className="profile__name">{user?.email?.split('@')[0]}</span>
            <span className="profile__name">님</span>
          </div>
          <button className={cx('auth-btn')} onClick={handleLogoutClick}>
            <span className="auth-btn__text">LOG OUT</span>
            <LoginOutlined style={{ fontSize: 24 }} />
          </button>
        </>
      ) : (
        <button className={cx('auth-btn')} onClick={() => router.push('/login')}>
          <span className="auth-btn__text">LOG IN</span>
          <LoginOutlined style={{ fontSize: 24 }} />
        </button>
      )}
    </nav>
  );
};

export default MainNavigation;
