import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import { useCart } from '../Cart/CartContext';
import { useFavourites } from '../FavouritesPage/FavouritesContext';
import { AlsoLike } from '../AlsoLike/AlsoLike';
import './DescriptionPhonesPage.scss';
import { Loader } from '../Loader/Loader';

// 1. ДОДАЛИ ЦЕЙ ІМПОРТ:
import productsData from '/public/api/products.json';

// Визначаємо типи даних
interface PhoneDescription {
  title: string;
  text: string[];
}

interface PhoneData {
  id: string;
  name: string;
  images: string[];
  colorsAvailable: string[];
  color: string;
  capacityAvailable: string[];
  capacity: string;
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  description: PhoneDescription[];
}

// 2. ЗАБРАЛИ interface Props

// 3. ПРИБРАЛИ productsData З ПРОПСІВ
export const DescriptionPhonesPage: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, removeItem } = useCart();
  const { favourites, addToFav } = useFavourites();

  const [phones, setPhones] = useState<PhoneData[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/phones.json`)
      .then(res => res.json())
      .then(data => {
        setPhones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [baseUrl]);

  const findPhone = phones.find(p => p.id === productId);

  // simpleInfo ТЕПЕР ШУКАЄ ТОВАРИ У ФАЙЛІ products.json, А НЕ В ПОРОЖНЬОМУ МАСИВІ
  const simpleInfo = productsData.find(p => p.itemId === productId);

  const isAdded = simpleInfo
    ? cart.some(item => String(item.id) === String(simpleInfo.id))
    : false;
  const isFav = simpleInfo
    ? favourites.some(fav => String(fav.id) === String(simpleInfo.id))
    : false;

  useEffect(() => {
    if (findPhone) {
      setActiveImage(findPhone.images[0]);
    }
  }, [findPhone, productId]);

  if (loading) {
    return <Loader />;
  }

  if (!findPhone) {
    return (
      <div className="container">
        <h2>Phone not found</h2>
      </div>
    );
  }

  const COLOR_MAP: Record<string, string> = {
    gold: '#f5ddc5',
    black: '#000000',
    spaceblack: '#4b4b4b',
    graphite: '#4b4b4b',
    sierrablue: '#9acbea',
    rosegold: 'rgba(246,82,217,0.68)',
    silver: '#e5e5e5',
    midnight: '#3a4a3f',
    red: '#EB5757',
    green: '#a0edc0',
    blue: '#217AFF',
    purple: '#B282D3',
    yellow: '#FAF569',
  };

  const handleCartClick = () => {
    if (!simpleInfo) {
      console.warn('simpleInfo is still undefined! Check products.json for itemId:', productId);
      return;
    }

    if (isAdded) {
      removeItem(String(simpleInfo.id));
    } else {
      addToCart({ ...simpleInfo, id: String(simpleInfo.id), quantity: 1 });
    }
  };

  return (
    <div className="description-phones-page container">
      <button
        type="button"
        className="description-phones-page__back-button"
        onClick={() => navigate(-1)}
      >
        <img
          src={`${baseUrl}/img/icons/Vector (Stroke).png`}
          alt="Back"
          className="description-phones-page__back-button__icon"
        />
        <span className="description-phones-page__back-button__text">Back</span>
      </button>

      <h1 className="description-phones-page__top__title">{findPhone.name}</h1>

      <div className="description-phones-page__top">
        <div className="description-phones-page__top__gallery">
          <div className="description-phones-page__top__gallery__thumbs">
            {findPhone.images.map(img => (
              <img
                key={img}
                src={`${baseUrl}/${img}`}
                className={activeImage === img ? 'active' : ''}
                onClick={() => setActiveImage(img)}
                alt="thumb"
              />
            ))}
          </div>
          <div className="description-phones-page__top__gallery__main">
            <img src={`${baseUrl}/${activeImage}`} alt="main" />
          </div>
        </div>

        <div className="description-phones-page__top__options">
          <div className="description-phones-page__top__options__texts">
            <span className="description-phones-page__top__options__texts__text">
              Available colors
            </span>
            <span className="description-phones-page__top__options__texts__text">
              ID: {simpleInfo?.id || '—'}
            </span>
          </div>
          <div className="description-phones-page__top__options__colors">
            {findPhone.colorsAvailable.map(color => {
              const newId = findPhone.id.replace(findPhone.color, color);
              const isActive = findPhone.color.toLowerCase() === color.toLowerCase();

              return (
                <button
                  key={color}
                  type="button"
                  aria-label={`Color ${color}`}
                  className={`description-phones-page__top__options__button ${
                    isActive ? 'active-color' : ''
                  }`}
                  onClick={() => navigate(`/phones/${newId}`)}
                  style={{ backgroundColor: COLOR_MAP[color] || color }}
                />
              );
            })}
          </div>

          <div className="description-phones-page__top__capacity">
            <p className="description-phones-page__top__capacity__text">
              Select capacity
            </p>
            <div className="description-phones-page__top__capacity__buttons">
              {findPhone.capacityAvailable.map(cap => {
                const newID = findPhone.id.replace(
                  findPhone.capacity.toLowerCase(),
                  cap.toLowerCase(),
                );
                const isActive = findPhone.capacity.toLowerCase() === cap.toLowerCase();

                return (
                  <button
                    key={cap}
                    type="button"
                    className={`description-phones-page__top__capacity__buttons__button ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => navigate(`/phones/${newID}`)}
                  >
                    {cap}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="description-phones-page__top__price">
            <span className="description-phones-page__top__price__discount">
              ${findPhone.priceDiscount}
            </span>
            <span className="description-phones-page__top__price__full">
              ${findPhone.priceRegular}
            </span>
          </div>

          <div className="description-phones-page__top__buttons">
            <button
              type="button"
              className={`description-phones-page__top__buttons__add-to ${
                isAdded
                  ? 'description-phones-page__top__buttons__add-to--active'
                  : ''
              }`}
              onClick={handleCartClick}
            >
              {isAdded ? 'Added' : 'Add to cart'}
            </button>

            <button
              type="button"
              className="description-phones-page__top__buttons__fav"
              onClick={() => simpleInfo && addToFav(simpleInfo)}
            >
              <img
                className="description-phones-page__top__buttons__add-to__icon"
                src={
                  isFav
                    ? `${baseUrl}/img/icons/Favourites Filled (Heart Like).png`
                    : `${baseUrl}/img/icons/Favourites (Heart Like).png`
                }
                alt="Fav"
              />
            </button>
          </div>

          <ul className="description-phones-page__top__specs">
            {[
              ['Screen', findPhone.screen],
              ['Resolution', findPhone.resolution],
              ['Processor', findPhone.processor],
              ['RAM', findPhone.ram],
            ].map(([label, value]) => (
              <li
                key={label}
                className="description-phones-page__top__specs__spec"
              >
                <span className="description-phones-page__top__specs__spec__name">
                  {label}
                </span>
                <span className="description-phones-page__top__specs__spec__value">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="description-phones-page__bottom">
        <div className="description-phones-page__bottom__about">
          <h2>About</h2>
          {findPhone.description.map(section => (
            <div
              key={section.title}
              className="description-phones-page__about__section"
            >
              <h3>{section.title}</h3>
              {section.text.map((paragraph, index) => (
                <p key={`${section.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="description-phones-page__bottom__tech">
          <h2>Tech specs</h2>
          <ul className="description-phones-page__bottom__tech__lists">
            {[
              ['Screen', findPhone.screen],
              ['Resolution', findPhone.resolution],
              ['Processor', findPhone.processor],
              ['RAM', findPhone.ram],
              ['Memory', findPhone.capacity],
              ['Camera', findPhone.camera],
              ['Zoom', findPhone.zoom],
              ['Cell', findPhone.cell.join(', ')],
            ].map(([label, value]) => (
              <li
                key={label}
                className="description-phones-page__bottom__tech__lists__list"
              >
                <span className="description-phones-page__bottom__tech__lists__list__label">
                  {label}
                </span>
                <span className="description-phones-page__bottom__tech__lists__list__value">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AlsoLike favourites={favourites} addToFav={addToFav} />
    </div>
  );
};
