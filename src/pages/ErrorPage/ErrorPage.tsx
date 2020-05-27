import React from 'react';
import './ErrorPage.scss';

export const ErrorPage = () => {
  return (
    <div className="ErrorPage">
      <h1 className="ErrorPage__title">
        Ooops!!!
      </h1>
      <p className="ErrorPage__paragraph">
      Sorry, but it looks like an error occurred while
       loading the data.
      </p>
      <p className="ErrorPage__paragraph">
       Please check your internet connection or
        try again later.
      </p>

    </div>

  )
}
