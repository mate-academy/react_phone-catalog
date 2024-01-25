import { useContext, useEffect, useState } from 'react';
import {
  Link, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';

import {
  BreadCrumbs, ProductSlider, Spinner, Notification, Back, ImagesGallery,
  AddToCart, AddToFavorite, Characteristics,
} from '../../libs/components';
import {
  StateContext,
} from '../../libs/components/state-provider/state-context';
import {
  ProductsFilters, PAGE_RELOAD_DELAY, PRODUCT_COLORS,
} from '../../libs/enums';
import {
  getOptionsPath, getProductsByCategory, getFormattedGBString,
} from '../../libs/helpers';
import {
  productServices as services,
} from '../../libs/services/product-services';
import { ProductDetailType } from '../../libs/types';

export const ProductDetailPage: React.FC = () => {
  const { products } = useContext(StateContext);
  const { pathname } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [productDetail, setProductDetail]
    = useState<ProductDetailType | null>(null);

  const suggestedProducts = getProductsByCategory(
    products,
    ProductsFilters.SUGGESTED,
  );

  const product = products.find(item => item.itemId === productId);

  useEffect(() => {
    setErrorMessage('');
    setProductDetail(null);

    if (!productId) {
      return;
    }

    services.getProductDetail(productId)
      .then(setProductDetail)
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          navigate('..');
        }, PAGE_RELOAD_DELAY);
      });
  }, [navigate, productId]);

  if (errorMessage) {
    return <Notification message={errorMessage} />;
  }

  if (!product) {
    return null;
  }

  if (!productDetail) {
    return <Spinner />;
  }

  const {
    name,
    images,
    color,
    capacity,
    colorsAvailable,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    description,
  } = productDetail;

  return (
    <main className="detail">
      <div className="detail__container">
        <BreadCrumbs pageTitle={name} />

        <div className="detail__top">
          <Back className="detail__back" />
          <h1>{name}</h1>
        </div>

        <article className="detail__content">
          <ImagesGallery
            className="detail__images-gallery"
            images={images}
          />

          <section className="detail__main-info">
            <div className="detail__main-info-left">
              <div className="detail__options">
                <div className="detail__option">
                  <h4 className="detail__lable">
                    Available colors
                  </h4>

                  <ul className="detail__option-list">
                    {colorsAvailable.map(availableColor => (
                      <li
                        key={availableColor}
                        className={classNames(
                          'detail__option-item detail__option-item--color', {
                            'detail__option-item--selected':
                              availableColor === color,
                          },
                        )}
                      >
                        <Link
                          to={getOptionsPath(pathname, color, availableColor)}
                          style={{
                            backgroundColor: PRODUCT_COLORS[availableColor],
                          }}
                          state={{ pathname }}
                          className="detail__option-link"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="detail__option">
                  <h4 className="detail__lable">
                    Select capacity
                  </h4>

                  <ul className="detail__option-list">
                    {capacityAvailable.map(availableCapacity => (
                      <li
                        key={availableCapacity}
                        className={classNames(
                          'detail__option-item detail__option-item--capacity', {
                            'detail__option-item--selected':
                              availableCapacity === capacity,
                          },
                        )}
                      >
                        <Link
                          to={getOptionsPath(
                            pathname,
                            capacity,
                            availableCapacity,
                          )}
                          state={{ pathname }}
                          className="detail__option-link"
                        >
                          {getFormattedGBString(availableCapacity)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="detail__info">

                <div className="detail__controls">
                  <div className="detail__prices">
                    <div className="detail__new-price">
                      {`$${priceDiscount}`}
                    </div>
                    <div className="detail__old-price">
                      {`$${priceRegular}`}
                    </div>
                  </div>

                  <div className="detail__buttons">
                    <AddToCart
                      product={product}
                      className="detail__btn-add-to-cart"
                    />

                    <AddToFavorite
                      product={product}
                      className="detail__btn-add-to-favorite"
                    />
                  </div>
                </div>

                <Characteristics characteristics={{
                  screen,
                  resolution,
                  processor,
                  ram,
                }}
                />
              </div>
            </div>

            <div className="detail__main-info-right">
              {`ID: ${product?.id}`}
            </div>
          </section>

          <section className="detail__about" data-cy="productDescription">
            <h2 className="detail__section-title">About</h2>
            <div className="detail__description">
              {description.map(({ title, text }) => (
                <div
                  key={title}
                  className="detail__description-content"
                >
                  <h3 className="detail__description-title">{title}</h3>

                  {text.map(item => (
                    <p
                      key={item}
                      className="detail__description-text"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="detail__tech-specs">
            <h2 className="detail__section-title">Tech specs</h2>

            <Characteristics
              className="detail__characteristics"
              characteristics={{
                screen,
                resolution,
                processor,
                ram,
                capacity,
                camera,
                zoom,
                cell,
              }}
            />
          </section>
        </article>

        <ProductSlider
          products={suggestedProducts}
          title="You may also like"
        />
      </div>
    </main>
  );
};
