import React from 'react';
import { Loader } from './components/Loader';

export const PageLoader: React.FC = () => {
  const background: React.CSSProperties = {
    position: 'sticky',
    inset: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  };

  return (
    <div style={background}>
      <Loader />
    </div>
  );
};
