/* eslint-disable @typescript-eslint/indent */
import React from 'react';

export const ArrowBackToTopIcon: React.FC<
  React.SVGProps<SVGSVGElement>
> = props => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);
