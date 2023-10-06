import React, { Fragment } from 'react';
import { ProductFull } from '../../types/ProductFull';
import './DetailsDescription.scss';

type Props = {
  product: ProductFull,
};

export const DetailsDescription: React.FC<Props> = ({ product }) => {
  const { description } = product;

  return (
    <div className="details-description">
      <h2 className="details-description__main-title">
        About
      </h2>

      <div
        className="details-description__content"
        data-cy="productDescription"
      >
        {description.map(par => (
          <Fragment key={par.title}>
            <h3 className="details-description__small-title">
              {par.title}
            </h3>

            {par.text.map(tex => (
              <div
                key={tex.slice(0, 20)}
                className="details-description__paragraf"
              >
                {tex}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
