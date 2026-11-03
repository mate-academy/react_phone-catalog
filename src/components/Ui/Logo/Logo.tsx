import classNames from 'classnames/bind';
import styles from './Logo.module.scss';
const cx = classNames.bind(styles);

export const Logo = () => (
  <a href="/" className={cx('logo')}>
    <img src="img/Logo.png" alt="Logo" className={cx('logo__image')} />
  </a>
);
