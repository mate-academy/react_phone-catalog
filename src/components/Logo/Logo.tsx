import type React from 'react';
import type { LogoSize } from '../../types/LogoSize';
import { asset } from '../../helper';

type Props = {
  size: LogoSize;
};

export const Logo: React.FC<Props> = ({ size }) => {
  const sizesMap = {
    small: '64',
    medium: '80',
    large: '90',
  };

  const widthValue = sizesMap[size] || sizesMap.medium;

  return (
    <img
      src={asset('/img/logo.svg')}
      alt="Nice Gadgets"
      style={{ width: `${widthValue}px` }}
    />
  );
};
