import {
  useEffect, useState, useContext, useMemo,
} from 'react';
import { useParams, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './style.scss';
import { getPhoneDetails } from '../../services/phones';
import { iPhoneColors } from '../../utils/iPhoneColors';
import { FavoritesContext } from '../../store/FavoritesContext';
import { CartContext } from '../../store/CartContext';
import { PhonesContext } from '../../store/PhonesContext';
// eslint-disable-next-line max-len
import { ButtonAddFavorites } from '../../components/ButtonAddFavorites/ButtonAddFavorites';
import { ButtonAddCart } from '../../components/ButtonAddCart/ButtonAddCart';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ButtonGoBack } from '../../components/ButtonGoBack/ButtonGoBack';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { PhoneDetails } from '../../types/PhoneDetails';
import { Phone } from '../../types/Phone';
import { Titles } from '../../types/Titles';
import { FullPhoneSpecs, PhoneSpecs } from '../../types/PhoneSpecs';
import { IMG_LINK } from '../../utils/IMG_LINK';

const getColorClass = (
  { isActive }: { isActive: boolean },
) => classNames('product-page__color', {
  'product-page__color--active': isActive,
});

const getCapacityClass = (
  { isActive }: { isActive: boolean },
) => classNames('product-page__capacity', {
  'product-page__capacity--active': isActive,
});

const joinArray = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value;
};

export const ProductPage = () => {
  const { phones } = useContext(PhonesContext);
  const { cartProducts } = useContext(CartContext);
  const { favoritesProducts } = useContext(FavoritesContext);
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [
    currentDetails,
    setCurrentDetails,
  ] = useState<PhoneDetails | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mainPhoto, setMainPhoto] = useState('');

  const { phoneId } = useParams();

  const loadPhoneeDetails = async (phId: string) => {
    setLoading(true);
    setIsError(false);
    try {
      const loadedDetails = await getPhoneDetails(phId);

      setCurrentDetails(loadedDetails);
      setMainPhoto(loadedDetails.images[0]);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phoneId) {
      loadPhoneeDetails(phoneId);
    }
  }, [phoneId]);

  useEffect(() => {
    setIsInCart(cartProducts.some((product) => {
      return phoneId ? phoneId === product.phoneId : false;
    }));

    setIsInFavorites(favoritesProducts.some((product) => {
      return phoneId ? phoneId === product.phoneId : false;
    }));
  }, [phoneId, cartProducts, favoritesProducts]);

  const currentPhone = useMemo(() => {
    return phones.find(phone => phone.phoneId === phoneId) || {} as Phone;
  }, [phones, phoneId]);

  const similarPhones = useMemo(() => {
    const biggerPrice = currentDetails
      ? currentDetails.priceDiscount * 1.3
      : 0;
    const smallerPrice = currentDetails
      ? currentDetails.priceDiscount * 0.7
      : 0;

    return phones.filter(({ price }) => {
      return price >= smallerPrice && price <= biggerPrice;
    });
  }, [currentDetails, phones]);

  return (
    <section className="product-page">
      <div className="product-page__breadcrumbs">
        <Breadcrumbs />
      </div>
      <div className="product-page__back">
        <ButtonGoBack />
      </div>
      {loading && !isError && <Loader />}
      {!loading && isError && <ErrorMessage />}
      {!isError && !loading && currentDetails && (
        <div className="product-page__product">
          <h1 className="product-page__product-title">
            {currentDetails?.name}
          </h1>
          <div className="product-page__extra-photos">
            {currentDetails?.images.map(image => (
              <div
                aria-hidden="true"
                className={classNames('product-page__extra-element', {
                  'product-page__extra-element--active': image === mainPhoto,
                })}
                key={image}
                onClick={() => setMainPhoto(image)}
              >
                <img
                  className="product-page__image"
                  src={`${IMG_LINK}${image}`}
                  alt="iPhone"
                />
              </div>
            ))}
          </div>
          <div className="product-page__main-photo">
            <img
              className="product-page__image-main"
              src={`${IMG_LINK}${mainPhoto}`}
              alt="iPhone"
            />
          </div>

          <div className="product-page__options">
            <p className="product-page__options-title">Available colors</p>
            <div className="product-page__colors">
              {currentDetails?.colorsAvailable.map(color => (
                <NavLink
                  key={color}
                  className={getColorClass}
                  to={`/phones/${currentDetails?.namespaceId}-${currentDetails?.capacity.toLowerCase()}-${color}`}
                  style={({ background: iPhoneColors[color] })}
                />
              ))}
            </div>

            <p className="product-page__options-title">Select capacity</p>
            <div className="product-page__capacities">
              {currentDetails?.capacityAvailable.map(capacity => (
                <NavLink
                  key={capacity}
                  className={getCapacityClass}
                  to={`/phones/${currentDetails?.namespaceId}-${capacity.toLowerCase()}-${currentDetails?.color}`}
                >
                  {capacity}
                </NavLink>
              ))}
            </div>

            <div className="product-page__prices">
              <p className="product-page__sale_price">
                {`$${currentDetails?.priceDiscount}`}
              </p>
              <p className="product-page__full_price">
                {`$${currentDetails?.priceRegular}`}
              </p>
            </div>

            <div className="product-page__buttons">
              <ButtonAddCart
                product={currentPhone}
                isInCart={isInCart}
              />
              <ButtonAddFavorites
                product={currentPhone}
                isInFavorites={isInFavorites}
              />
            </div>
            <div className="product-page__specs">
              {Object.entries(PhoneSpecs).map(([key, value]) => (
                <p className="product-page__param">
                  <span className="product-page__param-title">{key}</span>
                  <span className="product-page__param-value">
                    {currentDetails[value]}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <article className="product-page__about">
            <h2 className="product-page__article-title">About</h2>
            {currentDetails?.description.map(paragraph => (
              <div
                className="product-page__paragraph"
                key={paragraph.title}
              >
                <h3 className="product-page__subtitle">
                  {paragraph.title}
                </h3>
                <p className="product-page__text">
                  {paragraph.text.map(part => (
                    <p className="product-page__text-part" key={part}>
                      {part}
                    </p>
                  ))}
                </p>
              </div>
            ))}
          </article>

          <article className="product-page__tech-specs">
            <h2 className="product-page__article-title">Tech specs</h2>
            {Object.entries(FullPhoneSpecs).map(([key, value]) => (
              <p className="product-page__param">
                <span
                  className="product-page__param-title
               product-page__param-title--article"
                >
                  {key}
                </span>
                <span
                  className="product-page__param-value
               product-page__param-value--article"
                >
                  {joinArray(currentDetails[value])}
                </span>
              </p>
            ))}
          </article>
        </div>
      )}

      <div className="produc-page__slider">
        <ProductSlider
          title={Titles.LIKE}
          products={similarPhones}
        />
      </div>
    </section>
  );
};
