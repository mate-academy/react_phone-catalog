import classNames from 'classnames';
import React, { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

import styles from './Image.module.scss';

export const Image: React.FC<ImgHTMLAttributes<HTMLImageElement>> = props => {
  const timeoutId = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      timeoutId.current = window.setTimeout(() => setIsloading(true), 300);
    } else {
      window.clearTimeout(timeoutId.current);
    }
  }, [isLoaded]);

  return (
    <>
      {isLoading && (
        <div
          {...props}
          className={classNames(props.className, styles['image-skeleton'])}
        />
      )}

      <img
        {...props}
        onLoad={() => {
          setIsLoaded(true);
          setIsloading(false);
        }}
        className={props.className}
        style={!isLoading ? undefined : { display: 'none' }}
      />
    </>
  );
};
