import { useState, useContext } from 'react';
import classNames from 'classnames';
import './ProductDetails.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { ProductsContext } from '../../helpers/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';
import { Breadcrumbs } from '../Breadcrumbs';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowBack } from '../ArrowBack';

type Props = {
  details: ProductDetailsType | null,
};

export const ProductDetails = ({ details }: Props) => {
  const [selectedImage, setSelectedImage] = useState(details?.images[0]);
  const { productsFromServer } = useContext(ProductsContext);
  const selectedProduct = (productsFromServer
    .find(prod => prod.id === details?.id));
  const discount = selectedProduct?.discount || 0;
  const price = selectedProduct?.price || 0;
  const screen = selectedProduct?.screen || '';
  const priceWithDiscount = Math.round(price - price * (discount / 100));
  const randomProducts = productsFromServer.sort(() => Math.random() - 0.5);
  const handleSelectingImg = (imageUrl: string) => (
    () => setSelectedImage(imageUrl));

  return (
    <>
      <section className="product-details">
        <div className="main-container">
          <Breadcrumbs
            type={selectedProduct?.type || ''}
            productName={details?.name}
          />

          <ArrowBack />

          <h2 className="product-details__title">
            {details?.name}
          </h2>

          <div className="grid grid--tablet-desktop">
            <img
              src={selectedImage}
              alt="product img"
              className="
              product-details__image
              grid__item--tablet-2-7
              grid__item--desktop-3-12
            "
            />

            <div
              className="
              product-details__img-selector
              grid__item--tablet-1-1
              grid__item--desktop-1-2
            "
            >
              {details?.images.map(imageUrl => (
                <button
                  type="button"
                  key={imageUrl}
                  onClick={handleSelectingImg(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt="product img in selector"
                    className={classNames(
                      'product-details__img-selector-item',
                      {
                        'product-details__img-selector-item--selected':
                      imageUrl === selectedImage,
                      },
                    )}
                  />
                </button>
              ))}
            </div>

            <div
              className="
              product-details__main-controls
              grid__item--tablet-8-12
              grid__item--desktop-14-20
            "
            >
              <div className="prices prices--details">
                <div className="prices__price">
                  {discount ? `$${priceWithDiscount}` : `$${price}`}
                </div>

                {discount > 0 && (
                  <div className="prices__price prices__price--discount">
                    {`$${price}`}
                  </div>
                )}
              </div>

              <PrimaryButton
                className="primary-button--details"
                product={selectedProduct}
              />

              <div className="product-details__row">
                <div className="product-details__option">
                  Screen
                </div>

                <div className="product-details__value">
                  {screen}
                </div>
              </div>

              <div className="product-details__row">
                <div className="product-details__option">
                  Resolution
                </div>

                <div className="product-details__value">
                  {details?.display.screenResolution}
                </div>
              </div>

              <div className="product-details__row">
                <div className="product-details__option">
                  Processor
                </div>

                <div className="product-details__value">
                  {details?.hardware.cpu}
                </div>
              </div>

              <div className="product-details__row">
                <div className="product-details__option">
                  RAM
                </div>

                <div className="product-details__value">
                  {details?.storage.ram}
                </div>
              </div>
            </div>

            <div
              className="
              product-details__section-about
              grid__item--tablet-1-12
              grid__item--desktop-1-12
              "
              data-cy="productDescription"
            >
              <h3 className="product-details__subtitle">About</h3>
              <div className="line" />
              <p className="product-details__about">
                {details?.description}
              </p>
            </div>

            <div
              className="
              product-details__section-tech-specs
              grid__item--tablet-1-12
              grid__item--desktop-14-24
            "
            >
              <h3 className="product-details__subtitle">Tech specs</h3>
              <div className="line" />

              <div className="product-details__tech-specs">
                <div className="product-details__row">
                  <div className="product-details__option">
                    Screen
                  </div>

                  <div className="product-details__value">
                    {screen}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    Resolution
                  </div>

                  <div className="product-details__value">
                    {details?.display.screenResolution}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    Processor
                  </div>

                  <div className="product-details__value">
                    {details?.hardware.cpu}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    RAM
                  </div>

                  <div className="product-details__value">
                    {details?.storage.ram}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    OS
                  </div>

                  <div className="product-details__value">
                    {details?.android.os}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    Built in memory
                  </div>

                  <div className="product-details__value">
                    {details?.storage.flash}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    Bluetooth
                  </div>

                  <div className="product-details__value">
                    {details?.connectivity.bluetooth}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    Camera
                  </div>

                  <div className="product-details__value">
                    {details?.camera.primary || 'unknown'}
                  </div>
                </div>

                <div className="product-details__row">
                  <div className="product-details__option">
                    Cell
                  </div>

                  <div className="product-details__value">
                    {details?.connectivity.cell}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section>
        <ProductsSlider
          products={randomProducts}
          title="You may also like"
          className="random"
        />
      </section>
    </>
  );
};
