import React, { FC } from 'react';

export const BackPath: FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="path">
      <span className="path__prev" />
      <button
        className="path__back"
        type="button"
        onClick={handleBack}
      >
        Back
      </button>
    </div>
  );
};
