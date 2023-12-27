import React, { CSSProperties } from 'react';
import './Loader.scss';

interface LoaderProps {
  style: CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({ style }) => {
  return (
    <div className="loader-container">
      <div className="loader" style={style} />
    </div>
  );
};

export default Loader;
