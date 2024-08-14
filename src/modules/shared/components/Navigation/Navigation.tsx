import {
  accessoriesPath,
  homePath,
  phonesPath,
  tabletsPath,
} from '../../consts/paths';
import { useLanguage } from '../Contexts/LanguageContext';
import { NavigationItem } from '../NavigationItem';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  const { home, phones, tablets, accessories } = useLanguage().localeTexts;

  return (
    <nav className={styles.Navigation}>
      <menu className={styles.List}>
        <NavigationItem title={home} to={homePath} />
        <NavigationItem title={phones} to={phonesPath} />
        <NavigationItem title={tablets} to={tabletsPath} />
        <NavigationItem title={accessories} to={accessoriesPath} />
      </menu>
    </nav>
  );
};
