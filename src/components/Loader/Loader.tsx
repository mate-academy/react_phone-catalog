import React from 'react';
import './Loader.scss';

interface LoaderProps {
  size?: number; // Size of the loader (optional, default is 50)
  color?: string; // Color of the loader (optional, default is #3498db)
}

const Loader: React.FC<LoaderProps> = ({ size = 50, color = '#3498db' }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="loader"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent ${color} transparent`,
        }}
      ></div>
    </div>
  );
};

export default Loader;
