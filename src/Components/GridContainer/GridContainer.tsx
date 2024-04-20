import React, { ReactNode } from 'react';
import './GridContainer.scss';

interface GridContainerProps {
  children: ReactNode;
}

export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return (
    <div className="grid-container">
      <div className="grid-item">{children}</div>
    </div>
  );
};
