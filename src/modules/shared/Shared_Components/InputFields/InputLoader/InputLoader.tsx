import React from 'react';

interface Props {
  title: string;
}

export const InputLoader: React.FC<Props> = ({ title }) => {
  return (
    <div className="input-loader">
      <label
        htmlFor={`input-list-${title}`}
        className="input-loader__text"
      >{`Your ${title}`}</label>

      <input
        id={`input-list-${title}`}
        className="input-loader__options"
        disabled
        required
      />
    </div>
  );
};
