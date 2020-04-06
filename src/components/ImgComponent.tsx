import React, { FC } from 'react';

interface Props {
  src: string;
}

export const ImgComponent: FC<Props> = ({ src }) => (
  <img src={src} alt="phones" className="img" />
);
