import React from 'react';

import classNames from 'classnames';

import { DividerMargin } from '../../../constants/dividerMargin';

import styles from './Divider.module.scss';

type Props = {
  margin?: DividerMargin;
  className?: string;
};

const marginClassMap: Record<DividerMargin, string> = {
  none: styles.marginNone,
  sm: styles.marginSm,
  md: styles.marginMd,
  lg: styles.marginLg,
};

export const Divider: React.FC<Props> = ({
  margin = DividerMargin.NONE,
  className,
}) => {
  return (
    <hr
      aria-hidden="true"
      className={classNames(styles.divider, marginClassMap[margin], className)}
    />
  );
};
