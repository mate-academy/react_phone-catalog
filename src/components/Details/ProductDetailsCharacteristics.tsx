/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Details } from '../../utils/types/Details';
import { ProductActions } from '../ProductActions';
import { Product } from '../../utils/types/Product';
import { Colors } from '../../utils/types/Colors';

const characteristicsItems = ['Screen', 'Resolution', 'Processor', 'Ram'];

type Props = {
  details : Details;
  currentProduct: Product
};

export const ProductDetailsCharacteristics:React.FC<Props> = ({
  details,
  currentProduct,
}) => {
  const {
    colorsAvailable, capacityAvailable, name, priceDiscount, priceRegular,
  } = details;

  return (
    <section className="details__characteristics">

      <div className="details__characteristics--select">
        <p className="details__characteristics--select--title">
          Aviliable colors
        </p>
        <ul className="details__characteristics--select--list">
          {colorsAvailable.map(item => (
            <div
              className={classnames(
                'details__characteristics--color-border', {
                  'active-border': details.id?.includes(item),
                },
              )}
            >
              <li>
                <Link
                  to={`/phones/${currentProduct.itemId?.slice(0, details.id.lastIndexOf('-') + 1) + item}`}
                  className="details__characteristics--color-item"
                  style={{
                    background: Colors[item as keyof typeof Colors],
                  }}
                />

              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className="details__characteristics--select">
        <p className="details__characteristics--select--title">
          Select capacity
        </p>
        <ul className="details__characteristics--select--list">
          {capacityAvailable.map(item => (
            <li>
              <Link
                to={`/phones/${currentProduct.itemId?.split('-').map(part => (part.includes('gb') ? item.toLocaleLowerCase() : part)).join('-')}`}
                className={classnames(
                  'details__characteristics--capacity-item', {
                    'is-active': name.includes(item),
                  },
                )}
              >
                {item}

              </Link>

            </li>

          ))}
        </ul>
      </div>

      <div className="details__characteristics--price">
        <div className="details__characteristics--price--without-discont">
          {`$${priceDiscount}`}
        </div>
        <div className="details__characteristics--price--with-discont">
          {`$${priceRegular}`}
        </div>

      </div>
      <div className="card__characteristics">
        {currentProduct
       && (
         <ProductActions product={currentProduct} />
       )}

        {details && characteristicsItems.map(item => (
          <div className="card__characteristics--item">
            <div className="card__characteristics--title">{item}</div>
            <div className="card__characteristics--characteristic">
              {details[item.toLocaleLowerCase()]}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
