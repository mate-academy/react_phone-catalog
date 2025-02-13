import React from 'react';
import classNames from 'classnames';

import { Arrow } from '@components/Arrow';
import { ArrowType } from '@sTypes/ArrowType';

import styles from './BackToTop.module.scss';

type Props = {
  className?: string;
};

export const BackToTop: React.FC<Props> = ({ className }) => {
  return (
    <button
      className={classNames(className, styles['back-to-top'])}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className={styles['back-to-top__label']}>Back to top</div>
      <Arrow
        icon
        className={styles['back-to-top__arrow']}
        type={ArrowType.up}
      />
    </button>
  );
};
