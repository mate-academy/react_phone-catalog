import React from 'react';

interface MainButtonProps {
  title: string;
}

export const MainButton: React.FC<MainButtonProps> = ({ title }) => {
  return (
    <button type="button" className="main-button">
      {title}
    </button>
  );
};
