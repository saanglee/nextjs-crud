import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

export interface CardProps {
  date?: string | Date;
  size?: 'sm' | 'md';
  children?: React.ReactNode;
}

const Card = ({ children, size = 'md', date }: CardProps) => {
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <div className={cx('card', size)}>
      <div className="card__date">
        <span>{date as string}</span>
        <ul>
          <li /> <li /> <li />
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Card;
