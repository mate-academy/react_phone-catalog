import React from 'react';
import './PreviousPage.scss';
import '../../../fonts.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PreviousPage = () => {
  const { t } = useTranslation();

  return (
    <div className="back">
      <NavLink aria-current="page" to="/">
        <div className="back__img"></div>
      </NavLink>
      <span className="back__text text--small">{t('back')}</span>
    </div>
  );
};
