import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { MenuItem } from '../MenuItem';
import { Logo } from '../../../../shared/Logo';
import { IconMenuButton } from '../IconMenuButton';
import { useMediaQuery } from '../../../../app/hooks/useMediaQuery';
import { menu } from './menu.data';
import styles from './Menu.module.scss';

export const Menu = () => {
  const isTablet = useMediaQuery('(max-width: 1023px)');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isTablet]);

  const handleToggleMenu = () => {
    if (isTablet) {
      setIsOpen(prevState => !prevState);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isTablet && (
        <IconMenuButton
          iconId={isOpen ? 'close' : 'burger'}
          onClick={handleToggleMenu}
        />
      )}
      <Logo className={styles.logo} />
      <nav className={classNames(styles.navigation, {
        [styles.open]: isOpen,
      })}
      >
        <ul className={styles.menuList}>
          {menu.map(item => (
            <MenuItem key={item.link} item={item} onClick={handleToggleMenu} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
