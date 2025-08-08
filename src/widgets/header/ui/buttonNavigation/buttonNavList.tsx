import { uiLinksList } from '@widgets/header/model/';
import { HeaderButtonNavLink } from '.';
import styles from '../../styles/buttonNavigation.module.scss';

export const HeaderButtonNavigation = () => {
  return (
    <nav aria-label="User actions menu" className={styles['buttons-container']}>
      {uiLinksList.map(el => (
        <HeaderButtonNavLink
          key={el.to}
          ariaName={el.ariaName}
          to={el.to}
          icon={el.icon}
        />
      ))}
    </nav>
  );
};
