import React from 'react';
import '../styles/style.scss';

const notFoundImage = `${import.meta.env.BASE_URL}img/page-not-found.png`;

export const NotFoundPage = () => {
  return (
    <div className="page__notFound">
      <h1>Page not found :&#40;</h1>
      <img src={notFoundImage} alt="cartempty" />
    </div>
  );
};
