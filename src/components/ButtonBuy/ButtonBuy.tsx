import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean };

type Animation = 'animationSelect' | 'animationDeselect' | null;

export const ButtonBuy = ({ selected, children, className, ...props }: Props) => {
  const selectedRef = useRef(selected);
  const [animation, setAnimation] = useState<Animation>(null);

  useEffect(() => {
    if (selectedRef.current !== selected) {
      setAnimation(selectedRef.current === false ? 'animationSelect' : 'animationDeselect');
    }

    selectedRef.current = selected;
  }, [selected]);

  return (
    <button
      {...props}
      onAnimationEnd={() => {
        setAnimation(null);
      }}
      className={classNames(className, styles.button, animation && styles[animation], {
        [styles.selected]: selected,
      })}
    >
      {children}
    </button>
  );
};
