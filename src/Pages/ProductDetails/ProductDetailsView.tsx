import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ImageSelector } from '../../components/ImageSelector';
import { ProductAbout } from '../../components/ProductAbout/ProductAbout';
import { ProductInfo } from '../../components/ProductInfo/ProductInfo';
import { ProductSlider } from '../../components/ProductSlider';
import { TECH_SPECS } from '../../constants/constants';
import './ProductDetails.scss';
import { ProductDetailsViewProps } from './types';

export const ProductDetailsView: React.FC<ProductDetailsViewProps>
  = ({
    product,
    onColorChange,
    onCapacityChange,
    randomProducts,
    onCartAdd,
    onFavoritesToggle,
    isInCart,
    isInFavorites,
  }) => {
    const {
      name,
      images,
      capacity,
      processor,
      ram,
      description,
      camera,
      zoom,
      cell,
      screen,
      resolution,
    } = product;

    return (
      <section className="product-details">
        <div className="product-details__links">
          <Breadcrumbs />
          <BackButton />
        </div>
        <h1 className="product-details__title">{name}</h1>
        <div className="product-details__main">
          <ImageSelector images={images} />
          <ProductInfo
            product={product}
            onColorChange={onColorChange}
            onCapacityChange={onCapacityChange}
            onCartAdd={onCartAdd}
            onFavoritesToggle={onFavoritesToggle}
            isInCart={isInCart}
            isInFavorites={isInFavorites}
          />
          <p className="product-details__id">
            ID: 802390
          </p>
          <ProductAbout description={description} />
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
