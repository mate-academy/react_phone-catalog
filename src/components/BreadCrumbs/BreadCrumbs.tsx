import './BreadCrumbs.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const productName = pathname.slice(1).split('/')[1];
  const categoryName = pathname.slice(1).split('/')[0];

  function capitalizedName(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  return (
    <div className="breadCrumbs">
      <div className="breadCrumbs__container">
        <div className="breadCrumbs__logo">
          <Link to="/" className="breadCrumbs__logo_link">
            <img
              src="src\images\logo\home.svg"
              alt="home"
              className="breadCrumbs__logo_img"
            />
          </Link>
        </div>

        <span className="breadCrumbs__arrow">
          <img
            src="src\images\logo\arrowRight.svg"
            alt="arrow"
            className="breadCrumbs__arrow_img"
          />
        </span>

        {!productName ? (
          <p className="breadCrumbs__category">
            {capitalizedName(categoryName)}
          </p>
        ) : (
          <>
            <Link
              to={`/${categoryName}`}
              className={classNames('breadCrumbs__category', {
                'breadCrumbs__category-active': productName,
              })}
            >
              {capitalizedName(categoryName)}
            </Link>

            <span className="breadCrumbs__arrow">
              <img
                src="src\images\logo\arrowRight.svg"
                alt="Arrow"
                className="breadCrumbs__arrow_img"
              />
            </span>

            <p className="breadCrumbs__category-product">
              {capitalizedName(productName.slice(1))}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
