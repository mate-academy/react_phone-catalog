import { NavigationItem } from '../NavigationItem';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.Navigation}>
      <ul className={styles.List}>
        <NavigationItem title="HOME" />
        <NavigationItem title="PHONES" />
        <NavigationItem title="TABLETS" />
        <NavigationItem title="ACCESSORIES" />
      </ul>
    </nav>
  );
};
