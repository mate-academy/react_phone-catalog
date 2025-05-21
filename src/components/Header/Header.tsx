import styles from './Header.module.scss';

import { NavMenu } from '../NavMenu';

const { header, header__container } = styles;

export const Header = () => {
  return (
    <header className={header}>
      <div className={header__container}>
        <NavMenu />
      </div>
    </header>
  );
};
