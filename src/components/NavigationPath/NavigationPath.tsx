// NavigationPath.tsx
import React, { useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavigationPath.scss';
import { getReadyLinkText } from '../../utils/getReadyLinkText';
import classNames from 'classnames';
import { ProductDetails } from '../../types/types';
import { images } from '../../images';
import { useContext } from 'react';
import { CatalogContext } from '../../context/CatalogContext';

type Props = {
  selectedProduct?: ProductDetails;
};

export const NavigationPath: React.FC<Props> = ({ selectedProduct }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathArray = pathname.split('/').slice(1);
  const { navigationHistory, pushNavigationHistory, popNavigationHistory } =
    useContext(CatalogContext);

  useEffect(() => {
    if (
      navigationHistory.length === 0 ||
      navigationHistory[navigationHistory.length - 1] !== pathname
    ) {
      pushNavigationHistory(pathname);
    }
  }, [pathname, pushNavigationHistory, navigationHistory]);

  const handleBackClick = useCallback(() => {
    if (navigationHistory.length > 1) {
      const previousPath = navigationHistory[navigationHistory.length - 2];

      navigate(previousPath);
      popNavigationHistory();
    } else {
      navigate(`/${pathArray.slice(0, -1).join('/')}`);
    }
  }, [navigate, navigationHistory, pathArray, popNavigationHistory]);

  return (
    <div className="navigationPath">
      {pathArray[0] !== 'cart' && (
        <div className="navigationPath__container">
          <Link to={'/home'} className="navigationPath__home">
            <img
              src={images.homeButton}
              alt="homeButton"
              className="navigationPath__home--image"
            />
          </Link>
          <img
            className="navigationPath__arrow"
            src={images.arrowPath}
            alt="arrow"
          />
          <Link
            className={classNames('navigationPath__pathes', {
              'navigationPath__pathes--active': selectedProduct,
            })}
            to={`/${pathArray[0]}`}
          >
            {getReadyLinkText(pathArray[0])}
          </Link>
          {selectedProduct && (
            <>
              <img
                className="navigationPath__arrow"
                src={images.arrowPath}
                alt="arrow"
              />
              <div
                className="
                navigationPath__pathes
                navigationPath__pathes--overflow
              "
              >
                {selectedProduct.name}
              </div>
            </>
          )}
        </div>
      )}

      {(selectedProduct || pathArray[0] === 'cart') && (
        <div className="navigationPath__back" onClick={handleBackClick}>
          <img src={images.arrowPathBack} alt="arrow" />
          <span className="navigationPath__back--text smallText ">Back</span>
        </div>
      )}
    </div>
  );
};
