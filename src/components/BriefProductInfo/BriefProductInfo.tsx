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
  imageUrl: string;
};

export const BriefProductInfo: React.FC<Props> = ({
  id,
  prices,
  name,
  imageUrl,
}) => {
  const [shortDetails, setShortDetails] = useState<ShortDetails>();

  const { currentPrice, foolPrice } = prices;

  useEffect(() => {
    getLocalStorageOrApi<DeviceDetails>(id, `/products/${id}.json`).then(
      details => {
        const screen = parseFloat(details.display.screenSize);
        const { flash, ram } = details.storage;

        setShortDetails({ screen, flash, ram });
      },
    );
  }, []);

  return (
    <article className="brief-product-info">
      <div className="brief-product-info__price">
        <h1 className="brief-product-info__price-current">
          {`$${currentPrice}`}
        </h1>
        {currentPrice !== foolPrice && (
          <span className="brief-product-info__price-fool">
            {`$${foolPrice}`}
          </span>
        )}
      </div>

      <div className="brief-product-info__buttons">
        <ProductButtons
          id={id}
          name={name}
          price={currentPrice}
          imageUrl={imageUrl}
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
            {shortDetails.flash || '-'}
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
