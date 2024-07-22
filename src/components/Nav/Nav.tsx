import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './Nav.module.scss';

type Props = {
  mobile?: boolean;
  footer?: boolean;
};

export const Nav: React.FC<Props> = ({ mobile, footer }) => {
  const { t } = useTranslation();

  return (
    <nav
      className={classNames(styles.block, {
        [styles.block_m_mobileMenu]: mobile,
      })}
    >
      <ul
        className={classNames(styles.list, {
          [styles.list_m_mobileMenu]: mobile,
          [styles.list_m_footer]: footer,
        })}
      >
        {!footer && (
          <>
            <li
              className={classNames(styles.item, {
                [styles.item_m_mobileMenu]: mobile,
              })}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(styles.link, {
                    [styles.link_m_active]: isActive,
                  })
                }
                aria-label={t(TRANSLATIONS.nav.home.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.home.text)}
              </NavLink>
            </li>

            <li
              className={classNames(styles.item, {
                [styles.item_m_mobileMenu]: mobile,
              })}
            >
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  classNames(styles.link, {
                    [styles.link_m_active]: isActive,
                  })
                }
                aria-label={t(TRANSLATIONS.nav.phones.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.phones.text)}
              </NavLink>
            </li>

            <li
              className={classNames(styles.item, {
                [styles.item_m_mobileMenu]: mobile,
              })}
            >
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  classNames(styles.link, {
                    [styles.link_m_active]: isActive,
                  })
                }
                aria-label={t(TRANSLATIONS.nav.tablets.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.tablets.text)}
              </NavLink>
            </li>

            <li
              className={classNames(styles.item, {
                [styles.item_m_mobileMenu]: mobile,
              })}
            >
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  classNames(styles.link, {
                    [styles.link_m_active]: isActive,
                  })
                }
                aria-label={t(TRANSLATIONS.nav.accessories.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.accessories.text)}
              </NavLink>
            </li>
          </>
        )}
        {footer && (
          <>
            <li className={styles.item}>
              <NavLink
                // eslint-disable-next-line max-len
                to="https://github.com/YevhenProtasov/react_phone-catalog/tree/develop"
                className={`${styles.link} ${styles.link_m_footer}`}
                aria-label={t(TRANSLATIONS.footer.nav.github.ariaLabel)}
              >
                {t(TRANSLATIONS.footer.nav.github.text)}
              </NavLink>
            </li>

            <li className={styles.item}>
              <NavLink
                to="/contacts"
                className={`${styles.link} ${styles.link_m_footer}`}
                aria-label={t(TRANSLATIONS.footer.nav.contacts.ariaLabel)}
              >
                {t(TRANSLATIONS.footer.nav.contacts.text)}
              </NavLink>
            </li>

            <li className={styles.item}>
              <NavLink
                to="/rights"
                className={`${styles.link} ${styles.link_m_footer}`}
                aria-label={t(TRANSLATIONS.footer.nav.rights.ariaLabel)}
              >
                {t(TRANSLATIONS.footer.nav.rights.text)}
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
