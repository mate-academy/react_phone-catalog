import React from 'react';
import backToTopStyles from './BackToTop.module.scss';
import { ICON_DATA_PATHS } from '../../../../constants/iconDataPaths';
import { IconButton } from '../../../IconButton/IconButton';

export const BackToTop = () => {
  return (
    <div className={backToTopStyles.backToTop}>
      <p className={backToTopStyles.backToTop__text}>Back to top</p>
      <IconButton
        iconDataPath={ICON_DATA_PATHS.ARROW.UP}
        className={backToTopStyles.backToTop__button}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
};
