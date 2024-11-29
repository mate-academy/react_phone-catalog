import { useSelector } from 'react-redux';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ResponsiveHeader } from '../../components/ResponsiveHeader';
import { RootState } from '../../app/store';
import themeStyles from '../../styles/utils/themeStyles';
import { usePathSegments } from '../../hooks/usePathSegments';
import { useEffect, useMemo, useState } from 'react';
import { getProductsByCategory } from '../../api/products';
import { Category } from '../../types/category';
import { ProductDetails } from '../../types/productDetails';

import { ProductDetailsLoader } from './ProductDetailsLoader';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { Slider } from '../../components/Sliders/Slider';
import { parseProductId } from '../../utils/parseProductId';
import { FavouritesIcon } from '../../components/FavouritesIcon';

import './ProductDetailsPage.scss';
import { ProductNotFound } from '../../components/ProductNotFound';
import { SomethingWentWrong } from '../../components/SomethingWentWrong';

const colorMap: Record<string, string> = {
  black: '#000000',
  green: '#28a745',
  yellow: '#ffc107',
  white: '#ffffff',
  purple: '#6f42c1',
  red: '#dc3545',
  spacegray: '#4b4b4b',
  'space gray': '#4b4b4b',
  'sky blue': '#87cefa',
  midnightgreen: '#004953',
  gold: '#ffd700',
  silver: '#c0c0c0',
  rosegold: '#b76e79',
  'rose gold': '#b76e79',
  coral: '#ff7f50',
  midnight: '#2c2c54',
  spaceblack: '#222222',
  blue: '#007bff',
  pink: '#ff69b4',
  graphite: '#383838',
  sierrablue: '#4682b4',
};

type GetProductIdParams =
  | { withoutColor: boolean; withoutCapacity?: never; value: string }
  | { withoutCapacity: boolean; withoutColor?: never; value: string };

export const ProductDetailsPage = () => {
  const pathSegments = usePathSegments();
  const category = pathSegments[0] as Category;
  const itemId = pathSegments[1];

  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDetails[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsByCategory(category);

        setProducts(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const product = useMemo(() => {
    return (
      (products.find(prop => prop.id === itemId) as ProductDetails) || null
    );
  }, [products, itemId]);

  const handleBackClick = () => {
    navigate('..');
  };

  /* eslint-disable @typescript-eslint/indent */

  const techSpecs = product
    ? Object.keys(product).slice(
        Object.keys(product).indexOf('description') + 1,
      )
    : [];
  /* eslint-enable @typescript-eslint/indent */

  const formatSpecValue = (value: unknown): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return value?.toString() || '';
  };

  const getProductId = ({
    withoutColor,
    withoutCapacity,
    value,
  }: GetProductIdParams) => {
    const productId = product.id.split('-');
    const { colorParts, capacityIndex } = parseProductId(
      product.id.split('-'),
      product,
    );

    if (withoutColor) {
      const color = value.split(' ').join('-');

      // Replacing color from productId
      productId.splice(capacityIndex + 1, colorParts.length, color);
    }

    if (withoutCapacity) {
      // Replacing capacity from productId
      productId[capacityIndex] = value.toLowerCase();
    }

    return productId.join('-');
  };

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { arrow } = themeStyles(currentTheme === 'light-theme');

  const handlePhotoClick = (url: string) => {
    setCurrentImage(url);
  };

  // Sets default image
  useEffect(() => {
    if (!isLoading && product) {
      setCurrentImage(product.images[0]);
    }
  }, [product, isLoading]);

  return (
    <div className="details-page page">
      <Breadcrumbs />

      <button className="details-page__back-button" onClick={handleBackClick}>
        <img src={arrow} alt="Back button" className="icon icon-left" />
        <span className="text-gray">Back</span>
      </button>

      {isLoading && <ProductDetailsLoader />}

      <div className="details-page__title">
        <ResponsiveHeader>{product?.name}</ResponsiveHeader>
      </div>

      {hasError && <SomethingWentWrong />}

      {!hasError && !isLoading && !product && (
        <ProductNotFound title="Product not found!" />
      )}

      {!hasError && !isLoading && product && (
        <div className="details-page__container">
          <div className="details-page__main">
            <div className="details-page__main-container">
              <div className="details-page__photo-block">
                <div className="details-page__photo">
                  <img
                    className="image"
                    src={currentImage}
                    alt={product.name}
                  />
                </div>
              </div>

              <ul className="details-page__list">
                {product.images.map((image, index) => (
                  <li
                    key={index}
                    className={classNames('details-page__list-item', {
                      active: currentImage === image,
                    })}
                    onClick={() => handlePhotoClick(image)}
                  >
                    <img className="image" src={image} alt={product.name} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="details-page__main-content">
              <div className="details-page__colors">
                <div className="details-page__colors-top">
                  <p className="small-text-gray">Available colors</p>
                  <span className="small-text-gray">ID: 802390</span>
                </div>

                <div className="details-page__colors-options">
                  {product.colorsAvailable.map((color, index) => (
                    <Link
                      key={index}
                      to={`/${category}/${getProductId({ withoutColor: true, value: color })}`}
                      className="details-page__colors-options-item"
                    >
                      <div
                        style={{ backgroundColor: colorMap[color] }}
                        className="details-page__circle"
                      ></div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="details-page__capacity">
                <div className="details-page__capacity-title">
                  <p className="small-text-gray">Select capacity</p>
                </div>

                <div className="details-page__capacity-options">
                  {product.capacityAvailable.map((amount, index) => {
                    return (
                      <Link
                        to={`/${category}/${getProductId({ withoutCapacity: true, value: amount })}`}
                        key={index}
                        className={classNames(
                          'details-page__capacity-options-item',
                          { active: product.capacity === amount },
                        )}
                      >
                        {amount}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="details-page__price">
                <div className="item-price">
                  <h2>${product.priceDiscount}</h2>

                  <span className="fullprice">${product.priceRegular}</span>
                </div>
              </div>

              <div className="details-page__buttons">
                <div className="item-buttons">
                  <button className="card-button buttons-text">
                    Add to Cart
                  </button>

                  <div className="details-page__favourites-button">
                    <FavouritesIcon itemId={product.id} />
                  </div>
                </div>
              </div>

              <div className="item-specs">
                <div className="item-specs-block">
                  <div className="small-text-gray">Screen</div>
                  <div className="small-text">{product.screen}</div>
                </div>

                <div className="item-specs-block">
                  <div className=" small-text-gray">Resolution</div>
                  <div className="small-text">{product.resolution}</div>
                </div>

                <div className="item-specs-block">
                  <div className=" small-text-gray">Processor</div>
                  <div className="small-text">{product.processor}</div>
                </div>

                <div className="item-specs-block">
                  <div className=" small-text-gray">RAM</div>
                  <div className=" small-text">{product.ram}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="details-page__info">
            <div className="details-page__about">
              <h3 className="details-page__info-title">About</h3>

              {product.description.map((current, index) => (
                <div key={index} className="details-page__about-info">
                  <h4>{current.title}</h4>

                  <p className="details-page__about-info-text text-gray">
                    {current.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="details-page__tech-specs">
              <h3 className="details-page__info-title">Tech specs</h3>

              <div className="details-page__specs-block">
                <div className="item-specs">
                  {techSpecs.map((spec, index) => (
                    <div key={index} className="item-specs-block">
                      <div className="small-text-gray">
                        {spec.charAt(0).toUpperCase() + spec.slice(1)}
                      </div>

                      <div className="small-text">
                        {formatSpecValue(product[spec as keyof ProductDetails])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Slider category={category} title="You may also like" />
    </div>
  );
};
