import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import { AlsoLike } from '../AlsoLike/AlsoLike';
import { useFavourites } from '../FavouritesPage/FavouritesContext';
import { useCart } from '../Cart/CartContext';
import './DescriptionAccessoriesPage.scss';

// 1. ДОДАНО ІМПОРТ НАПРЯМУ
import productsData from '/public/api/products.json';

interface AccessoryDescription {
  title: string;
  text: string[];
}

interface AccessoryData {
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
  description: AccessoryDescription[];
}

// 2. ЗАБРАНО interface Props

// 3. ЗАБРАНО productsData З ПРОПСІВ
export const DescriptionAccessoriesPage: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, removeItem } = useCart();
  const { favourites, addToFav } = useFavourites();

  const [accessories, setAccessories] = useState<AccessoryData[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/accessories.json`)
      .then(res => res.json())
      .then(data => {
        setAccessories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching accessories:', err);
        setLoading(false);
      });
  }, [baseUrl]);

  const findAcc = accessories.find(acc => acc.id === productId);

  // 4. ТЕПЕР simpleInfo БЕРЕТЬСЯ З ІМПОРТУ
  const simpleInfo = productsData.find(p => p.itemId === productId);

  useEffect(() => {
    if (findAcc) {
      setActiveImage(findAcc.images[0]);
    }
  }, [findAcc, productId]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!findAcc) {
    return (
      <div className="container">
        <h2>Not found</h2>
      </div>
    );
  }

  const isFav = simpleInfo
    ? favourites.some(fav => String(fav.id) === String(simpleInfo.id))
    : false;
  const isAdded = simpleInfo
    ? cart.some(c => String(c.id) === String(simpleInfo.id))
    : false;

  const COLOR_MAP: Record<string, string> = {
    gold: '#f5ddc5',
    black: '#000000',
    silver: '#e5e5e5',
    red: '#EB5757',
    blue: '#217AFF',
    purple: '#B282D3',
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
    <div className="description-accessories-page container">
      <button
        type="button"
        className="description-accessories-page__back-button"
        onClick={() => navigate(-1)}
      >
        <img
          src={`${baseUrl}/img/icons/Vector (Stroke).png`}
          alt="Back"
          className="description-accessories-page__back-button__icon"
        />
        <span className="description-accessories-page__back-button__text">Back</span>
      </button>

      <h1 className="description-accessories-page__top__title">
        {findAcc.name}
      </h1>

      <div className="description-accessories-page__top">
        <div className="description-accessories-page__top__gallery">
          <div className="description-accessories-page__top__gallery__thumbs">
            {findAcc.images.map(img => (
              <img
                key={img}
                src={`${baseUrl}/${img}`}
                className={activeImage === img ? 'active' : ''}
                onClick={() => setActiveImage(img)}
                alt="thumb"
              />
            ))}
          </div>
          <div className="description-accessories-page__top__gallery__main">
            <img src={`${baseUrl}/${activeImage}`} alt="main" />
          </div>
        </div>

        <div className="description-accessories-page__top__options">
          <div className="description-accessories-page__top__options__texts">
            <span className="description-accessories-page__top__options__texts__text">
              Available colors
            </span>
            <span className="description-accessories-page__top__options__texts__text">
              ID: {simpleInfo?.id || '—'}
            </span>
          </div>

          <div className="description-accessories-page__top__options__colors">
            {findAcc.colorsAvailable.map(color => {
              const newId = findAcc.id.replace(findAcc.color, color);
              const isActive = findAcc.color.toLowerCase() === color.toLowerCase();

              return (
                <button
                  key={color}
                  type="button"
                  aria-label={color}
                  className={`description-accessories-page__top__options__button ${
                    isActive ? 'active-color' : ''
                  }`}
                  onClick={() => navigate(`/accessories/${newId}`)}
                  style={{ backgroundColor: COLOR_MAP[color] || color }}
                />
              );
            })}
          </div>

          <div className="description-accessories-page__top__capacity">
            <p className="description-accessories-page__top__capacity__text">
              Select capacity
            </p>
            <div className="description-accessories-page__top__capacity__buttons">
              {findAcc.capacityAvailable.map(cap => {
                const newID = findAcc.id.replace(
                  findAcc.capacity.toLowerCase(),
                  cap.toLowerCase(),
                );
                const isActive = findAcc.capacity.toLowerCase() === cap.toLowerCase();

                return (
                  <button
                    key={cap}
                    type="button"
                    className={`description-accessories-page__top__capacity__buttons__button ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => navigate(`/accessories/${newID}`)}
                  >
                    {cap}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="description-accessories-page__top__price">
            <span className="description-accessories-page__top__price__discount">
              ${findAcc.priceDiscount}
            </span>
            <span className="description-accessories-page__top__price__full">
              ${findAcc.priceRegular}
            </span>
          </div>

          <div className="description-accessories-page__top__buttons">
            <button
              type="button"
              className={`description-accessories-page__top__buttons__add-to ${
                isAdded
                  ? 'description-accessories-page__top__buttons__add-to--active'
                  : ''
              }`}
              onClick={handleCartClick}
            >
              {isAdded ? 'Added' : 'Add to cart'}
            </button>

            <button
              type="button"
              className="description-accessories-page__top__buttons__fav"
              onClick={() => simpleInfo && addToFav(simpleInfo)}
            >
              <img
                className="description-accessories-page__top__buttons__add-to__icon"
                src={
                  isFav
                    ? `${baseUrl}/img/icons/Favourites Filled (Heart Like).png`
                    : `${baseUrl}/img/icons/Favourites (Heart Like).png`
                }
                alt="Fav"
              />
            </button>
          </div>

          <ul className="description-accessories-page__top__specs">
            {[
              ['Screen', findAcc.screen],
              ['Resolution', findAcc.resolution],
              ['Processor', findAcc.processor],
              ['RAM', findAcc.ram],
            ].map(([label, value]) => (
              <li
                key={label}
                className="description-accessories-page__top__specs__spec"
              >
                <span className="description-accessories-page__top__specs__spec__name">
                  {label}
                </span>
                <span className="description-accessories-page__top__specs__spec__value">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="description-accessories-page__bottom">
        <div className="description-accessories-page__bottom__about">
          <h2>About</h2>
          {findAcc.description.map(section => (
            <div
              key={section.title}
              className="description-accessories-page__about__section"
            >
              <h3>{section.title}</h3>
              {section.text.map((paragraph, index) => (
                <p key={`${section.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="description-accessories-page__bottom__tech">
          <h2>Tech specs</h2>
          <ul className="description-accessories-page__bottom__tech__lists">
            {[
              ['Screen', findAcc.screen],
              ['Resolution', findAcc.resolution],
              ['Processor', findAcc.processor],
              ['RAM', findAcc.ram],
              ['Built in memory', findAcc.capacity],
            ].map(([label, value]) => (
              <li
                key={label}
                className="description-accessories-page__bottom__tech__lists__list"
              >
                <span className="description-accessories-page__bottom__tech__lists__list__label">
                  {label}
                </span>
                <span className="description-accessories-page__bottom__tech__lists__list__value">
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
