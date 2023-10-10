import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { giveCurrency } from '../../helpers/giveCurrency';

import './GoodPrice.scss';

type Props = {
  rootClassName: string,
  sale: number | null | undefined,
  price: number | undefined,
};

export const GoodPrice: React.FC<Props> = React.memo(({
  rootClassName,
  sale,
  price,
}) => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  return (
    <p className={`${rootClassName}__price price`}>
      {sale ? (
        <>
          <span className={`${rootClassName}__price--old price--old`}>
            {t(price?.toString() as string)}
            {' '}
            {giveCurrency(currentLanguage)}
          </span>

          <span className={`${rootClassName}__price--current price--current`}>
            {
              +(t(price?.toString() as string))
              - +(t(price?.toString() as string)) * sale
            }
            {' '}
            {giveCurrency(currentLanguage)}
          </span>
        </>
      ) : (
        <span className={`${rootClassName}__price--current price--current`}>
          {t(price?.toString() as string)}
          {' '}
          {giveCurrency(currentLanguage)}
        </span>
      )}
    </p>
  );
});
