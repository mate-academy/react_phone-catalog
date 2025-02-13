import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconsBar } from '../IconsBar/IconsBar';
import './ProductDetails.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  AccessoriesContext,
  PhoneContext,
  ProductContext,
  TabletContext,
} from '../utils/contexts';
import { Product } from '../Types/products';
import classNames from 'classnames';
import { ButtonsAddToCardFavorites } from '../ButtonsAddToCardFavorites';
import { RecommendedSlider } from '../RecommendedSlider/RecommendedSlider';

type Props = {
  productType: 'phones' | 'tablets' | 'accessories';
};

export const ProductDetailsPage: React.FC<Props> = ({ productType }) => {
  function getRandomItems(arr: Product[], count: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
  }

  const { productId } = useParams();
  const navigate = useNavigate();

  const phones = useContext(PhoneContext);
  const products = useContext(ProductContext);
  const tablets = useContext(TabletContext);
  const accessories = useContext(AccessoriesContext);

  const [imageLarge, setImageLarge] = useState('');

  const getProductsByType = () => {
    switch (productType) {
      case 'phones':
        return phones;
      case 'tablets':
        return tablets;
      case 'accessories':
        return accessories;
      default:
        return [];
    }
  };

  const productsList = getProductsByType();
  const product = productsList?.find(p => p.id === productId);

  useEffect(() => {
    if (product?.images?.length) {
      setImageLarge(product.images[0]);
    }
  }, [productId, product]);

  const recommendedProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    return getRandomItems(
      products.filter(prod => prod.category === productType),
      Math.floor(Math.random() * (8 - 4) + 5),
    );
  }, [products, productType]);

  if (!productId || !product) {
    return <h2>Product not found</h2>;
  }

  const {
    name,
    color,
    images = [],
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    description,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  const formattedProductIdColor = productId.replace(/(\d+(?:gb|mm)-).*/, '$1');
  const foundProduct = products?.find(prod => prod.itemId === product.id);

  return (
    <div className="product-details">
      <div className="container">
        <IconsBar pageType={productType} />

        <button
          className="product-details__back-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <div className="product-details__arrow-left"></div>
          Back
        </button>

        <h2 className="product-details__product-name">{name}</h2>

        <div className="product-details__top-part">
          <img
            className="product-details__image-large"
            src={`/${imageLarge}`}
            alt=""
          />

          <div className="product-details__product-images">
            {images.map(image => (
              <img
                src={`/${image}`}
                alt=""
                key={image}
                className={classNames('product-details__product-image', {
                  'product-details__product-image--active':
                    image === imageLarge,
                })}
                onClick={() => setImageLarge(image)}
              />
            ))}
          </div>

          <div className="product-details__controls">
            <div className="product-details__spans-container">
              <span className="product-details__text">Available colors</span>
              <span className="product-details__text product-details__text--id">
                ID: 802390
              </span>
            </div>
            <div className="product-details__available-colors">
              {product.colorsAvailable.map(colorAvailable => (
                <Link
                  to={`/${productType}/${formattedProductIdColor + colorAvailable.split(' ').join('-')}`}
                  className={classNames('product-details__color', {
                    'product-details__color--active': colorAvailable === color,
                  })}
                  key={colorAvailable}
                  style={{ backgroundColor: colorAvailable }}
                ></Link>
              ))}
            </div>
            <span
              className={classNames(
                'product-details__text',
                'product-details__text--capacity',
              )}
            >
              Select capacity
            </span>

            <div
              className={`product-details__buttons 
              product-details__buttons--for-capacity`}
            >
              {capacityAvailable.map(capacityButton => {
                const isActive =
                  capacityButton.trim().toLowerCase() ===
                  capacity.trim().toLowerCase();

                return (
                  <Link
                    to={`/${productType}/${productId.replace(
                      /(\d+(?:gb|mm))/,
                      capacityButton.toLowerCase(),
                    )}`}
                    className={classNames(
                      'product-details__button-for-capacity',
                      {
                        'product-details__button-for-capacity--active':
                          isActive,
                      },
                    )}
                    key={capacityButton}
                  >
                    {capacityButton}
                  </Link>
                );
              })}
            </div>

            <div className="product-details__prices">
              <div className="product-details__price">{`$${priceDiscount}`}</div>
              <div className="product-details__price--crosed">{`$${priceRegular}`}</div>
            </div>

            {foundProduct && (
              <ButtonsAddToCardFavorites product={foundProduct} />
            )}

            <div className="product-details__specs-container">
              <div className="product-details__specs">
                <span
                  className={`
                  product-details__text 
                  product-details__text--spec
                `}
                >
                  Screen
                </span>
                <span
                  className={`
                  product-details__text 
                  product-details__text--spec
                `}
                >
                  Resolution
                </span>
                <span
                  className={`
                  product-details__text 
                  product-details__text--spec
                `}
                >
                  Processor
                </span>
                <span
                  className={`
                  product-details__text 
                  product-details__text--spec
                `}
                >
                  RAM
                </span>
              </div>
              <div className="product-details__values">
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {screen}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {resolution}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {processor}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {ram}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__container">
          <div className="product-details__description">
            <h3 className="product-details__title">About</h3>
            {description.map((desc, index) => (
              <article className="product-details__article" key={index}>
                <h4 className="product-details__article-title">{desc.title}</h4>
                <span className="product-details__article-text">
                  {desc.text}
                </span>
              </article>
            ))}
          </div>

          <div className="product-details__tech-spec-container">
            <h3 className="product-details__specs-title">Tech specs</h3>
            <div className="product-details__specs-container">
              <div className="product-details__specs">
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  Screen
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  Resolution
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  Processor
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  RAM
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  Built in memory
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  Camera
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  Zoom
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--spec`}
                >
                  Cell
                </span>
              </div>
              <div className="product-details__values">
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {screen}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {resolution}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {processor}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {ram}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {capacity}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {camera}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {zoom}
                </span>
                <span
                  className={`product-details__text 
                  product-details__text--value`}
                >
                  {cell.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <RecommendedSlider
          title="You may also like"
          recommendedProducts={recommendedProducts}
        />
      </div>
    </div>
  );
};
