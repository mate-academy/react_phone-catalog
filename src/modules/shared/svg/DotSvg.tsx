/* eslint-disable max-len */

import React, { HTMLAttributes } from 'react';

type SvgProps = {
  color?: string;
};

type Props = HTMLAttributes<SVGElement> & SvgProps;

export const DotSvg: React.FC<Props> = ({ color, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="5" y="10" width="14" height="4" />
    </svg>
  );
};
