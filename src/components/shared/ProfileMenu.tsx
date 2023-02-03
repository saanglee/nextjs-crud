import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileMenu.module.scss';

const cx = classNames.bind(styles);

const ProfileMenu = () => {
  return (
    <div className={cx('profile-menu')}>
      <div className="profile-menu__item user-name"> OOO 님 </div>
      <div className="profile-menu__item logout-btn"> 로그아웃 </div>
    </div>
  );
};

export default ProfileMenu;
