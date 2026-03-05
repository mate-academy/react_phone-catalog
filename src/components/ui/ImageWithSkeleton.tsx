import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  skeletonClassName?: string;
};

export const ImageWithSkeleton: React.FC<Props> = ({
  skeletonClassName,
  className,
  onLoad,
  ...imgProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  return (
    <>
      {!isLoaded && (
        <Skeleton
          width="100%"
          height="100%"
          borderRadius={8}
          containerClassName={skeletonClassName || 'absolute inset-0'}
          baseColor="#e8e8e8"
          highlightColor="#f5f5f5"
        />
      )}
      <img
        {...imgProps}
        className={className}
        onLoad={handleLoad}
        style={{
          ...imgProps.style,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
};
