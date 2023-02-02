import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './MainNavigation.module.scss';
import { HomeOutlined, PlusCircleOutlined, SearchOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { auth } from '../../firebase/firebaseClient';
import { useIdToken } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

const iconStyle = {
  color: '#000',
  fontSize: 28,
  paddingRight: 20,
};

const MainNavigation = () => {
  const router = useRouter();
  const [user] = useIdToken(auth);

  const handleLogoutClick = () => {
    signOut(auth).then(() => {
      alert('로그아웃!');
    });
    router.push('/login');
  };

  return (
    <nav className={cx('main-nav')}>
      <div className={cx('logo')}>
        <Link href="/" className="logo__text">
          React CRUD
        </Link>
        {/* <Link href="/" className="logo__text--tablet">
          R C
        </Link> */}
      </div>
      <ul className="main-nav__list">
        <li>
          <Link href="/" className="main-nav__item">
            <HomeOutlined style={iconStyle} />
            <span className="main-nav__item--pc">All Posts</span>
          </Link>
        </li>
        <li>
          <Link href="/new-post" className="main-nav__item">
            <PlusCircleOutlined style={iconStyle} />
            <span className="main-nav__item--pc">Add New Post</span>
          </Link>
        </li>

        <li>
          <Link href="/search" className="main-nav__item">
            <SearchOutlined style={iconStyle} />
            <span className="main-nav__item--pc">Search</span>
          </Link>
        </li>
      </ul>
      {user ? (
        <>
          <div className={cx('profile')}>
            <UserOutlined style={iconStyle} />
            <span className="profile__name">{user?.email?.split('@')[0]}</span>
            <span>님</span>
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
