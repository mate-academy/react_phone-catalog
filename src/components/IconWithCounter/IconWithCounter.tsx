import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  type: 'heart' | 'cart';
  count: number;
};

export const IconWithCounter = ({ count, type, className, ...props }: Props) => {
  const prevCount = useRef(count);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (prevCount.current !== count) {
      setIsAnimated(true);
    }

    prevCount.current = count;
  }, [count]);

  return (
    <div>
      <div className={styles.content}>
        {type === 'cart' && <Icon {...props} type="cart" className={classNames(className)} />}
        {type === 'heart' && <Icon {...props} type="heart" className={classNames(className)} />}
        {count !== 0 && (
          <div
            className={classNames(styles.counter, {
              [styles.counterAnimate]: isAnimated,
            })}
            onAnimationEnd={() => setIsAnimated(false)}
          >{count}</div>
        )}
      </div>
    </div>
  );
};
