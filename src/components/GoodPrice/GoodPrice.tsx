import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { giveCurrency } from '../../helpers/giveCurrency';
import { currencies, convertCurrency } from '../../helpers/convertCurrency';

import './GoodPrice.scss';

type Props = {
  rootClassName: string,
  sale: number | null | undefined,
  price: number | undefined,
  quantity?: number,
};

export const GoodPrice: React.FC<Props> = React.memo(({
  rootClassName,
  sale,
  price,
  quantity = 1,
}) => {
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  const convertedPrice = convertCurrency(
    price as number,
    sale as number,
    currencies[currentLanguage as keyof typeof currencies],
  );

  const convertedPriceWithoutSale = convertCurrency(
    price as number,
    0,
    currencies[currentLanguage as keyof typeof currencies],
  );

  return (
    <p className={`${rootClassName}__price price`}>
      {sale ? (
        <>
          <span className={`${rootClassName}__price--old price--old`}>
            {Math.round(quantity * convertedPriceWithoutSale)}
            {' '}
            {giveCurrency(currentLanguage)}
          </span>

          <span className={`${rootClassName}__price--current price--current`}>
            {Math.round(quantity * convertedPrice)}
            {' '}
            {giveCurrency(currentLanguage)}
          </span>
        </>
      ) : (
        <span className={`${rootClassName}__price--current price--current`}>
          {Math.round(quantity * convertedPrice)}
          {' '}
          {giveCurrency(currentLanguage)}
        </span>
      )}
    </p>
  );
});
