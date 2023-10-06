import React from 'react';
import './QuantityItemsParagraph.scss';

type Props = {
  allProducts: number,
  filteredProducts?: number,
  queryLength?: number,
  productName?: string,
};

export const QuantityItemsParagraf: React.FC<Props> = ({
  allProducts,
  filteredProducts = 0,
  queryLength = 0,
  productName = 'item',
}) => {
  const getCorrectQuantity = (items: number) => {
    return items === 1
      ? `1 ${productName}`
      : `${items} ${productName}s`;
  };

  return (
    <>
      {!allProducts && (
        <p className="quantity-items-paragraph">
          You do not have selected products...
        </p>
      )}

      {!!allProducts && !queryLength && (
        <p className="quantity-items-paragraph">
          {getCorrectQuantity(allProducts)}
        </p>
      )}

      {!!allProducts && !!queryLength && !filteredProducts && (
        <p className="quantity-items-paragraph">
          Search have not givien results
        </p>
      )}

      {!!allProducts && !!queryLength && !!filteredProducts && (
        <p className="quantity-items-paragraph">
          {`${getCorrectQuantity(filteredProducts)} of ${getCorrectQuantity(allProducts)}`}
        </p>
      )}
    </>
  );
};
