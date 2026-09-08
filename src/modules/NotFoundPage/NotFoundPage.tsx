import React from 'react';
import notFoundSrc from '../../assets/img/page-not-found.png';

const NotFoundPage = () => {
  return (
    <div className="empty">
      <img className="empty_img" src={notFoundSrc} alt="Not Found" />
    </div>
  );
};

export default NotFoundPage;
