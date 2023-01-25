import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const iconStyle = {
  fontSize: 22,
  paddingLeft: '10px',
};

export interface ButtonProps {
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'submit';
  text?: string | React.ReactNode;
  children?: React.ReactNode;
  extendClass?: string;
  onClick?: any; // FIXME any
  // onClick?: (e: React.MouseEventHandler<HTMLButtonElement>) => void
}

const Button = ({ size = 'md', type = 'button', extendClass, children, text, onClick = () => {} }: ButtonProps) => {
  return (
    <button type={type} className={cx('button', size, extendClass)} onClick={onClick}>
      <span>{text}</span>
      <span style={iconStyle}>{children}</span>
    </button>
  );
};

export default Button;
