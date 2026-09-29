import React, { useEffect, useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: React.ReactNode;
}

export const ImageWithFallback: React.FC<Props> = ({
  src,
  alt,
  fallbackIcon,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const isInvalid = !src || hasError;

  if (isInvalid && fallbackIcon) {
    return <div className={className}>{fallbackIcon}</div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
