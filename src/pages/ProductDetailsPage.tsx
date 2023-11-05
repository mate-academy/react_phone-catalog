import { useEffect } from 'react';
import {
  Link,
  useLocation,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../types/Phone';
import { Loader } from '../components/Loader';
import { ProductsSlider } from '../components/ProductsSlider';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Back } from '../components/Back';
import { CardButtons } from '../components/CardButtons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init as initProduct, setImage } from '../features/product';
import { init as initPhones } from '../features/phones';

type UsableColorType = {
  black: string,
  coral: string,
  gold: string,
  green: string,
  midnightgreen: string,
  purple: string,
  red: string,
  rosegold: string,
  silver: string,
  spacegray: string,
  white: string,
  yellow: string,
};
const usableColors: UsableColorType = {
  black: '#000',
  coral: '#FF7F50',
  gold: '#FCDBC1',
  green: '#87CEFA',
  midnightgreen: '#5F7170',
  purple: '#CBB1FF',
  red: '#F00',
  rosegold: '#FCBAAA',
  silver: '#C0C0C0',
  spacegray: '#4C4C4C',
  white: '#FFF',
  yellow: 'yellow',
};

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { phones } = useAppSelector(state => state.phones);
  const {
    product,
    loading,
    error,
    mainImage,
  } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const card = phones.find((item: Phone) => item.phoneId === productId);

  useEffect(() => {
    if (!productId) {
      return;
    }

    dispatch(initPhones());
    dispatch(initProduct(productId));
  }, [productId, dispatch]);

  const handleColor = (color: string) => {
    if (!product) {
      return '..';
    }

    return `/phones/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;
  };

  const handleCapacity = (capacity: string) => {
    if (!product) {
      return '..';
    }

    return `/phones/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;
  };

  return (
    <>
      {error && (
        <main className="main main--not-found">
          <h1 className="main__title main__title--development">
            Phone was not found
          </h1>
          <div className="main__text">
            Perhaps you would like to navigate to the
            <Link to={{ pathname: '/' }}>
              <span className="main__span"> Home page </span>
            </Link>
            ?
          </div>
        </main>
      )}
      {!error && loading && (<Loader />)}
      {!error && !loading && product && (
        <main className="main main--page">
          <div className="main__header">
            <Breadcrumbs currentPage={product.name} />
            <Back />
            <h1 className="main__title">{product.name}</h1>
          </div>

          <section className="main__section detail">
            <ul className="detail__list">
              {product.images.map(image => (
                <li key={image} className="detail__item">
                  <Link
                    to={{ pathname }}
                    className={classNames(
                      'detail__link',
                      { 'detail__link--selected': image === mainImage },
                    )}
                    onClick={() => dispatch(setImage(image))}
                  >
                    <img
                      src={`./new/${image}`}
                      alt={image}
                      className="detail__image"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="detail__main-image-wrapper">
              <img
                src={`./new/${mainImage}`}
                alt={mainImage}
                className="detail__main-image"
              />
            </div>

            <div className="detail__info">
              <div className="detail__wrapper">
                <div className="detail__text">Available colors</div>
                <div className="detail__colors">
                  {product.colorsAvailable.map(color => (
                    <Link
                      to={{ pathname: handleColor(color) }}
                      className={classNames(
                        'detail__color',
                        { 'detail__color--active': product.color === color },
                      )}
                      key={color}
                    >
                      <span
                        className="detail__circle"
                        style={{
                          backgroundColor:
                            usableColors[color as keyof UsableColorType],
                        }}
                      />
                    </Link>
                  ))}
                </div>
                <div className="detail__line" />
              </div>

              <div className="detail__wrapper">
                <div className="detail__text">Select capacity</div>
                <div className="detail__capacities">
                  {product.capacityAvailable.map(capacity => (
                    <Link
                      to={{ pathname: handleCapacity(capacity) }}
                      key={capacity}
                      className={classNames(
                        'detail__capacity',
                        {
                          'detail__capacity--active':
                            product.capacity === capacity,
                        },
                      )}
                    >
                      {capacity.replace('GB', ' GB')}
                    </Link>
                  ))}
                </div>
                <div className="detail__line" />
              </div>
              <div className="detail__price-block">
                <div className="detail__prices">
                  <div className="detail__price">
                    {`$${product.priceDiscount}`}
                  </div>
                  <div className="detail__full-price">
                    {`$${product.priceRegular}`}
                  </div>
                </div>
                {card && (
                  <CardButtons card={card} info="detail" />
                )}
              </div>
              <div className="detail__chars">
                <div className="detail__char">
                  <div className="detail__char-name">Screen</div>
                  <div className="detail__param">{product.screen}</div>
                </div>
                <div className="detail__char">
                  <div className="detail__char-name">Resolution</div>
                  <div className="detail__param">
                    {product.resolution}
                  </div>
                </div>
                <div className="detail__char">
                  <div className="detail__char-name">Processor</div>
                  <div className="detail__param">
                    {product.processor}
                  </div>
                </div>
                <div className="detail__char">
                  <div className="detail__char-name">RAM</div>
                  <div className="detail__param">
                    {product.ram.replace('GB', ' GB')}
                  </div>
                </div>
              </div>
            </div>
            <div className="detail__id" />
            <div data-cy="productDescription" className="detail__product-left">
              <h2 className="detail__title">
                About
              </h2>
              <div className="detail__about">
                <div className="detail__line" />
                {product.description.map(desc => {
                  const { text, title } = desc;

                  return (
                    <div key={title}>
                      <div className="detail__subtitle">{title}</div>
                      <div className="detail__description">{text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="detail__product-right">
              <h2
                className="detail__title"
              >
                Tech specs
              </h2>

              <div className="detail__line" />
              <ul className="detail__list-tech">
                <li className="detail__item-tech">
                  <div className="detail__description">Screen</div>
                  <div>
                    {product.screen}
                  </div>
                </li>
                <li className="detail__item-tech">
                  <div className="detail__description">Resolution</div>
                  <div>
                    {product.resolution}
                  </div>
                </li>
                <li className="detail__item-tech">
                  <div className="detail__description">Processor</div>
                  <div>
                    {product.processor}
                  </div>
                </li>
                <li className="detail__item-tech">
                  <div className="detail__description">RAM</div>
                  <div>
                    {product.ram}
                  </div>
                </li>
                <li className="detail__item-tech">
                  <div className="detail__description">Built in memory</div>
                  <div>
                    {product.capacity}
                  </div>
                </li>
                <li className="detail__item-tech">
                  <div className="detail__description">Camera</div>
                  <div>
                    {product.camera}
                  </div>
                </li>
                <li className="detail__item-tech">
                  <div className="detail__description">Zoom</div>
                  <div>
                    {product.zoom}
                  </div>
                </li>
                <li className="detail__item-tech">
                  <div className="detail__description">Cell</div>
                  <div>
                    {product.cell.join(', ')}
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="main__section">
            <ProductsSlider section="You may also like" />
          </section>
        </main>
      )}
    </>
  );
};
