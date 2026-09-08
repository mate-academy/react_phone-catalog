import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Menu } from '../../components/Menu';
import styles from './MenuPage.module.scss';

export const MenuPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(styles.menu, { [styles['menu--visible']]: isVisible })}>
      <Menu />
    </div>
  );
};
