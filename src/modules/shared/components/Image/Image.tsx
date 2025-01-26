import classNames from 'classnames';
import React, { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

import styles from './Image.module.scss';

export const Image: React.FC<ImgHTMLAttributes<HTMLImageElement>> = props => {
  const timeoutId = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      timeoutId.current = window.setTimeout(() => setIsloading(true), 100);
    } else {
      window.clearTimeout(timeoutId.current);
    }
  }, [isLoaded]);

  return (
    <>
      {isLoading && (
        <div
          {...props}
          className={classNames(props.className, {
            [styles['image-skeleton']]: true,
          })}
        />
      )}

      <img
        {...props}
        onLoad={() => {
          setIsLoaded(true);
          setIsloading(false);
        }}
        className={props.className}
        style={isLoaded ? undefined : { display: 'none' }}
      />
    </>
  );
};
