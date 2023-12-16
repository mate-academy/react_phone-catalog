import React from 'react';

type Props = {
  color: string;
};

export const ButtonCircle: React.FC<Props> = ({ color }) => {
  return (
    <button
      type="button"
      aria-label="button"
      className={`buttonCircle buttonCircle--${color}`}
    />
  );
};
