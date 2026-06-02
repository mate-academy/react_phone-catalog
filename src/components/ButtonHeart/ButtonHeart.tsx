import React, { useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { like: boolean };

export const ButtonHeart = ({ onClick, like = false, children, className, ...props }: Props) => {
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);

  return (
    <button
      {...props}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }

        if (!like) {
          setShowFloatingHeart(true)
          setTimeout(() => setShowFloatingHeart(false), 1000);
        }
      }}
      className={classNames(className, styles.button, { [styles.isLike]: like})}
    >
      <div className={styles.wrapper}>
        <Icon className={classNames(styles.heartLike)} type="heartLike" />
        <Icon className={classNames(styles.icon)} type="heart" />
        {showFloatingHeart && <div className={styles.floatingHeart}>❤️</div>}
      </div>
      {children}
    </button>
  );
};
