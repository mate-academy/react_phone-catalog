import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import goBackStyles from './GoBack.module.scss';

export const GoBack = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate({ pathname: '..', search: state?.search })}
      className={goBackStyles.goBack}
    >
      <IconSvg dataPath={ICON_DATA_PATHS.ARROW.LEFT} />
      <span className={goBackStyles.goBack__text}>Back</span>
    </button>
  );
};
