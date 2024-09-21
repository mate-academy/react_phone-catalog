import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // полупрозрачный белый фон
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        style={{
          shapeRendering: 'auto',
          display: 'block',
          background: 'transparent',
        }}
      >
        <g>
          <path
            stroke="none"
            fill="#452547"
            d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.5s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 51;360 50 51"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};
