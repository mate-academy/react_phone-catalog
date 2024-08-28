import {
  accessoriesPath,
  homePath,
  phonesPath,
  tabletsPath,
} from '../../consts/paths';
import { HandleBurgerMenuLinkClick } from '../../types/handlers';
import { BurgerMenuPageLink } from '../BurgerMenuPageLink/BurgerMenuPageLink';
import { useLanguage } from '../Contexts/LanguageContext';
import styles from './BurgerMenuPageLinks.module.scss';

type Props = {
  onLinkClick: HandleBurgerMenuLinkClick;
};

export const BurgerMenuPageLinks: React.FC<Props> = ({ onLinkClick }) => {
  const { home, phones, tablets, accessories } = useLanguage().localeTexts;

  return (
    <menu className={styles.BurgerMenuPageLinks}>
      <BurgerMenuPageLink title={home} to={homePath} onClick={onLinkClick} />

      <BurgerMenuPageLink
        title={phones}
        to={phonesPath}
        onClick={onLinkClick}
      />

      <BurgerMenuPageLink
        title={tablets}
        to={tabletsPath}
        onClick={onLinkClick}
      />

      <BurgerMenuPageLink
        title={accessories}
        to={accessoriesPath}
        onClick={onLinkClick}
      />
    </menu>
  );
};
