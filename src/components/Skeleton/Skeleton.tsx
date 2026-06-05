import React, {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
} from 'react';
import styles from './skeleton.module.scss';

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement> & { isLoading: boolean}> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <div {...props}  style={(isLoading && { position: 'relative' }) || {}}>
      {Children.map(children, (child) => {
        if (!isLoading || !isValidElement<{ style?: CSSProperties }>(child)) {
          return child;
        }

        return cloneElement(child, {
          style: {
            ...child.props.style,
            ...{
              opacity: 0,
              pointerEvents: 'none',
            },
          },
        });
      })}

      {isLoading && <div className={styles.skeleton}></div>}
    </div>
  );
};
