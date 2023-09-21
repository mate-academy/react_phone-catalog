import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ProductDetails } from '../../types/ProductDetails';
import { AddToCartButton } from '../Buttons/AddToCartButton';
import { AddToFav } from '../Buttons/AddToFav';
import { colors } from '../../types/colors';

type Props = {
  product: ProductDetails;
  currentImage: string;
  setCurrentImage: (img: string) => void;
  rout: string;
  currentCapacity: string;
  currentColor: string;
};

export const Details: React.FC<Props> = ({
  product,
  currentImage,
  setCurrentImage,
  rout,
  currentCapacity,
  currentColor,
}) => {
  const {
    name,
    images,
    colorsAvailable,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  return (
    <div className="details">
      <h1 className="details__title">{name}</h1>

      <div className="details__container">
        <div className="details__top">
          <div className="details__photoBlock">
            <div className="details__photo-list">
              {images.map(img => (
                <button
                  type="button"
                  className="details__photo"
                  key={img}
                  onClick={() => setCurrentImage(img)}
                >
                  <img
                    src={`../_new/${img}`}
                    alt={product.name}
                    className="details__photo--img"
                  />
                </button>
              ))}
            </div>

            <div className="details__mainPhoto">
              <img
                src={`../_new/${currentImage}`}
                alt={name}
                className="details__mainPhoto--photo"
              />
            </div>
          </div>

          <div className="details__baseInfo">
            <div className="details__colors">
              <p className="details__colors-title">Available colors</p>
              <ul className="details__colors-list">
                {colorsAvailable.map(color => (
                  <Link
                    to={`${rout}-${currentCapacity.toLowerCase()}-${color}`}
                    key={color}
                    style={{ backgroundColor: colors[color] }}
                    className={classNames('details__colors-item', {
                      'details__colors-item--active': color === currentColor,
                    })}
                  />
                ))}
              </ul>
            </div>

            <div className="details__capacity">
              <p className="details__capacity-title">Select capacity</p>
              <ul className="details__capacity-list">
                {capacityAvailable.map(capAviable => (
                  <NavLink
                    key={capAviable}
                    to={`${rout}-${capAviable.toLowerCase()}-${currentColor}`}
                    className={classNames('details__capacity-item', {
                      'details__capacity-item--active':
                      capAviable === currentCapacity,
                    })}
                  >
                    {capAviable}
                  </NavLink>
                ))}
              </ul>

            </div>

            <div className="details__price">
              <h2 className="details__price--discount">{`$${priceDiscount}`}</h2>
              <h3 className="details__price--regular">{`$${priceRegular}`}</h3>
            </div>

            <div className="details__buttons">
              <AddToCartButton prodId={product.id} />
              <AddToFav prodId={product.id} />
            </div>

            <div className="details__description" data-cy="productDescription">
              <div className="details__description--line">
                <p className="details__description--key">Screen</p>
                <p className="details__description--val">{screen}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Resolution</p>
                <p className="details__description--val">{resolution}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Processor</p>
                <p className="details__description--val">{processor}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">RAM</p>
                <p className="details__description--val">{ram}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="details__bottom">
          <div className="details__about">
            <h3 className="details__subtitle">About</h3>
            {product?.description.map(desc => (
              <div className="details__aboutInfo" key={desc.title}>
                <h4 className="details__aboutInfo--subtitle">{desc.title}</h4>
                <p className="details__aboutInfo--text">{desc.text}</p>
              </div>
            ))}
          </div>

          <div className="details__tech">
            <h3 className="details__subtitle">Tech specs</h3>
            <div className="details__description details__description--tech">
              <div className="details__description--line">
                <p className="details__description--key">Screen</p>
                <p className="details__description--val">{screen}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Resolution</p>
                <p className="details__description--val">{resolution}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Processor</p>
                <p className="details__description--val">{processor}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">RAM</p>
                <p className="details__description--val">{ram}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Built in memory</p>
                <p className="details__description--val">{capacity}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Camera</p>
                <p className="details__description--val">{camera}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Zoom</p>
                <p className="details__description--val">{zoom}</p>
              </div>

              <div className="details__description--line">
                <p className="details__description--key">Cell</p>
                <p className="details__description--val">{cell.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
