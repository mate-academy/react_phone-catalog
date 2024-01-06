/* eslint-disable import/extensions */
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../elements/Buttons/ButtonLink/ButtonLink';
import './Breadcrumbs.scss';
import { DetailType } from '../../helpers/types/DetailType';
import { capitalize } from '../../helpers/utils/capitalize';

type Props = {
  page: string;
  product?: DetailType;
};

export const Breadcrumbs: React.FC<Props> = ({ page, product }) => {
  return (
    <>
      <div className="breadcrumbs">
        <ButtonLink
          shape="home"
          path="/"
          dynamicClasses={['no-border']}
        />

        <div className="breadcrumbs__icon" />

        {product ? (
          <Link
            to={`/${page}`}
            className="breadcrumbs__info"
          >
            {capitalize(page)}
          </Link>
        ) : (
          <p className="breadcrumbs__info">{capitalize(page)}</p>
        )}

        {product && (
          <>
            <div className="breadcrumbs__icon" />
            <p className="breadcrumbs__info">{product.name}</p>
          </>
        )}
      </div>

    </>
  );
};
