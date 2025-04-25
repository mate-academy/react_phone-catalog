import React from 'react';
import classNames from 'classnames';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';

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
      <IconButton
        icon
        className={styles['back-to-top__arrow']}
        type={IconButtonType.arrowUp}
      />
    </button>
  );
};
