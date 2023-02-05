import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export interface ButtonProps {
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'submit';
  text?: string | React.ReactNode;
  children?: React.ReactNode;
  extendClass?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ size = 'md', type = 'button', extendClass, children, text, onClick = () => {} }: ButtonProps) => {
  return (
    <button type={type} className={cx('button', size, extendClass)} onClick={onClick}>
      <span>{text}</span>
      <span>{children}</span>
    </button>
  );
};

export default Button;
