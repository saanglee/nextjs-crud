import MainNavigation from './MainNavigation';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import { ReactNode } from 'react';

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('layout')}>
      <div className="layout__main-nav">
        <MainNavigation />
      </div>
      <main className={cx('main')}>{children}</main>
    </div>
  );
};

export default Layout;
