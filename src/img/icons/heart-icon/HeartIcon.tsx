/* eslint-disable max-len */
import React from 'react';

type Props = {
  selected?: boolean;
};

export const HeartIcon: React.FC<Props> = ({ selected = false }) => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      xmlns="http://www.w3.org/2000/svg"
      fill={selected ? '#EB5757' : 'none'}
      stroke={selected ? '#EB5757' : '#313237'}
      strokeWidth="1.5"
      style={{ transition: 'fill 0.2s, stroke 0.3s' }}
    >
      <path d="M8 13L1.6 6.6C0.266667 5.26667 0.266667 3.06667 1.6 1.73333C2.93333 0.4 5.13333 0.4 6.46667 1.73333L8 3.26667L9.53333 1.73333C10.8667 0.4 13.0667 0.4 14.4 1.73333C15.7333 3.06667 15.7333 5.26667 14.4 6.6L8 13Z" />
    </svg>
  );
};
