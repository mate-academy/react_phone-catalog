import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GoodPrice } from '../GoodPrice/GoodPrice';

type Props = {
  rootClassName: string,
  seoUrl: string,
  currentLanguage: string,
  imageLink: string,
  name: string,
  translationSlug: string,
  sale: number | null,
  price: number,
};

export const GoodCard: React.FC<Props> = React.memo(({
  rootClassName,
  seoUrl,
  currentLanguage,
  imageLink,
  name,
  translationSlug,
  sale,
  price,
}) => {
  const { t } = useTranslation();

  return (
    <Link
      className={`${rootClassName}__card`}
      to={{
        pathname: seoUrl,
        search: `?lang=${currentLanguage}`,
      }}
    >
      <img
        className={`${rootClassName}__card-image`}
        src={imageLink}
        alt={name}
      />

      <div className={`${rootClassName}__card-info`}>
        <h2 className={`${rootClassName}__card-info-header`}>
          {t(translationSlug)}
        </h2>

        <GoodPrice
          rootClassName={rootClassName}
          sale={sale}
          price={price}
        />
      </div>
    </Link>
  );
});
