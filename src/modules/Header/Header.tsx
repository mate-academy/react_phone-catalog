import { FC } from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../../utils/routes';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { NavBar } from './components/NavBar/NavBar';
import { NavUser } from './components/NavUser/NavUser';
import { MenuButton } from './components/MenuButton/MenuButton';
import { useMenu } from '../../contexts/MenuProvider';
import classNames from 'classnames';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const { logoUrl } = useIconSrc();
  const { isOpen } = useMenu();

  return (
    <header className={classNames(styles.header)}>
      <Link to={HOME} className={styles.logo}>
        <img src={logoUrl} alt="" className={styles.img} />
      </Link>
      <div
        className={classNames(styles.content, { [styles.showMenu]: isOpen })}
      >
        <NavBar />
        <div className={styles.userButtons}>
          <NavUser />
        </div>
      </div>
      <MenuButton />
    </header>
  );
};
