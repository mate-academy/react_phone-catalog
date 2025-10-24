import { useGlobalData, useNavigationTracker } from '@features/index';
import styles from './buttonNavigation.module.scss';
import { getButtonLinks } from '../../model';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ItemsCounter } from '@shared/icons';
type Props = {
  closeMenu: () => void;
};
export const ButtonNavigation = ({ closeMenu }: Props) => {
  const { cartAmount, favAmount } = useGlobalData();
  const { trackLinkHandler } = useNavigationTracker();
  const buttonLinks = getButtonLinks(cartAmount, favAmount);

  return (
    <nav aria-label="User actions menu" className={styles.container}>
      {buttonLinks.map(link => {
        const isActive = location.pathname === link.to;
        const IconComponent: React.ComponentType = link.icon;

        return (
          <Link
            key={link.to}
            to={link.to}
            aria-label={link.ariaName}
            className={classNames([styles['nav-link']], {
              [styles['nav-link--is-active']]: isActive,
            })}
            {...(isActive && { 'aria-current': 'page' })}
            onClick={e => {
              trackLinkHandler(e, link.to);
              closeMenu();
            }}
          >
            <IconComponent />
            {link.amount > 0 && <ItemsCounter amount={link.amount} />}
          </Link>
        );
      })}
    </nav>
  );
};
