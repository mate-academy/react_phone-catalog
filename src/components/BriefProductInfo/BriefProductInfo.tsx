import React, { useEffect, useState } from 'react';
import './BriefProductInfo.scss';
import { ProductButtons } from '../ProductButtons';
import { getLocalStorageOrApi } from '../../helpers/utils/getLocalStorageOrApi';
import { DeviceDetails } from '../../helpers/types/DeviceDetails';
import { ShortDetails } from '../../helpers/types/ShortDetails';
import { Prices } from '../../helpers/types/Prices';

type Props = {
  id: string;
  name: string;
  prices: Prices;
  image: string;
};

export const BriefProductInfo: React.FC<Props> = ({
  id,
  prices,
  name,
  image,
}) => {
  const [shortDetails, setShortDetails] = useState<ShortDetails>();

  const { currentPrice, fullPrice } = prices;

  useEffect(() => {
    getLocalStorageOrApi<DeviceDetails>(id, `/products/${id}.json`).then(
      details => {
        const { screen, ram, capacity } = details;

        setShortDetails({ screen, capacity, ram });
      },
    );
  }, [id]);

  return (
    <article className="brief-product-info">
      <div className="brief-product-info__price">
        <h1 className="brief-product-info__price-current">
          {`$${currentPrice}`}
        </h1>
        {currentPrice !== fullPrice && (
          <span className="brief-product-info__price-fool">
            {`$${fullPrice}`}
          </span>
        )}
      </div>

      <div className="brief-product-info__buttons">
        <ProductButtons
          id={id}
          name={name}
          price={currentPrice}
          image={image}
          isBig
        />
      </div>

      {shortDetails && (
        <div className="brief-product-info__characteristics">
          <h4 className="brief-product-info__characteristics-name">Screen</h4>
          <span className="brief-product-info__characteristics-value">
            {`${shortDetails.screen}"`}
          </span>
          <h4 className="brief-product-info__characteristics-name">Capacity</h4>
          <span className="brief-product-info__characteristics-value">
            {shortDetails.capacity || '-'}
          </span>
          <h4 className="brief-product-info__characteristics-name">RAM</h4>
          <span className="brief-product-info__characteristics-value">
            {shortDetails.ram || '-'}
          </span>
        </div>
      )}
    </article>
  );
};
