import { useLanguage } from '../Contexts/LanguageContext';
import { BurgerSVG } from '../SVGs/BurgerSVG';
import { CrossSVG } from '../SVGs/CrossSVG';
import styles from './ToggleBurgerMenuButton.module.scss';

type HandleClick = () => void;

type Props = {
  burgerMenuOpened: boolean;
  onClick: HandleClick;
};

export const ToggleBurgerMenuButton: React.FC<Props> = ({
  burgerMenuOpened,
  onClick,
}) => {
  const { accessOpenMenu, accessCloseMenu } = useLanguage().localeTexts;

  return (
    <button
      type="button"
      className={styles.ToggleBurgerMenuButton}
      onClick={onClick}
    >
      {burgerMenuOpened ? (
        <CrossSVG className={styles.Icon} />
      ) : (
        <BurgerSVG className={styles.Icon} />
      )}

      <span className={styles.Label}>
        {burgerMenuOpened ? accessCloseMenu : accessOpenMenu}
      </span>
    </button>
  );
};
