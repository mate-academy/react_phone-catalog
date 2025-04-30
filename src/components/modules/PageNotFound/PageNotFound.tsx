import './PageNotFound.style.scss';

import notFoundPic from '../../../../public/img/product-not-found.png';

export const PageNotFound = () => {
  return (
    <div className="not-found-page">
      <h2 className="not-found-page__title">Oops... Something went wrong</h2>
      <img
        src={notFoundPic}
        alt="page not found"
        className="not-found-page__img"
      />
    </div>
  );
};
