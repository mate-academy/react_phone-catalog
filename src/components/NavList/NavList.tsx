import React from 'react';
import { NavLink } from 'react-router-dom';
import useLanguageStore from '../../stores/useLanguageStore';

type Props = {
  linkClass: ({ isActive }: { isActive: boolean }) => string;
  onLinkClick?: () => void;
};

const NAV_ITEMS = [
  { path: '/', key: 'nav_home' },
  { path: '/phones', key: 'nav_phones' },
  { path: '/tablets', key: 'nav_tablets' },
  { path: '/accessories', key: 'nav_accessories' },
];

export const NavList: React.FC<Props> = ({ linkClass, onLinkClick }) => {
  const { t } = useLanguageStore();

  return (
    <>
      {NAV_ITEMS.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={linkClass}
          onClick={onLinkClick}
        >
          {t(item.key)}
        </NavLink>
      ))}
    </>
  );
};
