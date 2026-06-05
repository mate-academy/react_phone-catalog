import React from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  rotate?: number;
  arrowIcon?: boolean;
};

export const ButtonSecond = ({
  rotate = 0,
  children,
  className,
  arrowIcon = true,
  ...props
}: Props) => {
  return (
    <button {...props} className={classNames(className, styles.button)}>
      {arrowIcon && (
        <div className={styles.wrapper}>
          <Icon style={{ rotate: `${rotate}deg` }} type="arrowRight" />
        </div>
      )}

      {children}
    </button>
  );
};
