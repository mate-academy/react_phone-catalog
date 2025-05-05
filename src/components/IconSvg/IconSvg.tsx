import React, { memo } from 'react';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  dataPath: string[];
};

export const IconSvg: React.FC<Props> = memo(
  ({ width = 16, height = 16, className, dataPath }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {dataPath.map((d, index) => (
          <path
            key={index}
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d={d}
          />
        ))}
      </svg>
    );
  },
);

IconSvg.displayName = 'IconSvg';
