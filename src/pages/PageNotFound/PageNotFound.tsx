import imgBanner from '../../images/img/underConstruction.png';

import './style.scss';

export const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <h3 className="pageNotFound__title">
        The page is under construction
      </h3>

      <img
        src={imgBanner}
        alt="underConstruction"
        className="pageNotFound__img"
      />
    </div>
  );
};
