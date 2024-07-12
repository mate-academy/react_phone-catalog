import React from 'react';
import page404 from '../../images/page-not-found.png';
import './PageNotFound.scss';

export const PageNotFound = () => {
  return (
    <main className="pageNotFound">
      <img src={page404} alt="pageNotFound" className="pageNotFound__pic" />
    </main>
  );
};
