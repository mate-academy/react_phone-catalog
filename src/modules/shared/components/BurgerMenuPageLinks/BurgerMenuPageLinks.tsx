import {
  accessoriesPath,
  homePath,
  phonesPath,
  tabletsPath,
} from '../../consts/paths';
import { BurgerMenuPageLink } from '../BurgerMenuPageLink/BurgerMenuPageLink';
import { useLanguage } from '../Contexts/LanguageContext';
import styles from './BurgerMenuPageLinks.module.scss';

export const BurgerMenuPageLinks: React.FC = () => {
  const { home, phones, tablets, accessories } = useLanguage().localeTexts;

  return (
    <menu className={styles.BurgerMenuPageLinks}>
      <BurgerMenuPageLink title={home} to={homePath} />
      <BurgerMenuPageLink title={phones} to={phonesPath} />
      <BurgerMenuPageLink title={tablets} to={tabletsPath} />
      <BurgerMenuPageLink title={accessories} to={accessoriesPath} />
    </menu>
  );
};
