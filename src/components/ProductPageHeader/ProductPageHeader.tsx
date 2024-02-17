import React from 'react';
import { useNavigate } from 'react-router';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Button } from '../Button/Button';

type Props = {
  productName: string,
};

export const ProductPageHeader: React.FC<Props> = ({
  productName,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="product__breadcrumbs">
        <Breadcrumbs />
      </div>

      <Button
        className="button button__back product__back-btn"
        onClick={() => navigate('..')}
      >
        <img src="img/icons/arrow-left.svg" alt="Arrow Left" />

        <p>
          Back
        </p>
      </Button>

      <h1 className="product__title">
        {productName}
      </h1>
    </>
  );
};
