import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsMain.scss';
import { Direction } from '../Direction';
import { ProductContext } from '../../helpers/utils/productsContext';
import { DeviceDetails } from '../../helpers/types/DeviceDetails';
import { ButtonBack } from '../ButtonBack';
import { DirectionPath } from '../../helpers/types/DirectionPath';
import { BriefProductInfo } from '../BriefProductInfo';
import { Prices } from '../../helpers/types/Prices';
import { ColorCapacitySelector } from '../ColorSelector';
import { ProductPhoto } from '../ProductPhoto';

type Props = {
  product: DeviceDetails;
};

export const ProductDetailsMain: React.FC<Props> = ({ product }) => {
  const { products } = useContext(ProductContext);
  const {
    name,
    images,
    id,
    colorsAvailable,
    capacityAvailable,
    color,
    capacity,
    namespaceId,
  } = product;
  const { productId } = useParams();
  const [path, setPath] = useState<DirectionPath[]>();
  const [prices, setPrices] = useState<Prices>();

  useEffect(() => {
    const { category, price, fullPrice } = products?.find(
      good => good.itemId === productId,
    ) || {
      category: undefined,
      price: 0,
      fullPrice: 0,
    };

    setPrices({
      fullPrice,
      currentPrice: price,
    });

    setPath([
      {
        name: category || '',
        path: `/shop/${category}`,
      },
      {
        name,
        path: `/product/${name}`,
      },
    ]);
  }, [products, productId, name]);

  return (
    <section className="main-product-details">
      <div className="main-product-details__direction">
        {path && <Direction path={path} />}
      </div>

      <div className="main-product-details__back">
        <ButtonBack />
      </div>

      <div className="main-product-details__main">
        <h1 className="main-product-details__title">{name}</h1>

        <div className="main-product-details__photos">
          <ProductPhoto images={images} productName={name} />
        </div>

        <div className="main-product-details__brief-info">
          <ColorCapacitySelector
            colorsAvailable={colorsAvailable}
            capacityAvailable={capacityAvailable}
            currentColor={color}
            currentCapacity={capacity}
            namespaceId={namespaceId}
          />

          {prices && (
            <BriefProductInfo
              id={id}
              name={name}
              prices={prices}
              image={images[0]}
            />
          )}
        </div>
      </div>
    </section>
  );
};
