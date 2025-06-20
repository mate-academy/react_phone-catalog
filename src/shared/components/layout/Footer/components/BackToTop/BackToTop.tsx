/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { Icon } from '../../../../../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../../../../../shared/components/ui/Icon/IconNames';

import styles from './BackToTop.module.scss';

export const BackToTop: React.FC = () => {
  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={styles.backToTopBlock} onClick={goToTop}>
      <span className={styles.text}>Back to top</span>
      <button className={styles.button}>
        <Icon className={styles.arrowIcon} name={IconNames.Arrow} />
      </button>
    </div>
  );
};
