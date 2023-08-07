/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import classNames from 'classnames';
import { PhoneDetails } from '../../types/PhoneDetails';
import { SavedCard } from '../../types/SavedCard';
import { Product } from '../../types/Product';

type Props = {
  phoneDetails: PhoneDetails,
  bigImgIndex: number,
  onGalleryImg: (index: number) => void,
  cardedPhones: SavedCard[],
  onCardedProducts: () => void,
  favoritesPhones: Product[],
  onFavoritesProducts: () => void,
  selectedProduct: Product | null,
};

export const DesriptionOldApi: FC<Props> = ({
  phoneDetails,
  bigImgIndex,
  onGalleryImg,
  cardedPhones,
  onCardedProducts,
  favoritesPhones,
  onFavoritesProducts,
  selectedProduct,
}) => {
  return (
    <>
      <section
        className="product-details-page__product-section product-section"
      >
        <div className="product-section__gallery gallery">
          <div className="gallery__small-img-container small-img-container">
            {phoneDetails.images.map((img, index) => (
              <img
                className="small-img-container__img"
                src={img}
                alt="Phoduct"
                key={img}
                onClick={() => onGalleryImg(index)}
              />
            ))}
          </div>
          <div className="gallery__big-img-container big-img-container">
            <img
              className="big-img-container__big-img"
              src={phoneDetails.images[bigImgIndex]}
              alt="Phoduct"
            />
          </div>
        </div>
        <div className="product-section__choose-section choose-section">
          <div className="choose-section__colors-picker colors-picker">
            <h2 className="colors-picker__title">Available colors</h2>
            <ul className="colors-picker__list">
              <li className="colors-picker__items-colors items-colors">
                <div className="items-colors__color items-colors__color--1" />
              </li>
              <li className="colors-picker__items-colors items-colors">
                <div className="items-colors__color items-colors__color--2" />
              </li>
              <li className="colors-picker__items-colors items-colors">
                <div className="items-colors__color items-colors__color--3" />
              </li>
              <li className="colors-picker__items-colors items-colors">
                <div className="items-colors__color items-colors__color--4" />
              </li>
            </ul>
          </div>
          <div className="choose-section__buy-buttons buy-buttons">
            <div className="buy-buttons__prices-amount prices-amount">
              <p className="prices-amount__price">
                {`${selectedProduct ? selectedProduct.price - selectedProduct.discount : phoneDetails.priceDiscount}$`}
              </p>
              <p className="prices-amount__price prices-amount__price--discount">{`${selectedProduct ? selectedProduct.price : phoneDetails.priceRegular}$`}</p>
            </div>
            <div className="buy-buttons__buttons-buy-like buttons-buy-like">
              <button
                className={classNames(
                  'buttons-buy-like__add-to-card',
                  {
                    'buttons-buy-like__add-to-card--is-added':
                    cardedPhones.some(
                      card => phoneDetails.id === card.value.itemId
                      || phoneDetails.id === card.value.id,
                    ),
                  },
                )}
                type="button"
                onClick={onCardedProducts}
              >
                Add to cart
              </button>
              <button
                onClick={onFavoritesProducts}
                type="button"
                className="buttons-buy-like__add-to-favorites add-to-favorites"
              >
                <img
                  className="add-to-favorites__icon"
                  src={favoritesPhones.some(
                    p => phoneDetails.id === p.itemId
                    || phoneDetails.id === p.id,
                  )
                    ? 'images/icons/HeartLikeFilled.svg'
                    : 'images/icons/HeartLike.svg'}
                  alt="icon"
                />
              </button>
            </div>
          </div>
          <div className="choose-section__details-product details-product">
            <dl className="
            details-product__description-product
            description-product"
            >

              <dt className="description-product--title">Android</dt>
              <dd className="description-product--value">
                {`${phoneDetails.android.os}, ${phoneDetails.android.ui}`}
              </dd>
              <dt className="description-product--title">Availability</dt>
              <dd className="description-product--value">
                {`${phoneDetails.availability}`}
              </dd>
              <dt className="description-product--title">Battery</dt>
              <dd className="description-product--value">
                {`${phoneDetails.battery.standbyTime} ${phoneDetails.battery.talkTime} ${phoneDetails.battery.type} `}
              </dd>
              <dt className="description-product--title">Camera</dt>
              <dd className="description-product--value">
                {`${phoneDetails.camera}`}
              </dd>
            </dl>
          </div>
        </div>
      </section>
      <section className="
        product-details-page__product-articles
        product-articles
      "
      >
        <article className="product-articles__article-about article-about">
          <h2 className="article-about__title">About</h2>
          <h3 className="article-about__sub-title">
            Description
          </h3>
          <p
            className="article-about__text"
            key={phoneDetails.description[0].title}
          >
            {phoneDetails.description}
          </p>

        </article>
        <article className="product-articles__tech-specs tech-specs">
          <h2 className="tech-specs__title">Tech specs</h2>
          <dl className="tech-specs__tech-specs-list tech-specs-list">
            <dt className="tech-specs-list--title">Dispay</dt>
            <dd className="tech-specs-list--value">
              {`${phoneDetails.display.screenResolution} ${phoneDetails.display.screenSize} ${phoneDetails.display.touchScreen}`}
            </dd>
            <dt className="tech-specs-list--title">Resolution</dt>
            <dd className="tech-specs-list--value">
              {phoneDetails.resolution}
            </dd>
            <dt className="tech-specs-list--title">Processor</dt>
            <dd className="tech-specs-list--value">
              {phoneDetails.processor}
            </dd>
            <dt className="tech-specs-list--title">RAM</dt>
            <dd className="tech-specs-list--value">{phoneDetails.ram}</dd>
            <dt className="tech-specs-list--title">Built in memory</dt>
            <dd className="tech-specs-list--value">
              {phoneDetails.capacity}
            </dd>
            <dt className="tech-specs-list--title">Camera</dt>
            <dd className="tech-specs-list--value">
              {phoneDetails.camera}
            </dd>
            <dt className="tech-specs-list--title">Zoom</dt>
            <dd className="tech-specs-list--value">{phoneDetails.zoom}</dd>
            <dt className="tech-specs-list--title">Cell</dt>
            <dd className="tech-specs-list--value">
              {phoneDetails.cell ? (
                phoneDetails.cell.map((item, index) => (
                  <p key={item} className="tech-specs-list--value-cell">
                    {`${item}${index !== phoneDetails.cell.length - 1 ? ',' : ''}`}
                  </p>
                ))
              ) : (
                ''
              )}
            </dd>
          </dl>
        </article>
      </section>
    </>
  );
};
