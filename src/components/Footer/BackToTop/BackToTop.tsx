import React from 'react';
import backToTopStyles from './BackToTop.module.scss';
import { IconSvg } from '../../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../../constants/iconDataPaths';

export const BackToTop = () => {
  return (
    <div className={backToTopStyles.backToTop}>
      <p className={backToTopStyles.backToTop__text}>Back to top</p>
      <div
        className={backToTopStyles.backToTop__icon}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <IconSvg dataPath={ICON_DATA_PATHS.ARROW.UP} />
      </div>
    </div>
  );
};
