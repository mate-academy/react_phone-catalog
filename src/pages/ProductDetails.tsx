import classNames from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TitleOfPage } from '../components/TitleOfPage';
import { ProductDetailsImages } from '../components/ProductDetailsImages';
import { Loader } from '../components/Loader';
import { ProductSlider } from '../components/ProductSlider';
import { SliderTitles } from '../enum/SliderTitles';
import { useFetch } from '../hooks/useFetch';
import { Fetch } from '../enum/Fetch';
import { getProduct } from '../utils/fetchClient';
import { PhoneInfo } from '../types/PhoneInfo';
import { StoragesContext } from '../Context/StoragesContext';
import { ButtonAndLike } from '../components/ButtonAndLike/ButtonAndLike';
import { ButtonsSize } from '../enum/ButtonsSize';
import '../components/ProductDetails/ProductDetails.scss';
import { NotFoundPage } from '../components/NotFoundPage/NotFoundPage';

export const ProductDetails: React.FC = () => {
  const [phones, isLoadingHot, isErrorHot] = useFetch(Fetch.hotProducts);
  const [phone, setPhone] = useState<PhoneInfo | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { state } = useLocation();
  const { id } = useParams();
  const isArrow = useRef<boolean>(true);
  const phoneId = id || '';

  const {
    addedProducts,
    handleAddToCart,
    handleAddToLikeStorage,
  } = useContext(StoragesContext);

  const handleChangingColor = (color: string) => {
    return `/phones/${phone?.namespaceId}-${phone?.capacity.toLowerCase()}-${color.toLowerCase()}`;
  };

  const handleChangingCapacity = (capacity: string) => {
    return `/phones/${phone?.namespaceId}-${capacity.toLowerCase()}-${phone?.color.toLowerCase()}`;
  };

  const handleColorIdentification = (color: string) => {
    if (color === 'spacegray') {
      return '#5f5f5f';
    }

    if (color === 'midnightgreen') {
      return '#004953';
    }

    return color;
  };

  useEffect(() => {
    setIsLoading(true);

    getProduct(phoneId)
      .then(setPhone)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="page__container">
      <Breadcrumbs
        currentPageTitle={phone ? state?.name : 'Phone was not found'}
      />

      {isLoading && !isError && <Loader />}

      {!phone && !isLoading && (
        <NotFoundPage title="Phone was not found" />)}

      {phone && !isLoading && !isError && (
        <>
          <div className="page__section">
            <TitleOfPage
              title={phone.name}
              prevSearchParam={state?.prevSearchParam}
              backArrow={isArrow.current}
            />
          </div>

          <section className="product-header">
            <ProductDetailsImages images={phone.images} />

            <div className="product-header__buy-container">
              <div className="colors">
                <h3 className="colors__title">
                  Available colors
                </h3>

                <div className="colors__container">
                  {phone.colorsAvailable.map(color => (
                    <div
                      className={classNames(
                        'colors__circle-border',
                        {
                          'colors__circle-border--is-active':
                            phone.color === color,
                        },
                      )}
                      key={color}
                    >
                      <Link
                        to={{ pathname: handleChangingColor(color) }}
                        style={{
                          backgroundColor: handleColorIdentification(color),
                          border: color === 'white'
                            ? '1px solid $elements-color'
                            : '',
                        }}
                        className="colors__circle-color-button"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="capacity">
                <h3 className="product-header__title">
                  Select capacity
                </h3>

                <div className="capacity__container">
                  {phone.capacityAvailable.map(capacity => (
                    <Link
                      to={{ pathname: handleChangingCapacity(capacity) }}
                      className={classNames(
                        'capacity__value',
                        {
                          'capacity__value--is-active':
                            phone.capacity === capacity,
                        },
                      )}
                      key={capacity}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="buy-it-now">
                <div className="buy-it-now__price-container">
                  <h2 className="buy-it-now__reg-price">
                    {`$${phone.priceRegular}`}
                  </h2>

                  <h2 className="buy-it-now__disc-price">
                    {`$${phone.priceDiscount}`}
                  </h2>
                </div>

                {!addedProducts.includes(phoneId) ? (
                  <ButtonAndLike
                    size={ButtonsSize.bigOn}
                    handleLike={handleAddToLikeStorage}
                    handleAdd={handleAddToCart}
                    phoneId={phoneId}
                  />
                ) : (
                  <ButtonAndLike
                    size={ButtonsSize.bigOff}
                    handleLike={handleAddToLikeStorage}
                    phoneId={phoneId}
                  />
                )}
              </div>

              <ul className="desc-list">
                <li className="desc-item">
                  <p className="desc-item__title desc-item__title--gray">
                    Screen
                  </p>

                  <p className="desc-item__title">
                    {phone.screen}
                  </p>
                </li>

                <li className="desc-item">
                  <p className="desc-item__title desc-item__title--gray">
                    Resolution
                  </p>

                  <p className="desc-item__title">
                    {phone.resolution}
                  </p>
                </li>

                <li className="desc-item">
                  <p className="desc-item__title desc-item__title--gray">
                    Processor
                  </p>

                  <p className="desc-item__title">
                    {phone.processor}
                  </p>
                </li>

                <li className="desc-item">
                  <p className="desc-item__title desc-item__title--gray">
                    RAM
                  </p>

                  <p className="desc-item__title">
                    {phone.ram}
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <section className="product-desc">
            <div className="product-desc__about">
              <div className="product-desc__title-container">
                <h2 className="product-desc__title">
                  About
                </h2>
              </div>
              {phone.description.map(desc => (
                <article className="article" key={desc.title}>
                  <h3 className="article__title">
                    {desc.title}
                  </h3>
                  {desc.text.map(text => (
                    <p className="article__desc" key={text}>
                      {text}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <div className="product-desc__tech-specs">
              <div className="product-desc__title-container">
                <h2 className="product-desc__title">
                  Tech specs
                </h2>
              </div>

              <article className="article">
                <ul className="desc-list">
                  <li className="desc-item">
                    <p className="desc-item__title desc-item__title--gray">
                      Screen
                    </p>

                    <p className="desc-item__title">
                      {phone.screen}
                    </p>
                  </li>

                  <li className="desc-item">
                    <p className="desc-item__title desc-item__title--gray">
                      Resolution
                    </p>

                    <p className="desc-item__title">
                      {phone.resolution}
                    </p>
                  </li>

                  <li className="desc-item">
                    <p className="desc-item__title desc-item__title--gray">
                      Processor
                    </p>

                    <p className="desc-item__title">
                      {phone.processor}
                    </p>
                  </li>

                  <li className="desc-item">
                    <p className="desc-item__title desc-item__title--gray">
                      RAM
                    </p>

                    <p className="desc-item__title">
                      {phone.ram}
                    </p>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <ProductSlider
            phones={phones}
            title={SliderTitles.suggestions}
            isError={isErrorHot}
            isLoading={isLoadingHot}
          />
        </>
      )}
    </div>
  );
};
