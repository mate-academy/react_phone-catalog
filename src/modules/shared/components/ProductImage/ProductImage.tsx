import { useState } from 'react';
import { getImageUrl } from '../../../../utils/getImageUrl';
import styles from './ProductImage.module.scss';

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

export const ProductImage: React.FC<Props> = ({
  src,
  alt,
  className,
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${styles.fallback} ${className ?? ''}`}>
        <span>{alt.slice(0, 2).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={getImageUrl(src)}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
};
