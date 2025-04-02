import React from 'react';
import { ROUTES } from '../../constants/routes';
import { NavLink } from 'react-router-dom';
import logoStyles from './SiteLogo.module.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const SiteLogo: React.FC<Props> = ({ className = '' }) => {
  return (
    <NavLink
      to={ROUTES.HOME}
      className={classNames(className, logoStyles.logo)}
    >
      <img
        src="img/logo.svg"
        alt="Nice Gadgets"
        className={logoStyles.logo__image}
      />
    </NavLink>
  );
};
