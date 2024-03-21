import React, { memo } from 'react';

import { ActionButtons } from '../ActionButtons';

import './ProductActions.scss';

type Props = {
  fullPrice: number | null;
  discountPrice: number;
  productId: string;
};

export const ProductActions: React.FC<Props> = memo(
  ({ fullPrice, discountPrice, productId }) => {
    return (
      <section className="ProductActions ProductDetails__actions">
        <article className="ProductActions__prices">
          <h1 className="ProductActions__discountPrice">${discountPrice}</h1>
          {fullPrice && (
            <p className="ProductActions__fullPrice">${fullPrice}</p>
          )}
        </article>

        <ActionButtons size="48px" productId={productId} />
      </section>
    );
  },
);
