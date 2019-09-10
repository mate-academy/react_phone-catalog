/* eslint-disable */
import React from 'react';

export const SpectrumGradient = () => (
  <svg xmlns="http://www.w3.org/2000/svg">
    <rect fill="#ff1f48" width="100%" height="100%" />
    <defs>
      <radialGradient
        id="a"
        cx="0"
        cy="800"
        r="800"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ff7922" />
        <stop offset="1" stopColor="#ff7922" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="b"
        cx="1200"
        cy="800"
        r="800"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ff10e3" />
        <stop offset="1" stopColor="#ff10e3" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="c"
        cx="600"
        cy="0"
        r="600"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ff135c" />
        <stop offset="1" stopColor="#ff135c" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="d"
        cx="600"
        cy="800"
        r="600"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ff1f48" />
        <stop offset="1" stopColor="#ff1f48" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="e"
        cx="0"
        cy="0"
        r="800"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fff826" />
        <stop offset="1" stopColor="#fff826" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="f"
        cx="1200"
        cy="0"
        r="800"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#6a00ff" />
        <stop offset="1" stopColor="#6a00ff" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect fill="url(#a)" width="100%" height="100%" />
    <rect fill="url(#b)" width="100%" height="100%" />
    <rect fill="url(#c)" width="100%" height="100%" />
    <rect fill="url(#d)" width="100%" height="100%" />
    <rect fill="url(#e)" width="100%" height="100%" />
    <rect fill="url(#f)" width="100%" height="100%" />
  </svg>
);
