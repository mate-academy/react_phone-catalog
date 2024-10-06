import React from 'react';
import './ErrorMessage.module.scss';

type Props = {
  reload: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorMessage: React.FC<Props> = ({ reload }) => (
  <div className="container">
    <div className="errorMessage">
      <h1 className="article__title">Something went wrong</h1>
      <button className="reload__button" onClick={() => reload(true)}>
        Reload
      </button>
    </div>
  </div>
);
