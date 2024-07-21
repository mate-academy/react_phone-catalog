import React from 'react';

type Props = {
  active: boolean;
  onClick: () => void;
};

const Elipse: React.FC<Props> = ({ active, onClick }) => {
  const color = active ? '#0F0F11' : '#E2E6E9';

  return (
    <svg
      className="pictures__svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <rect x="5" y="10" width="14" height="4" fill={color} />
    </svg>
  );
};

export default Elipse;
