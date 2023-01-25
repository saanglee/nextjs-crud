import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './MainNavigation.module.scss';
import { HomeOutlined, PlusCircleOutlined, SearchOutlined, LoginOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const iconStyle = {
  fontSize: 28,
};

const MainNavigation = () => {
  return (
    <nav className={cx('main-nav')}>
      <div className='main-nav__logo'>
        <Link href='/' className='main-nav__logo-a'>
          React Meetups
        </Link>
      </div>
      <ul className='main-nav__ul'>
        <li className='main-nav__li'>
          <Link href='/'>
            <HomeOutlined style={iconStyle} />
            <span className='main-nav__span'>All Meetups</span>
          </Link>
        </li>
        <li className='main-nav__li'>
          <Link href='/new-meetup'>
            <PlusCircleOutlined style={iconStyle} />
            <span className='main-nav__span'>Add New Meetup</span>
          </Link>
        </li>

        <li className='main-nav__li'>
          <Link href='/search'>
            <SearchOutlined style={iconStyle} />
            <span className='main-nav__span'>Search</span>
          </Link>
        </li>

        <li className='main-nav__li'>
          <Link href='/login'>
            <LoginOutlined style={iconStyle} />
            <span className='main-nav__span'>Login</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
