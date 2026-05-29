import React from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  rotate?: number;
};

export const ButtonSecond = ({
  rotate = 0,
  children,
  className,
  ...props
}: Props) => {
  console.log('ButtonSecond');
  return (
    <button {...props} className={classNames(className, styles.button)}>
      <div className={styles.wrapper}>
        <Icon className={styles.icon} style={{ rotate: `${rotate}deg` }} type="arrowRight" />
      </div>
      {children}
    </button>
  );
};
