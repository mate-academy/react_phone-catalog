/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { DetailType } from '../../helpers/types/DetailType';
import { ButtonCircle } from '../../elements/ButtonCircle/ButtonCircle';
import './ProductDetails.scss';
import {
  capacities,
  getImgUrl,
  getProductImages,
} from '../../helpers/utils/details';
import { ButtonTexted } from '../../elements/ButtonTexted/ButtonTexted';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { ProductsContext } from '../../store/ProductsContext';
import { getPruductFromDetail } from '../../helpers/utils/getProductFromDetail';
import { capitalize } from '../../helpers/utils/capitalize';

type Props = {
  product: DetailType;
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const { products } = useContext(ProductsContext);
  const [curCapasity, setCurCapasity] = useState('64');
  const {
    name,
    colorsAvailable,
    priceRegular,
    priceDiscount,
    images: imgs,
    id,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    capacity,
  } = product;

  const shortInfo = {
    screen,
    resolution,
    processor,
    ram,
  };

  const longInfo = {
    ...shortInfo,
    capacity,
    camera,
    zoom,
    cell: cell.join(', '),
  };

  const urlImg = getImgUrl(product);
  const images = getProductImages(imgs.length, urlImg);

  const [selectedImg, setSelectedImg] = useState(images[0]);

  // here I dont need images as dependencies
  // how omit linter mistake?
  useEffect(() => {
    setSelectedImg(images[0]);
  }, [product, images]);

  return (
    <div className="details">
      <h1 className="details__title">{name}</h1>

      <div className="details__content">
        <section className="details__section details__section--images">
          <div className="
            details__wrapper
            details__wrapper--column
            details__wrapper--images"
          >
            {images.map(image => (
              <button
                type="button"
                className={classNames('details__image-button', {
                  'details__image-button--active': selectedImg === image,
                })}
                key={image}
                onClick={() => setSelectedImg(image)}
              >
                <img
                  src={image}
                  alt="img"
                  key={image}
                  className="details__image"
                />
              </button>
            ))}
          </div>
          <img
            src={selectedImg}
            alt="img"
            className="details__image details__image--big"
          />
        </section>

        <section className="details__section details__section--interactive">
          <div className="details__wrapper details__wrapper--column">
            <div className="details__container">
              <p className="details__name">Available colors</p>
              <p className="details__name">{`ID: ${getPruductFromDetail(products, id).id}`}</p>
            </div>
            <ul className="details__wrapper">
              {colorsAvailable.map(color => (
                <ButtonCircle
                  key={color}
                  color={color}
                  path={`/phones/${id.slice(0, id.lastIndexOf('-'))}-${color}`}
                />
              ))}
            </ul>
          </div>

          <div className="details__line" />

          <div className="details__wrapper details__wrapper--column">
            <p className="details__name">Select capasity</p>
            <ul className="details__wrapper">
              {capacities.map(cap => (
                <Link
                  to={`/phones/${id.slice(0, id.lastIndexOf('-') - 2)}-${cap}gb${id.slice(id.lastIndexOf('-'))}`}
                  key={cap}
                  type="button"
                  aria-label="button"
                  onClick={() => setCurCapasity(cap)}
                  className={classNames('details__capacity', {
                    'details__capacity--active': cap === curCapasity,
                  })}
                >
                  {`${cap} GB`}
                </Link>
              ))}
            </ul>
          </div>

          <div className="details__line" />

          <div className="details__wrapper--column">
            <div className="details__wrapper">
              <p className="details__price">{`$${priceRegular}`}</p>
              <p className="details__fullprice">{`$${priceDiscount}`}</p>
            </div>

            <div className="details__wrapper details__wrapper--margin-top">
              <ButtonTexted
                text="Add to cart"
                textActive="Added to cart"
                width="longer"
                product={getPruductFromDetail(products, id)}
              />

              <ButtonIcon
                type="event"
                shape="heart"
                dynamicClasses={['medium']}
                product={getPruductFromDetail(products, id)}
                checkFav
              />
            </div>
          </div>

          <div className="details__wrapper details__wrapper--column">
            {Object.entries(shortInfo).map(([key, value]) => (
              <div key={value} className="details__wrapper details__wrapper--space">
                <p className="details__name">{capitalize(key)}</p>
                <p className="details__info">{value || '-'}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="details__section">
          <h2 className="details__title-h2">About</h2>

          <div className="details__line" />

          {description.map(desc => (
            <article className="details__article">
              <h3 className="details__title-h3">{desc.title}</h3>

              <p className="details__small-text details__small-text--article details__small-text--name">{desc.text}</p>
            </article>
          ))}

          <div className="details__line" />
        </section>

        <section className="details__section">
          <h2 className="details__title-h2">Tech specs</h2>

          <div className="details__line" />

          <div className="details__wrapper details__wrapper--column">
            {Object.entries(longInfo).map(([key, value]) => (
              <div key={value} className="details__wrapper details__wrapper--space">
                <p className="details__small-text details__small-text--name">{capitalize(key)}</p>
                <p className="details__spec">{value || '-'}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
