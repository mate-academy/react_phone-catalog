import React, { useCallback } from 'react';
import footerNavStyles from './FooterNav.module.scss';
import { ROUTES } from '../../../../constants/routes';
import { Link } from 'react-router-dom';
import { useNotification } from '../../../../context/NotificationContext';

const navLinks = [
  {
    link: 'https://github.com/MrZefirchk/react_phone-catalog',
    title: 'GitHub',
    external: true,
    isShowNotifications: false,
  },
  {
    link: ROUTES.HOME,
    title: 'Contacts',
    isShowNotifications: true,
  },
  {
    link: ROUTES.HOME,
    title: 'Rights',
    isShowNotifications: true,
  },
];

export const FooterNav = () => {
  const { addNotification } = useNotification();

  const handleClick = useCallback(
    (title: string, isShowNotifications: boolean) => {
      if (isShowNotifications) {
        addNotification('info', `${title} page is not implemented yet.`);
      }
    },
    [addNotification],
  );

  return (
    <nav className={footerNavStyles.nav}>
      <ul className={footerNavStyles.nav__menu}>
        {navLinks.map(({ link, title, external, isShowNotifications }) => (
          <li className={footerNavStyles.nav__item} key={title}>
            {external ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={footerNavStyles.nav__link}
              >
                {title}
              </a>
            ) : (
              <Link
                to={link}
                className={footerNavStyles.nav__link}
                onClick={() => handleClick(title, isShowNotifications)}
              >
                {title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
