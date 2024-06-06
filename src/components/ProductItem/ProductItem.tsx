import { Link, useSearchParams } from 'react-router-dom';
import { FC, useEffect } from 'react';

import { IPhone } from '../../types/Phone.interface';
import { formatter } from '../../helper';
import { Buttons } from '../Buttons';

import './ProductItem.scss';
import { BASE_URL_PHOTO } from '../../helper/BASE_URL';

type Props = {
  product: IPhone,
};

export const ProductItem: FC<Props> = ({ product }) => {
  const {
    itemId,
    image,
    price,
    fullPrice,
    name,
    screen,
    capacity,
    ram,
    category,
  } = product;

  const [searchParams] = useSearchParams();
  const formatPrice = formatter.format(price);
  const formatFullPrice = formatter.format(fullPrice);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {

  }, []);

  return (
    <>
      {product
        && (
          <section className="phoneItem">
            <Link
              to={
                `/${category}/${itemId}`
              }
              style={{ textDecorationLine: 'none' }}
              state={{ search: searchParams.toString() }}
            >
              <article className="phoneItem__image">
                <img src={`${BASE_URL_PHOTO}/${image}`} alt="Modile Phone" />
              </article>
              <p className="phoneItem__title">{`${name}`}</p>
            </Link>
            <article className="phoneItem__description">
              <div className="phoneItem__prices">
                <h3 className="phoneItem__price">{formatPrice}</h3>
                <h3
                  className="phoneItem__fullPrice"
                >
                  {formatFullPrice}
                </h3>
              </div>

              <div className="phoneItem__parameters">
                <p className="phoneItem__parametersItem">
                  Screen
                  <span>{screen}</span>
                </p>

                <p className="phoneItem__parametersItem">
                  Capacity
                  <span>{capacity}</span>
                </p>
                <p className="phoneItem__parametersItem">
                  RAM
                  <span>{ram}</span>
                </p>
              </div>

              <div>
                <Buttons
                  widthSelectedButton={40}
                  heightSelectedButton={40}
                  widthAddButton={176}
                  heightAddButton={40}
                  product={product}
                  productID={itemId}
                />
              </div>
            </article>
          </section>
        )}
    </>
  );
};
