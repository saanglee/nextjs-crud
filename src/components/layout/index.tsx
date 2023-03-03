import MainNavigation from './MainNavigation';
import React, { ReactNode } from 'react';
import MobileHeader from './MobileHeader';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('layout')}>
      <div className="layout__main-nav">
        <MobileHeader />
        <MainNavigation />
      </div>
      <main className={cx('main')}>{children}</main>
    </div>
  );
};

// export default Layout;
export default React.memo(Layout);
