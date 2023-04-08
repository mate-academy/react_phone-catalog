import './ProductDetails.scss';
import classNames from 'classnames';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductDetails } from '../../Types/ProductDeteils';
import { Location } from '../Location/Location';
import { Colors } from '../../Helpers/Colors';
import { preparetedColors } from '../../Helpers/Variables';
import { ToOrderButton } from '../Buttons/ToOrderButton/toOrderButton';
import { ToLikedButton } from '../Buttons/ToLIkedButton/ToLikedButton';

type Props = {
  product: ProductDetails,
};

export const ProductDetailsPage: React.FC<Props> = ({ product }) => {
  /*
    eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-noninteractive-element-interactions
  */
  const {
    name,
    images,
    colorsAvailable,
    color,
    namespaceId,
    capacityAvailable,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    ram,
    description,
    cell,
    zoom,
    processor,
    resolution,
    camera,
  } = product;

  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [selectedColor] = useState(color);
  const [selectedCapacity] = useState(capacity);

  const onSelectedImage = (image: string) => {
    setCurrentImage(image);
  };

  const preparetedProduct = {
    id: product.name,
    category: '',
    phoneId: product.namespaceId,
    itemId: product.namespaceId,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 2019,
    image: product.images[0],
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
                  {
                    'productDetails__list-item--active': image === currentImage,
                  },
                )}
                onClick={() => onSelectedImage(image)}
              >
                <img
                  src={`/_new/${image}`}
                  alt="Phones"
                  className="productDetails__img"
                />
              </li>
            ))}
          </ul>

          <img src={`/_new/${currentImage}`} alt="" className="productDetails__img--active" />
        </div>

        <div className="productDetails__description">
          <div className="productDetails__colors">
            <div className="productDetails__description-title">
              Avaliable colors
            </div>
            <ul className="productDetails__list-colors">
              {colorsAvailable.map((colorData) => (
                <Link
                  to={{
                    pathname: `/phones/${namespaceId}-${selectedCapacity}-${color}`,
                  }}
                  key={colorData}
                  className={classNames(
                    'productDetails__list--color',
                    {
                      'productDetails__list--color--active':
                        selectedColor === color,
                    },
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
            <div className="productDetails__description-title">
              Select capacity
            </div>

            <ul className="productDetails__list-capacity">
              {capacityAvailable.map((capacityData) => (
                <Link
                  to={{
                    pathname: `/phones/${namespaceId}-${capacity}-${color}`,
                  }}
                  key={capacityData}
                  className={classNames(
                    'productDetails__capacity-item',
                    {
                      'productDetails__capacity-item--active':
                        capacity === selectedCapacity,
                    },
                  )}
                >
                  {capacity}
                </Link>
              ))}
            </ul>
          </div>

          <div className="productDetails__prices">
            <span className="productDetails__prices--full">{`$${priceDiscount}`}</span>
            <span className="productDetails__prices--sale">{`$${priceRegular}`}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <ToOrderButton product={preparetedProduct} />
            <ToLikedButton />
          </div>

          <div className="productCard__about">
            <ul className="productCard__list">
              <li>
                <span className="productCard__list-name">
                  Screen
                </span>

                <span>{screen}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  Capacity
                </span>

                <span>{capacity}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  RAM
                </span>

                <span>{ram}</span>
              </li>
            </ul>
          </div>
        </div>

        <span className="productDetails__id">ID:802390</span>
      </div>

      <div className="productDetails__wrapper">
        <div className="productDetails__details">
          <h1 className="productDetails__details-title">About</h1>

          {description.map((desc) => (
            <div className="productDetails__detail">
              <h3>{desc.title}</h3>
              <p>{desc.text}</p>
            </div>
          ))}

        </div>

        <div className="productDetails__details">
          <h1 className="productDetails__details-title">Tech specs</h1>

          <div className="productCard__about productDetails__about">
            <ul className="productCard__list">
              <li>
                <span className="productCard__list-name">
                  Screen
                </span>

                <span>{screen}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  Capacity
                </span>

                <span>{capacity}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  RAM
                </span>

                <span>{ram}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  Resolution
                </span>

                <span>{resolution}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  Processor
                </span>

                <span>{processor}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  Camera
                </span>

                <span>{camera}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  Zoom
                </span>

                <span>{zoom}</span>
              </li>

              <li>
                <span className="productCard__list-name">
                  Cell
                </span>

                <span>{cell.join(', ')}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

// "screen": "6.5' OLED (Super Retina HD)",
// "resolution": "2688х1242",
// "processor": "Apple A12 Bionic",
// "ram": "4GB",
// "camera": "12 Mp + 12 Mp + 7MP",
// "zoom": "Digital, 10x / Optical, 2x",
// "cell": ["GPRS", "EDGE", "WCDMA", "UMTS", "HSPA", "LTE"]
