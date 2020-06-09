import React from 'react';

type Props = {
  quantity: number;
}

export const ProductsQuantity: React.FC<Props> = ({ quantity }) => {
  return (
    <>
      <p className="PhonesPage__length">
        {quantity}
        {' '}
        models
      </p>
    </>
  )
}
