import './ProductDetails.scss';
import classNames from 'classnames';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductDetails } from '../../Types/ProductDeteils';
import { Location } from '../Location/Location';
import { Colors } from '../../Helpers/Colors';
import { preparetedColors } from '../../Helpers/Variables';

type Props = {
  product: ProductDetails,
};

export const ProductDetailsPage: React.FC<Props> = ({ product }) => {
  const {
    name, images, colorsAvailable, color, namespaceId, capacityAvailable, capacity,
  } = product;
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [selectedColor] = useState(color);
  const [selectedCapacity] = useState(capacity);

  console.log(selectedCapacity);

  const onSelectedImage = (image: string) => {
    setCurrentImage(image);
  };

  return (
    <section className="productDetails">
      <Location />

      <h1 className="productDetails__name">{name}</h1>
      <div className="productDetails__pictures">

        <div style={{ display: 'flex', gap: '15px' }}>
          <ul className="productDetails__list">
            {images.map((image) => (
              <li
                key={image}
                className={classNames(
                  'productDetails__list-item',
                  { 'productDetails__list-item--active': image === currentImage },
                )}
                onClick={() => onSelectedImage(image)}
              >
                <img
                  src={`/_new/${image}`}
                  alt="Phones image"
                  className="productDetails__img"
                />
              </li>
            ))}
          </ul>

          <img src={`/_new/${currentImage}`} alt="" className="productDetails__img--active" />
        </div>

        <div className="productDetails__description">
          <div className="productDetails__colors">
            <div className="productDetails__description-title">Avaliable colors</div>
            <ul className="productDetails__list-colors">
              {colorsAvailable.map((color) => (
                <Link
                  to={{
                    pathname: `/phones/${namespaceId}-${selectedCapacity}-${color}`,
                  }}
                  key={color}
                  className={classNames(
                    'productDetails__list--color',
                    { 'productDetails__list--color--active': selectedColor === color },
                  )}
                >
                  <div
                    style={{
                      backgroundColor: preparetedColors[color as keyof Colors],
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                  />
                </Link>
              ))}
            </ul>
          </div>

          <div className="productDetails__capacity">
            <div className="productDetails__description-title">Select capacity</div>

            <ul className="productDetails__list-capacity">
              {capacityAvailable.map((capacity) => (
                <Link
                  to={{
                    pathname: `/phones/${namespaceId}-${capacity}-${color}`,
                  }}
                  key={capacity}
                  className={classNames(
                    'productDetails__capacity-item',
                    { 'productDetails__capacity-item--active': capacity === selectedCapacity },
                  )}
                >
                  {capacity}
                </Link>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
