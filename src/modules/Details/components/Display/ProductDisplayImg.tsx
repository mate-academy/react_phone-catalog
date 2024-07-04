import React, { ComponentPropsWithoutRef, FC, useEffect, useRef } from 'react';

type Props = ComponentPropsWithoutRef<'img'>;

const FALLBACK_IMAGE_PATH = 'img/product-not-found.png';

export const ProductDisplayImg: FC<Props> = props => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imageRef.current;

    if (!imgElement) {
      return;
    }

    const handleErrpr = () => {
      imgElement.src = FALLBACK_IMAGE_PATH;
    };

    imgElement.addEventListener('error', handleErrpr, { once: true });

    return () => imgElement.removeEventListener('error', handleErrpr);
  }, []);

  return <img {...props} ref={imageRef} alt={''} />;
};
