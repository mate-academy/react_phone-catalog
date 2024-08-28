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
    <div className={styles.ToggleBurgerMenuButton}>
      <label htmlFor="toggleBurgerMenuButton" className={styles.Label}>
        {burgerMenuOpened ? accessCloseMenu : accessOpenMenu}
      </label>

      <button
        type="button"
        id="toggleBurgerMenuButton"
        className={styles.Button}
        onClick={onClick}
      >
        {burgerMenuOpened ? (
          <CrossSVG className={styles.Icon} />
        ) : (
          <BurgerSVG className={styles.Icon} />
        )}
      </button>
    </div>
  );
};
