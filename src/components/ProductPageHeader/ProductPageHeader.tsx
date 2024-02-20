import React from 'react';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ButtonBack } from '../Button/Button';

type Props = {
  productName: string,
};

export const ProductPageHeader: React.FC<Props> = ({
  productName,
}) => {
  return (
    <>
      <div className="product__breadcrumbs">
        <Breadcrumbs />
      </div>

      <ButtonBack />

      <h1 className="product__title">
        {productName}
      </h1>
    </>
  );
};
