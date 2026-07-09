import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import { AlsoLike } from '../AlsoLike/AlsoLike';
import { useFavourites } from '../FavouritesPage/FavouritesContext';
import { useCart } from '../Cart/CartContext';
import './DescriptionTabletsPage.scss';
import productsData from '/public/api/products.json'; // 1. ДОДАНО ІМПОРТ

// Інтерфейси для типізації
interface TabletDescription {
  title: string;
  text: string[];
}

interface TabletData {
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
  description: TabletDescription[];
}

// 2. ПРИБРАНО interface Props

// 3. ЗАБРАНО productsData З ПРОПСІВ
export const DescriptionTabletsPage: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { favourites, addToFav } = useFavourites();
  const { cart, addToCart, removeItem } = useCart();

  const [tablets, setTablets] = useState<TabletData[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.BASE_URL;

  // 1. Завантаження даних
  useEffect(() => {
    fetch(`${baseUrl}/api/tablets.json`)
      .then(res => res.json())
      .then(data => {
        setTablets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tablets:', err);
        setLoading(false);
      });
  }, [baseUrl]);

  const findTablet = tablets.find(t => t.id === productId);
  // 4. ТЕПЕР simpleInfo БЕРЕТЬСЯ НАПРЯМУ З ІМПОРТОВАНОГО ФАЙЛУ
  const simpleInfo = productsData.find(p => p.itemId === productId);

  useEffect(() => {
    if (findTablet) {
      setActiveImage(findTablet.images[0]);
    }
  }, [findTablet, productId]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!findTablet) {
    return (
      <div className="container">
        <h2>Tablet not found</h2>
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

  const isFav = simpleInfo
    ? favourites.some(fav => String(fav.id) === String(simpleInfo.id))
    : false;
  const isAdded = simpleInfo
    ? cart.some(c => String(c.id) === String(simpleInfo.id))
    : false;

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
    <div className="description-tablets-page container">
      <button
        type="button"
        className="description-tablets-page__back-button"
        onClick={() => navigate(-1)}
      >
        <img
          src={`${baseUrl}/img/icons/Vector (Stroke).png`}
          alt="Back"
          className="description-tablets-page__back-button__icon"
        />
        <span className="description-tablets-page__back-button__text">Back</span>
      </button>

      <h1 className="description-tablets-page__top__title">
        {findTablet.name}
      </h1>

      <div className="description-tablets-page__top">
        {/* ГАЛЕРЕЯ */}
        <div className="description-tablets-page__top__gallery">
          <div className="description-tablets-page__top__gallery__thumbs">
            {findTablet.images.map(img => (
              <img
                key={img}
                src={`${baseUrl}/${img}`}
                className={activeImage === img ? 'active' : ''}
                onClick={() => setActiveImage(img)}
                alt="thumb"
              />
            ))}
          </div>
          <div className="description-tablets-page__top__gallery__main">
            <img src={`${baseUrl}/${activeImage}`} alt="main" />
          </div>
        </div>

        {/* ОПЦІЇ */}
        <div className="description-tablets-page__top__options">
          <div className="description-tablets-page__top__options__texts">
            <span className="description-tablets-page__top__options__texts__text">
              Available colors
            </span>
            <span className="description-tablets-page__top__options__texts__text">
              ID: {simpleInfo?.id || '—'}
            </span>
          </div>

          <div className="description-tablets-page__top__options__colors">
            {findTablet.colorsAvailable.map(color => {
              const newId = findTablet.id.replace(findTablet.color, color);
              const isActive = findTablet.color.toLowerCase() === color.toLowerCase();

              return (
                <button
                  key={color}
                  type="button"
                  aria-label={color}
                  className={`description-tablets-page__top__options__button ${
                    isActive ? 'active-color' : ''
                  }`}
                  onClick={() => navigate(`/tablets/${newId}`)}
                  style={{ backgroundColor: COLOR_MAP[color] || color }}
                />
              );
            })}
          </div>

          <div className="description-tablets-page__top__capacity">
            <p className="description-tablets-page__top__capacity__text">
              Select capacity
            </p>
            <div className="description-tablets-page__top__capacity__buttons">
              {findTablet.capacityAvailable.map(cap => {
                const newID = findTablet.id.replace(
                  findTablet.capacity.toLowerCase(),
                  cap.toLowerCase(),
                );
                const isActive = findTablet.capacity.toLowerCase() === cap.toLowerCase();

                return (
                  <button
                    key={cap}
                    type="button"
                    className={`description-tablets-page__top__capacity__buttons__button ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => navigate(`/tablets/${newID}`)}
                  >
                    {cap}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="description-tablets-page__top__price">
            <span className="description-tablets-page__top__price__discount">
              ${findTablet.priceDiscount}
            </span>
            <span className="description-tablets-page__top__price__full">
              ${findTablet.priceRegular}
            </span>
          </div>

          <div className="description-tablets-page__top__buttons">
            <button
              type="button"
              className={`description-tablets-page__top__buttons__add-to ${
                isAdded
                  ? 'description-tablets-page__top__buttons__add-to--active'
                  : ''
              }`}
              onClick={handleCartClick}
            >
              {isAdded ? 'Added' : 'Add to cart'}
            </button>

            <button
              type="button"
              className="description-tablets-page__top__buttons__fav"
              onClick={() => simpleInfo && addToFav(simpleInfo)}
            >
              <img
                className="description-tablets-page__top__buttons__add-to__icon"
                src={
                  isFav
                    ? `${baseUrl}/img/icons/Favourites Filled (Heart Like).png`
                    : `${baseUrl}/img/icons/Favourites (Heart Like).png`
                }
                alt="Fav"
              />
            </button>
          </div>

          <ul className="description-tablets-page__top__specs">
            {[
              ['Screen', findTablet.screen],
              ['Resolution', findTablet.resolution],
            ].map(([label, value]) => (
              <li
                key={label}
                className="description-tablets-page__top__specs__spec"
              >
                <span className="description-tablets-page__top__specs__spec__name">
                  {label}
                </span>
                <span className="description-tablets-page__top__specs__spec__value">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="description-tablets-page__bottom">
        <div className="description-tablets-page__bottom__about">
          <h2>About</h2>
          {findTablet.description.map(section => (
            <div
              key={section.title}
              className="description-tablets-page__about__section"
            >
              <h3>{section.title}</h3>
              {section.text.map((paragraph, index) => (
                <p key={`${section.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="description-tablets-page__bottom__tech">
          <h2>Tech specs</h2>
          <ul className="description-tablets-page__bottom__tech__lists">
            {[
              ['Screen', findTablet.screen],
              ['Processor', findTablet.processor],
              ['RAM', findTablet.ram],
            ].map(([label, value]) => (
              <li
                key={label}
                className="description-tablets-page__bottom__tech__lists__list"
              >
                <span className="description-tablets-page__bottom__tech__lists__list__label">
                  {label}
                </span>
                <span className="description-tablets-page__bottom__tech__lists__list__value">
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
