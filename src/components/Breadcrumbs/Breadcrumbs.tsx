import React, { FC } from 'react';
import './_Breadcrumbs.scss';
import { Link } from 'react-router-dom';
import { PhoneInterface } from '../../constants/types';

interface Props {
  phonesArray: PhoneInterface[];
  directory: string;
}

export const Breadcrumbs: FC<Props> = (props) => {
  const { phonesArray, directory } = props;

  return (
    <>
      <div className="breadcrumbs">
        <div className="breadcrumbs__top-box">
          <Link to="/" className="breadcrumbs__home-link">
            <span className="breadcrumbs__home-logo" />
          </Link>
          <p className="breadcrumbs__location">{directory}</p>
        </div>
        <div className="breadcrumbs__main-info">
          <h3 className="breadcrumbs__title">{directory}</h3>
          <span className="breadcrumbs__number">
            {
              phonesArray.length
                ? `${phonesArray.length} phones`
                : `no phones`
            }
          </span>
        </div>
      </div>
    </>
  );
};
