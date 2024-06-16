import React from 'react';
import './Loader.scss';
import cn from 'classnames';
import { useOutletContext } from 'react-router-dom';

export const Loader: React.FC = () => {
  const darkTheme = useOutletContext<boolean>();

  return (
    <div
      className={cn('loader', {
        'loader--dark-theme': darkTheme,
      })}
    >
      <img
        className="loader__image"
        src="./images/loader/spinner-transparent.gif"
        alt="Loading"
      />
    </div>
  );
};
