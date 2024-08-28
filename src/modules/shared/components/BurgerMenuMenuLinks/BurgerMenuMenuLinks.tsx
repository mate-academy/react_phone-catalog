import { cartPath, favouritesPath, settingsPath } from '../../consts/paths';
import { MenuLinkSVGOption } from '../../types/enums';
import { HandleBurgerMenuLinkClick } from '../../types/handlers';
import { BurgerMenuMenuLink } from '../BurgerMenuMenuLink/BurgerMenuMenuLink';
import { useLanguage } from '../Contexts/LanguageContext';
import styles from './BurgerMenuMenuLinks.module.scss';

type Props = {
  onLinkClick: HandleBurgerMenuLinkClick;
};

export const BurgerMenuMenuLinks: React.FC<Props> = ({ onLinkClick }) => {
  const { accessSettings, accessFavourites, accessCart } =
    useLanguage().localeTexts;

  return (
    <menu className={styles.BurgerMenuMenuLinks}>
      <BurgerMenuMenuLink
        to={settingsPath}
        alt={accessSettings}
        svgOption={MenuLinkSVGOption.Settings}
        onClick={onLinkClick}
        className={styles.BurgerMenuMenuLink}
      />

      <BurgerMenuMenuLink
        to={favouritesPath}
        alt={accessFavourites}
        svgOption={MenuLinkSVGOption.Heart}
        onClick={onLinkClick}
        className={styles.BurgerMenuMenuLink}
      />

      <BurgerMenuMenuLink
        to={cartPath}
        alt={accessCart}
        svgOption={MenuLinkSVGOption.Bag}
        onClick={onLinkClick}
        className={styles.BurgerMenuMenuLink}
      />
    </menu>
  );
};
