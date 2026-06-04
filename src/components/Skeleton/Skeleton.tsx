import React, {
  Children,
  cloneElement,
  CSSProperties,
  HTMLAttributes,
  isValidElement,
} from 'react';
import styles from './skeleton.module.scss';

export const Skeleton: React.FC<HTMLAttributes<HTMLDivElement> & { isLoading: boolean }> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <div {...props} inert={isLoading} style={(isLoading && { position: 'relative' }) || {}}>
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
