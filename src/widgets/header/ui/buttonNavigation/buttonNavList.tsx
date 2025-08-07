import { uiLinksList } from '@widgets/header/model/links';
import { BurgerMenuIcon } from '@shared/icons';
import { HeaderButtonNavLink } from '.';
import styles from '../../styles/buttonNavigation.module.scss';
import { NavAriaLabels } from '@shared/types';

export const HeaderButtonNavigation = () => {
  return (
    <nav aria-label="User actions menu" className={styles['buttons-container']}>
      <button
        aria-label={NavAriaLabels.Menu}
        className={styles['burger-button']}
      >
        <BurgerMenuIcon />
      </button>
      {uiLinksList.map(el => (
        <HeaderButtonNavLink
          key={el.to}
          ariaName={el.ariaName}
          to={el.to}
          icon={el.icon}
          className={styles.active}
        />
      ))}
    </nav>
  );
};
