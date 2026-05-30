import React, { Fragment, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import './NavigationPath.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PageName, ProductDetails } from '../../../types';
import { Images } from '../../../images';
import { CatalogContext } from '../../../context/CatalogContext';
import * as Service from '../../../utils/service';

type Props = { selectedProduct?: ProductDetails };

export const NavigationPath: React.FC<Props> = ({ selectedProduct }) => {
  const { setQuery } = useContext(CatalogContext);
  const { pathname, state } = useLocation();
  const urlDirection = pathname.split('/').slice(1);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prevPath = sessionStorage.getItem('previousPath');

    setPreviousPath(prevPath);
    sessionStorage.setItem('previousPath', pathname);
  }, [pathname]);

  const handleBackClick = () =>
    previousPath
      ? navigate(-1)
      : navigate({ pathname: '..', search: state?.search });

  return (
    <section className="navigate-path">
      {urlDirection[0] !== PageName.Cart.toLowerCase() && (
        <article className="navigate-path__urlBlock">
          <Link to="/home" className="navigate-path__urlBlock--link">
            <img src={Images.Button.Home} alt="homeImg" />
          </Link>

          {urlDirection.map((link, index) => (
            <Fragment key={link}>
              <img src={Images.Arrow.Default} alt="arrowImg" />

              <Link
                to={`/${link}`}
                onClick={() => setQuery('')}
                className={classNames('navigate-path__urlBlock--link', {
                  'navigate-path__urlBlock--link-block':
                    index === 1 || urlDirection.length === 1,
                  'navigate-path__urlBlock--link-active':
                    urlDirection.length === 2 && index === 0,
                })}
              >
                {index === 0
                  ? Service.getPathName(link)
                  : selectedProduct?.name}
              </Link>
            </Fragment>
          ))}
        </article>
      )}

      {(selectedProduct || urlDirection[0] === PageName.Cart.toLowerCase()) && (
        <section className="navigate-path__back" onClick={handleBackClick}>
          <img src={Images.Arrow.Back} alt="arrowImgBack" />
          <p className="small-text navigate-path__back--link">Back</p>
        </section>
      )}
    </section>
  );
};
