import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from '../../store/hooks';
import { ProductPrecise, capacityAvailableRegEx } from '../../types/Product';
import { getProductByItemId, getProductPrecise } from '../../api/products';
import { Loader } from '../Loader';
import { BASE_URL } from '../../utils/httpClient';
import { colorsRegEx, getColor } from '../../helpers/colorHelper';
import { ProductCardButtons } from '../ProductCardButtons';

import './ProductDetails.scss';

type Props = {
  productItemId: string;
};

export const ProductDetails: React.FC<Props> = ({
  productItemId,
}) => {
  const [productPrecise, setProductPrecise]
    = useState<ProductPrecise | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const { items: products } = useAppSelector(state => state.products);
  const navigate = useNavigate();
  const location = useLocation();

  const product = getProductByItemId(products, productItemId);
  const category = product?.category || '';

  useEffect(() => {
    setIsLoading(true);
    getProductPrecise(productItemId)
      .then((p: ProductPrecise) => {
        setProductPrecise(p);
        setMainImage(p.images[0]);
      })
      .catch(() => {
        navigate('/error', {
          state: { errorMsg: 'Error loading in ProductDetails' },
          replace: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productItemId, navigate]);

  return (
    <div className="ProductDetails">
      {(isLoading || !productPrecise || !product)
        ? (
          <div className="ProductDetails_loader">
            <Loader />
          </div>
        ) : (
          <div className="ProductDetails__container">
            <div className="ProductDetails__path">
              <Link
                to={`/${category}`}
                className="ProductDetails__link ProductDetails__icon icon--home"
              />

              <div className="ProductDetails__icon icon--arrow-right" />

              <Link to="/phones" className="ProductDetails__link">
                {`${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </Link>

              <div className="ProductDetails__icon icon--arrow-right" />

              <div className="ProductDetails__item-info">
                {productPrecise.name}
              </div>
            </div>

            <Link
              to={{
                pathname: `/${product?.category || ''}`,
                search: location.state?.search,
              }}
              className="ProductDetails__link ProductDetails__link-back"
            >
              <div className="ProductDetails__icon icon--arrow-left" />

              <div className="ProductDetails__item-info">Back</div>
            </Link>

            <h1 className="ProductDetails__title">{productPrecise.name}</h1>

            <div className="ProductDetails__info">
              <div className="ProductDetails__images">
                <div className="ProductDetails__image__list">
                  {productPrecise.images.map((image) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setMainImage(image)}
                      className={cn('ProductDetails__image__button', {
                        'ProductDetails__image__button--active':
                          image === mainImage,
                      })}
                    >
                      <img
                        src={BASE_URL + image}
                        alt="product"
                        className="ProductDetails__image
                      ProductDetails__image--aside"
                      />
                    </button>
                  ))}
                </div>

                <img
                  src={BASE_URL + mainImage}
                  alt="product"
                  className="ProductDetails__image ProductDetails__image--main"
                />
              </div>

              <div className="ProductDetails__info__right">
                <div className="ProductDetails__select">
                  <div className="ProductDetails__select__section">
                    <p className="ProductDetails__select__title">
                      Available colors
                    </p>
                    <div className="ProductDetails__select__list">
                      {productPrecise.colorsAvailable.map((color) => {
                        const newPath = productPrecise.id
                          .replace(colorsRegEx, color);

                        return (
                          <Link
                            key={color}
                            to={`/phones/${newPath}`}
                            className={cn('ProductDetails__select__color', {
                              'ProductDetails__select__color--active':
                                productPrecise.color === color,
                            })}
                            style={{ backgroundColor: getColor(color) }}
                            onClick={(event) => {
                              if (productPrecise.color === color) {
                                event.preventDefault();
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <hr className="ProductDetails__select__hr" />

                  <div className="ProductDetails__select__section">
                    <p className="ProductDetails__select__title">
                      Select capacity
                    </p>

                    <div className="ProductDetails__select__list">
                      {productPrecise.capacityAvailable.map((capacity) => {
                        const newCapacity = (
                          capacity.match(capacityAvailableRegEx) || ['']
                        )[0];
                        const newPath = productPrecise.id.replace(
                          capacityAvailableRegEx, newCapacity,
                        );

                        return (
                          <Link
                            key={capacity}
                            to={`/phones/${newPath}`}
                            className={cn('ProductDetails__select__capacity', {
                              'ProductDetails__select__capacity--active':
                                productPrecise.capacity === capacity,
                            })}
                            onClick={(event) => {
                              if (productPrecise.capacity === capacity) {
                                event.preventDefault();
                              }
                            }}
                          >
                            {capacity}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="ProductDetails__select__hr" />

                  <div className="ProductDetails__cost">
                    <div className="ProductDetails__cost--discount">
                      {`$${productPrecise.priceDiscount}`}
                    </div>

                    <div className="ProductDetails__cost--fullPrice">
                      {`$${productPrecise.priceRegular}`}
                    </div>
                  </div>

                  <ProductCardButtons product={product} />

                  <div className="ProductDetails__properties">
                    <div className="ProductDetails__property">
                      <div className="ProductDetails__property--normal">
                        Screen
                      </div>
                      <div className="ProductDetails__property--strong">
                        {productPrecise.screen}
                      </div>
                    </div>

                    <div className="ProductDetails__property">
                      <div className="ProductDetails__property--normal">
                        Resolution
                      </div>
                      <div className="ProductDetails__property--strong">
                        {productPrecise.resolution}
                      </div>
                    </div>

                    <div className="ProductDetails__property">
                      <div className="ProductDetails__property--normal">
                        Processor
                      </div>
                      <div className="ProductDetails__property--strong">
                        {productPrecise.processor}
                      </div>
                    </div>

                    <div className="ProductDetails__property">
                      <div className="ProductDetails__property--normal">
                        Ram
                      </div>
                      <div className="ProductDetails__property--strong">
                        {productPrecise.ram}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ProductDetails__ID">{`ID:${product?.id || '0'}`}</div>
              </div>
            </div>

            <div className="ProductDetails__info">
              <div
                className="ProductDetails__info__about
              ProductDetails__info__left"
              >
                <h2 className="ProductDetails__info__title">
                  About
                </h2>

                <hr className="ProductDetails__info__section__hr" />

                <h3
                  className="ProductDetails__info__section__title
                ProductDetails__info__section__title--about"
                >
                  {productPrecise.description[0].title}
                </h3>

                <p className="ProductDetails__info__section__text">
                  {productPrecise.description[0].text[0]}
                </p>
                <br />
                <p className="ProductDetails__info__section__text">
                  {productPrecise.description[0].text[1]}
                </p>

                <h3
                  className="ProductDetails__info__section__title
                ProductDetails__info__section__title--about"
                >
                  {productPrecise.description[1].title}
                </h3>

                <p className="ProductDetails__info__section__text">
                  {productPrecise.description[1].text[0]}
                </p>
                <br />
                <p className="ProductDetails__info__section__text">
                  {productPrecise.description[1].text[1]}
                </p>

                <h3
                  className="ProductDetails__info__section__title
                ProductDetails__info__section__title--about"
                >
                  {productPrecise.description[2].title}
                </h3>

                <p className="ProductDetails__info__section__text">
                  {productPrecise.description[2].text[0]}
                </p>
                <br />
                <p className="ProductDetails__info__section__text">
                  {productPrecise.description[2].text[1]}
                </p>
              </div>

              <div
                className="ProductDetails__info__right
              ProductDetails__info__tech-specs"
              >
                <h2 className="ProductDetails__info__title">
                  Tech specs
                </h2>

                <hr className="ProductDetails__info__section__hr" />

                <div className="ProductDetails__properties">
                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Screen
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.screen}
                    </div>
                  </div>

                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Resolution
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.resolution}
                    </div>
                  </div>

                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Processor
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.processor}
                    </div>
                  </div>

                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Ram
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.ram}
                    </div>
                  </div>

                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Built in memory
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.capacity}
                    </div>
                  </div>

                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Camera
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.camera}
                    </div>
                  </div>

                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Zoom
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.zoom}
                    </div>
                  </div>

                  <div className="ProductDetails__property">
                    <div className="ProductDetails__property--normal">
                      Cell
                    </div>
                    <div className="ProductDetails__property--strong">
                      {productPrecise.cell}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
