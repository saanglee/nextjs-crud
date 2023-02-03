import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { auth } from '../../firebase/firebaseClient';
import { useIdToken } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './MobileHeader.module.scss';

const cx = classNames.bind(styles);
const iconStyle = {
  fontSize: 24,
  paddingRight: 10,
  paddingLeft: 10,
};

const MobileHeader = () => {
  const router = useRouter();
  const [user] = useIdToken(auth);

  const handleLogoutClick = () => {
    signOut(auth).then(() => {
      alert('로그아웃!');
    });
    router.push('/login');
  };

  return (
    <div className={cx('mobile-header')}>
      <div className={cx('logo')}>
        <Link href="/" className="logo__text">
          React CRUD
        </Link>
      </div>
      <div className="mobile-header__auth">
        {user ? (
          <>
            <div className={cx('profile')}>
              <UserOutlined style={iconStyle} />
              <span className="profile__name">{user?.email?.split('@')[0]}</span>
              <span>님</span>
            </div>
            <button className={cx('auth-btn')} onClick={handleLogoutClick}>
              <span className="auth-btn__text">LOG OUT</span>
              <LoginOutlined style={iconStyle} />
            </button>
          </>
        ) : (
          <button className={cx('auth-btn')} onClick={() => router.push('/login')}>
            <span className="auth-btn__text">LOG IN</span>
            <LoginOutlined style={iconStyle} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
