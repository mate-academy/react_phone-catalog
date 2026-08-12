import { useState } from 'react';
import styles from './FadeImage.module.scss';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export const FadeImage = ({ src, alt, className = '' }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageClassName = [
    styles.image,
    isLoaded && styles.imageLoaded,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      className={imageClassName}
      src={src}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
    />
  );
};
