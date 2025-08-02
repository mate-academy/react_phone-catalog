import React from 'react';
import { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

export const Image: React.FC<Props> = ({ src, ...props }) => {
  const [isValid, setIsValid] = useState(true);

  if (!isValid) return null;

  return <img src={src} {...props} onError={() => setIsValid(false)} />;
};
