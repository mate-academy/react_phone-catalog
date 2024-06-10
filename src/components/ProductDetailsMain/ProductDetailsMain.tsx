import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsMain.scss';
import { Direction } from '../Direction';
import { ProductContext } from '../../helpers/utils/productsContext';
import { DeviceDetails } from '../../helpers/types/DeviceDetails';
import { ButtonBack } from '../ButtonBack';
import { DirectionPath } from '../../helpers/types/DirectionPath';
import { ProductPhoto } from '../ProductPhoto';
import { BriefProductInfo } from '../BriefProductInfo';
import { Prices } from '../../helpers/types/Prices';

type Props = {
  product: DeviceDetails;
};

export const ProductDetailsMain: React.FC<Props> = ({ product }) => {
  const { products } = useContext(ProductContext);
  const { name, images, id } = product;
  const { productId } = useParams();
  const [path, setPath] = useState<DirectionPath[]>();
  const [prices, setPrices] = useState<Prices>();

  useEffect(() => {
    const { type, price, discount } = products?.find(
      good => good.id === productId,
    ) || {
      type: undefined,
      price: 0,
      discount: 0,
    };

    const currentPrice = price - (price / 100) * discount;

    setPrices({
      foolPrice: price,
      currentPrice,
    });

    setPath([
      {
        name: type || '',
        path: `/shop/${type}`,
      },
      {
        name,
        path: `/product/${name}`,
      },
    ]);
  }, [products, productId]);

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
          {prices && (
            <BriefProductInfo
              id={id}
              name={name}
              prices={prices}
              imageUrl={images[0]}
            />
          )}
        </div>
      </div>
    </section>
  );
};
