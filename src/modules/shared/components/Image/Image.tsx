import classNames from 'classnames';
import React, { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

import styles from './Image.module.scss';

type RefType = HTMLImageElement | null;
type Props = ImgHTMLAttributes<HTMLImageElement>;

export const Image = React.forwardRef<RefType, Props>(
  function Image(props, ref) {
    const timeoutId = useRef(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
      if (!isLoaded) {
        timeoutId.current = window.setTimeout(
          () =>
            setIsLoaded(prevState => {
              if (!prevState) {
                setIsloading(true);
              }

              return prevState;
            }),
          300,
        );
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
          ref={ref}
          {...props}
          onLoad={event => {
            setIsLoaded(true);
            setIsloading(false);

            if (Object.hasOwn(props, 'onLoad')) {
              if (props.onLoad) {
                props.onLoad(event);
              }
            }
          }}
          className={props.className}
          style={!isLoading ? props.style : { display: 'none' }}
        />
      </>
    );
  },
);
