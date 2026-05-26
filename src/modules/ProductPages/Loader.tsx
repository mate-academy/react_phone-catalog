import React from 'react';
import './Loader.scss';

interface LoaderProps {
  loading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
    </div>
  );
};
