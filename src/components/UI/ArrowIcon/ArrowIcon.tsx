import React, { memo } from 'react';

interface Props {
  width?: number,
  height?: number,
  className?: string,
  rotate?: number
  fill?: string
}

export const ArrowIcon: React.FC<Props> = memo(({
  width,
  height,
  className,
  rotate,
  fill,
}) => (
  <svg
    width={width || '16'}
    height={height || '16'}
    className={className || ''}
    style={(rotate ? { transform: `rotateY(${rotate}deg)` } : {})}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52851C10.211 3.26816 9.7889 3.26816 9.52855 3.52851L5.52855 7.52851C5.26821 7.78886 5.26821 8.21097 5.52855 8.47132L9.52855 12.4713C9.7889 12.7317 10.211 12.7317 10.4714 12.4713C10.7317 12.211 10.7317 11.7889 10.4714 11.5285L6.94277 7.99992L10.4714 4.47132C10.7317 4.21097 10.7317 3.78886 10.4714 3.52851Z" fill={fill || "#313237"} />
  </svg>
));
