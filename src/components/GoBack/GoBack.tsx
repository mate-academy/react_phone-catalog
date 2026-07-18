import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import goBackStyles from './GoBack.module.scss';
import { ROUTES } from '../../constants/routes';

export const GoBack = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    const isInternalReferrer = document.referrer.startsWith(
      window.location.origin,
    );

    if (state?.search) {
      navigate({ pathname: '..', search: state.search });
    } else if (window.history.length > 2 && isInternalReferrer) {
      navigate(-1);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <button onClick={handleGoBack} className={goBackStyles.goBack}>
      <IconSvg
        dataPath={ICON_DATA_PATHS.ARROW.LEFT}
        className={goBackStyles.goBack__icon}
      />
      <span className={goBackStyles.goBack__text}>Back</span>
    </button>
  );
};
