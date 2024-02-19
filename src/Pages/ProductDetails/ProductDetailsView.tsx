import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Icon } from '../../components/Icon';
import { ImageSelector } from '../../components/ImageSelector';
import { OptionsSwitcher } from '../../components/OptionsSwitcher';
import { ProductSlider } from '../../components/ProductSlider';
import { TECH_SPECS } from '../../constants/constants';
// import { ProductDetails } from '../../store/models/productDetails';
import { Icons } from '../../types/enums/Icons';
import './ProductDetails.scss';
import { ProductDetailsViewProps } from './types';

export const ProductDetailsView: React.FC<ProductDetailsViewProps>
  = ({
    product, onColorChange, onCapacityChange, randomProducts,
  }) => {
    if (!product || Object.keys(product).length === 0) {
      return <div>Loading...</div>;
    }

    const {
      name,
      images,
      colorsAvailable,
      capacityAvailable,
      color,
      capacity,
      priceRegular,
      priceDiscount,
      screen,
      resolution,
      processor,
      ram,
      description,
      camera,
      zoom,
      cell,
    } = product;

    return (
      <section className="product-details">
        <Breadcrumbs />
        <p>backButton</p>
        <h1 className="product-details__title">{name}</h1>
        <div className="product-details__main">
          <ImageSelector images={images} />
          <div className="product-details__right">
            <OptionsSwitcher
              title="Available colors"
              data={colorsAvailable}
              variant="color"
              currentData={color}
              onChoose={onColorChange}
            />
            <div className="divider" />
            <OptionsSwitcher
              title="Available colors"
              data={capacityAvailable}
              variant="capacity"
              currentData={capacity}
              onChoose={onCapacityChange}
            />
            <div className="divider" />
            <div className="product-details__value">
              <div className="product-details__value-discount">{`$${priceDiscount}`}</div>
              <h2 className="product-details__value-price">{`$${priceRegular}`}</h2>
            </div>
            <div className="product-details__buttons">
              <button
                type="button"
                className="product-details__buttons-cart"
              >
                Add to cart
              </button>
              <button
                type="button"
                className="product-details__buttons-fav"
                aria-label="addToCart"
              >
                <Icon icon={Icons.Heart} />
              </button>
            </div>
            <div className="product-details__characteristics">
              <div className="product-details__characteristics__type">
                <p className="product-details__characteristics__type__text">
                  Screen
                </p>
                <p className="product-details__characteristics__type__text">
                  Resolution
                </p>
                <p className="product-details__characteristics__type__text">
                  Processor
                </p>
                <p className="product-details__characteristics__type__text">
                  RAM
                </p>
              </div>
              <div className="product-details__characteristics__value">
                <p className="product-details__characteristics__value__text">
                  {screen}
                </p>
                <p className="product-details__characteristics__value__text">
                  {resolution}
                </p>
                <p className="product-details__characteristics__value__text">
                  {processor}
                </p>
                <p className="product-details__characteristics__value__text">
                  {ram}
                </p>
              </div>
            </div>
          </div>
          <p className="product-details__id">
            ID: 802390
          </p>
          <div className="product-details__about">
            <h2 className="product-details__about__title">About</h2>
            <div className="divider" />
            <div className="product-details__about-container">
              {description.map(desc => (
                <div
                  className="product-details__about__item"
                  key={desc.title}
                >
                  <h3 className="product-details__about__item__title">
                    {desc.title}
                  </h3>
                  <p className="product-details__about__item__text">
                    {desc.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="product-details__specs">
            <h2 className="product-details__specs__title">
              Tech specs
            </h2>
            <div className="divider" />
            <div className="product-details__specs__container">
              <div className="product-details__specs__type">
                {TECH_SPECS.map(spec => (
                  <p
                    className="product-details__specs__spec"
                    key={spec}
                  >
                    {spec}
                  </p>
                ))}
              </div>
              <div className="product-details__specs__values">
                <p className="product-details__specs__value">{screen}</p>
                <p className="product-details__specs__value">{resolution}</p>
                <p className="product-details__specs__value">{processor}</p>
                <p className="product-details__specs__value">{ram}</p>
                <p className="product-details__specs__value">{capacity}</p>
                <p className="product-details__specs__value">{camera}</p>
                <p className="product-details__specs__value">{zoom}</p>
                <p className="product-details__specs__value">
                  {cell.reduce((acc, item) => {
                    return `${acc}${item} /`;
                  }, '').slice(1, -1)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="product-details__slider">
          <ProductSlider
            title="You may also like"
            products={randomProducts}
          />
        </div>
      </section>
    );
  };
