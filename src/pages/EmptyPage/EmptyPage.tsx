import React from 'react';
import './EmptyPage.scss';
import '../../styles/container.scss';

export const EmptyPage: React.FC = () => {
  return (
    <div className="empty container">
      <img className="empty__img" src="./img/icons/empty.svg" alt="empty" />
      <h1 className="empty__title">Oops! It&#39;s still empty here</h1>
    </div>
  );
};
