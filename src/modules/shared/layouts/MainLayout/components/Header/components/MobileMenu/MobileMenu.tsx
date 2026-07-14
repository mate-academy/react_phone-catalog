import { Link, NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { NAV_LINKS } from './constants';
import classNames from 'classnames';
import { HeaderActions } from '../HeaderActions';
import { getImageUrl } from '../../../../../../utils/getImageUrl';

const handleActiveLink = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles['mobile-menu__link'], {
    [styles['mobile-menu__link--active']]: isActive,
  });
};

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export const MobileMenu: React.FC<Props> = ({ onClose, isOpen }) => {
  return (
    <div
      className={classNames(styles['mobile-menu'], {
        [styles['mobile-menu--open']]: isOpen,
      })}
    >
      <div className={styles['mobile-menu__header']}>
        <Link to={'/'} className={styles['mobile-menu__logo']}>
          <img src={getImageUrl('/icons/Logo.svg')} alt="Nice Device Logo" />
        </Link>

        <button
          className={styles['mobile-menu__close-button']}
          onClick={onClose}
        >
          <img src={getImageUrl('/icons/cross.svg')} alt="Close Menu" />
        </button>
      </div>

      <nav className={styles['mobile-menu__nav']}>
        <ul className={styles['mobile-menu__list']}>
          {NAV_LINKS.map(link => (
            <li className={styles['mobile-menu__item']} key={link.label}>
              <NavLink
                to={link.path}
                className={handleActiveLink}
                onClick={onClose}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <HeaderActions
        className={styles['mobile-menu__actions']}
        onClose={onClose}
      />
    </div>
  );
};
