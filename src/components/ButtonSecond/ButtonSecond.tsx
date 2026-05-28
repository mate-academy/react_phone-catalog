import React from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { iconFlipX?: boolean };

export const ButtonSecond = ({ iconFlipX = false, children, className, ...props }: Props) => {
  console.log('ButtonSecond');
  return (
    <button {...props} className={classNames(className, styles.button)}>
      <div className={styles.wrapper}>
        <Icon
          className={classNames(styles.icon, { [styles.iconFlip]: iconFlipX })}
          type="arrowRight"
        />
      </div>
      {children}
    </button>
  );
};
