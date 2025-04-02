import classNames from 'classnames';
import React from 'react';
import iconSvgStyles from './IconSvg.module.scss';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  dataPath: string[];
};

export const IconSvg: React.FC<Props> = ({
  width = 16,
  height = 16,
  className = '',
  dataPath,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(iconSvgStyles.icon, className)}
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
};
