import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { normalizePath } from '../../utils/normalizePath';
import './breadCrumbs.scss';

const normalizePathname = (pathname: string) => {
  return pathname.slice(0, 1).toUpperCase() + pathname.slice(1);
};

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const partsOfPath = pathname.split('/').filter(part => part);
  const partsWithoutLast = partsOfPath.slice(0, partsOfPath.length - 1);
  const lastPart = partsOfPath.slice(-1).toString();

  return (
    <>
      <div
        className="breadcrumbs"
        data-cy="breadCrumbs"
      >
        <div className="breadcrumbs__img">
          <Link to="/">
            <img
              className="breadcrumbs__img-home"
              src="new/img/icons/home.svg"
              alt="home-icon"
            />
          </Link>
        </div>

        {partsOfPath.length > 1 ? (
          <>
            {partsWithoutLast.map(part => (
              <Fragment key={part}>
                <div className="breadcrumbs__arrow">
                  <img src="new/img/icons/arrow-right.svg" alt="arrow-right" />
                </div>

                <Link to="..">
                  <div className="breadcrumbs__path">
                    <p>{normalizePathname(part)}</p>
                  </div>
                </Link>
              </Fragment>
            ))}
            <div className="breadcrumbs__arrow">
              <img src="new/img/icons/arrow-right.svg" alt="arrow-right" />
            </div>
            <div className="breadcrumbs__path">
              <p>{normalizePath(lastPart)}</p>
            </div>
          </>
        ) : (
          <>
            {partsOfPath.map(part => (
              <Fragment key={part}>
                <div className="breadcrumbs__arrow">
                  <img src="new/img/icons/arrow-right.svg" alt="arrow-right" />
                </div>
                <div className="breadcrumbs__path">
                  <p>{normalizePathname(part)}</p>
                </div>
              </Fragment>
            ))}
          </>
        )}
      </div>
    </>
  );
};
