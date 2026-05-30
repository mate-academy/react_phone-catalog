import React from 'react';

interface IconProps {
  color?: string;
  className?: string;
}

export const MinusIcon: React.FC<IconProps> = ({
  color = 'currentColor', // За замовчуванням бере колір тексту батьківського елемента
  className,
}) => {
  return (
    <svg
      className={className}
      style={{ display: 'block' }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z"
        fill={color}
      />
    </svg>
  );
};
