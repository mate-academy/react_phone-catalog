import classNames from 'classnames/bind';

import { Logo } from '../Ui/Logo';
import { IconLinkButton } from '../Ui/IconLinkButton';
import { BurgerButton } from '../Ui/BurgerButton';
import { Navigation } from '../Navigation';
import { useBurgerMenu } from '../../hooks/useBurgerMenu';
import { ACTION_ICONS } from '../../constants/actionIcons';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

export const Header = () => {
  const { isOpen } = useBurgerMenu();

  return (
    <header className={cx('header')}>
      <div className={cx('header__nav-wrapper')}>
        <div className={cx('header__logo')}>
          <Logo />
        </div>
        <Navigation isOpen={isOpen} />
      </div>

      <div className={cx('header__icons-wrapper')}>
        <BurgerButton isOpen={isOpen} className={cx('header__burger')} />

        {ACTION_ICONS.map(({ name, src, label, to }) => (
          <IconLinkButton
            key={name}
            to={to}
            src={src}
            label={label}
            className={cx('header__icon', `header__icon--${name}`)}
          />
        ))}
      </div>
    </header>
  );
};
