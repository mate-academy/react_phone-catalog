import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import { ProductsScroller } from '../shared/ProductsScroller';
import { Product } from '../../types/Product';
import { Buttons } from '../shared/Buttons';
import { getHexColor, transformToUpperCase } from '../../utils/helpers/helpers';

export const ProductDetailsPage = () => {
  const { products, loading } = useAppSelector(state => state.products);
  const [product, setProduct] = useState<Product | null>(null);

  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState('');

  useEffect(() => window.scrollTo(0, 0), [productId]);

  const handleImageChange = (img: string) => setCurrentImg(img);

  const getCategory = () => {
    const lastIndex = location.pathname.lastIndexOf('/');

    return location.pathname.slice(1, lastIndex);
  };

  const goBack = () => navigate(-1);

  /* product logic start */

  const getProduct = () => {
    const result = products.find(one => one.id === productId);

    return result ? result : null;
  };

  useEffect(() => {
    setProduct(getProduct());
  }, [productId, products, loading]);

  const getLink = (
    item: Product,
    value: string,
    type: 'color' | 'capacity',
  ) => {
    const category = item.category;
    let nextItem;

    /* eslint-disable */
    if (type === 'color') {
      nextItem = products.find(one => {
        return one.namespaceId === item.namespaceId
        && one.capacity === item.capacity
        && one.color === value});
    } else {
      nextItem = products.find(one => {
        return one.namespaceId === item.namespaceId
        && one.capacity === value
        && one.color === item.color});
    }
    /* eslint-enable */

    return `/${category}/${nextItem?.id}`;
  };

  useEffect(() => {
    if (product) {
      setCurrentImg(product.images[0]);
    }
  }, [productId, product, loading]);

  const getRecommendedProducts = (arr: Product[]) => {
    return arr.filter(
      one => one.namespaceId === product?.namespaceId && one.id !== product.id,
    );
  };

  // only for better visuals, can be replaced with actual ID if necessary
  const createPrettyId = (item: Product) => {
    const createdId = item.id.split('').map(ch => ch.charCodeAt(0));

    return createdId.join('').slice(0, 8);
  };

  /* product logic end */

  return (
    // didn't add any animation while loading as the data gets fetched too quickly
    <section className="product-details">
      <div className="product-details__link-back">
        <Link to="/" className="product-details__home-link home-icon" />

        <div className="product-details__arrow-right" />

        <Link to=".." className="product-details__prev-page-link">
          {transformToUpperCase(getCategory())}
        </Link>

        <div className="product-details__arrow-right" />

        <div className="product-details__current-page">
          {product?.name || 'Nothing was found'}
        </div>
      </div>
      <div className="product-details__back" onClick={goBack}>
        <div className="product-details__arrow-left" />

        <div className="product-details__go-back">Back</div>
      </div>

      {product && !loading && (
        <>
          <h2 className="product-details__title">{product.name}</h2>

          <article className="product-details__info">
            <article className="product-card">
              <img
                src={currentImg}
                alt="product image"
                className="product-card__img"
              />

              <div className="product-card__images">
                {product.images.map(image => (
                  <img
                    src={image}
                    alt="product images"
                    className={cn('product-card__small-image', {
                      // eslint-disable-next-line
                      'product-card__small-image--displayed': image === currentImg,
                    })}
                    key={image}
                    onClick={() => handleImageChange(image)}
                  />
                ))}
              </div>

              <div className="product-card__details">
                <div className="product-card__colors">
                  <div className="product-card__description">
                    <p className="product-card__text">Available colors</p>

                    <p className="product-card__id">
                      ID: {createPrettyId(product)}
                    </p>
                  </div>

                  <div className="product-card__available-colors">
                    {product.colorsAvailable.map(color => (
                      <Link
                        to={getLink(product, color, 'color')}
                        className={cn('product-card__available-color', {
                          'product-card__available-color--displayed':
                            color === product.color,
                        })}
                        key={color}
                      >
                        <div
                          className="product-card__available-color-filled"
                          style={{
                            backgroundColor: `${getHexColor(color)}`,
                          }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="product-card__capacity">
                  <p className="product-card__text">
                    {product.category === 'accessories'
                      ? 'Select size'
                      : 'Select capacity'}
                  </p>

                  <div className="product-card__available-capacities">
                    {product.capacityAvailable.map(capacity => (
                      <Link
                        to={getLink(product, capacity, 'capacity')}
                        className={cn('product-card__available-capacity', {
                          'product-card__available-capacity--displayed':
                            capacity === product.capacity,
                        })}
                        key={capacity}
                      >
                        {capacity}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="product-card__prices">
                  <p className="product-card__price">
                    ${product.priceDiscount}
                  </p>

                  {/* eslint-disable-next-line */}
                  <p className="product-card__price product-card__price--discount">
                    ${product.priceRegular}
                  </p>
                </div>

                <div className="product__buttons product-card__buttons">
                  <Buttons
                    product={product}
                    cartClasses={[
                      'product__cart product-card__cart',
                      'product__cart--added',
                    ]}
                    favoritesClasses={[
                      'product__favorite product-card__favorite',
                      'product__favorite--added',
                    ]}
                  />
                </div>

                <div className="product-card__features">
                  {Object.entries(product.specs)
                    .slice(0, 4)
                    .map(([specKey, specValue]) => (
                      <div className="product-card__feature" key={specKey}>
                        <div className="product-card__feature-name">
                          {transformToUpperCase(specKey)}
                        </div>

                        <div className="product-card__feature-text">
                          {specValue}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </article>

            <div className="product-details__tech">
              <article className="product-about">
                <h3 className="product-about__title">About</h3>

                {product.description.map(({ title, text }, i) => (
                  <div className="product-about__section" key={i}>
                    <h4 className="product-about__section-title">{title}</h4>

                    <p className="product-about__section-text">{text}</p>
                  </div>
                ))}
              </article>

              <article className="product-tech-specs">
                <h3 className="product-tech-specs__title">Tech specs</h3>

                <div className="product-tech-specs__specs">
                  {Object.entries(product.specs).map(([specKey, specValue]) => (
                    <div className="product-tech-specs__spec" key={specKey}>
                      <p className="product-tech-specs__spec-title">
                        {specKey === 'capacity'
                          ? 'Built in memory'
                          : transformToUpperCase(specKey)}
                      </p>

                      <div className="product-tech-specs__spec-value">
                        {Array.isArray(specValue)
                          ? specValue.join(', ')
                          : specValue}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </article>

          <article className="product-details__recommendations">
            <ProductsScroller
              products={getRecommendedProducts(products)}
              title="You may also like"
            />
          </article>
        </>
      )}

      {!product && !loading && (
        <div className="empty-page empty-page--product">
          <article className="empty-page__card">
            <h3 className="empty-page__title">No products match the id</h3>

            <Link to="/" className="empty-page__button">
              Go home
            </Link>
          </article>

          <div className="empty-page__img-grid">
            <div className="empty-page__img empty-page__img--products" />
          </div>
        </div>
      )}
    </section>
  );
};
