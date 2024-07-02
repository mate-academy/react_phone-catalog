import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { CardPhone } from '../../cardPhone';
import './PhoneDetailPage.scss';
import { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import phones from '../../api/phones.json';
import tablets from '../../api/tablets.json';
import accessories from '../../api/accessories.json';
import cn from 'classnames';

interface Props {
  likeItems: CardPhone[];
  cartItems: CardPhone[];
  addCartItems: (a: CardPhone) => void;
  addFavouritesItems: (b: CardPhone) => void;
}

export const PhoneDetailPage = ({
  likeItems,
  cartItems,
  addCartItems,
  addFavouritesItems,
}: Props) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState<CardPhone>();
  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [activeCapacity, setActiveCapacity] = useState<string | undefined>();
  const [activeColor, setActiveColor] = useState<string | undefined>();

  useEffect(() => {
    const split = id?.split('-');
    let item: CardPhone | undefined;

    if (split && split[1] === 'iphone') {
      item = phones.find(phonee => phonee.id === id);
      setName('phones');
    }

    if (split && split[1] === 'ipad') {
      item = tablets.find(tablet => tablet.id === id);
      setName('tablets');
    }

    if (split && split[1] === 'watch') {
      const accessory = accessories.find(accessoryy => accessoryy.id === id);

      if (accessory) {
        item = {
          ...accessory,
          camera: 'default_camera_value',
          zoom: 'default_zoom_value',
        };
      }

      setName('accessories');
    }

    setPhone(item);
  }, [id]);

  useEffect(() => {
    if (phone) {
      setImage(phone.images[0]);
    }
  }, [phone]);

  useEffect(() => {
    if (phone) {
      setActiveCapacity(phone?.capacity);
    }
  }, [phone]);

  useEffect(() => {
    if (phone) {
      setActiveColor(phone?.color);
    }
  }, [phone]);

  let isLiked;
  let isCart;

  if (phone) {
    isLiked = likeItems.some(phoness => phoness.id === id);
    isCart = cartItems.some(phonees => phonees.id === id);
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const availableColor = (color: string) => {
    const currentColor = phone?.color;
    const rename = id?.split('-');
    const updatedColor = color.replace(/\s+/g, '-');

    if (rename && currentColor) {
      const currentColorFormatted = currentColor.replace(/\s+/g, '-');
      const currentIndex = rename.indexOf(currentColorFormatted.split('-')[0]);

      if (currentIndex !== -1) {
        const currentColorParts = currentColorFormatted.split('-');

        rename.splice(currentIndex, currentColorParts.length, updatedColor);
      }
    }

    navigate(`/phones/${rename?.join('-')}`);
    setActiveColor(color);
  };

  const availableCapacity = (capacity: string) => {
    const currentColor = phone?.color;
    const rename = id?.split('-');

    if (rename && currentColor) {
      const currentColorFormatted = currentColor.replace(/\s+/g, '-');
      const colorIndex = rename.indexOf(currentColorFormatted.split('-')[0]);

      if (colorIndex !== -1 && colorIndex > 0) {
        rename[colorIndex - 1] = capacity;
      }
    }

    navigate(`/phones/${rename?.join('-').toLowerCase()}`);
    setActiveCapacity(capacity);
  };

  const FallbackImage = 'img/product-not-found.png';

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const imgElement = event.currentTarget as HTMLImageElement;

    imgElement.src = FallbackImage;
  };

  const colorMap: { [key: string]: string } = {
    spacegray: '#5f5f5f',
    midnightgreen: '#195b64',
    midnight: '#131122',
    graphite: '#41424C',
    sierrablue: '#BFDAF7',
    spaceblack: '#182030',
    'rose gold': '#FF5733',
    'sky blue': '#87CEEB',
    'space gray': '#4f5b66',
  };

  return (
    <>
      <header className="header" id="mobile">
        <div className="header__navlist">
          <a href="#">
            <div className="header--logo"></div>
          </a>
          <ul className="header__list">
            <Link to="/" className="header__href">
              <li className="header__item">home</li>
            </Link>
            <Link to="/phones" className="header__href">
              <li className="header__item">phones</li>
            </Link>
            <Link to="/tablets" className="header__href">
              <li className="header__item">tablets</li>
            </Link>
            <Link to="/accessories" className="header__href">
              <li className="header__item">accessories</li>
            </Link>
          </ul>
        </div>

        <Link to="/menu">
          <div className="header--menu"></div>
        </Link>

        <div className="header__navigation">
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--like">
              {likeItems.length !== 0 && (
                <div className="header__navigation--count">
                  <p className="header__navigation--count--style">
                    {likeItems.length}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--bag"></div>
          </NavLink>
        </div>
      </header>
      <div className="availability">
        <main className="info">
          <section className="navigate">
            <Link to="/" className="navigate__href">
              <div className="navigate__house"></div>
            </Link>
            <div className="navigate__arrow"></div>
            {}
            <Link to={`/${name}`} className="info__href">
              <p className="navigate__text info__text">
                {name && name.charAt(0).toUpperCase() + name.slice(1)}
              </p>
            </Link>
            <div className="navigate__arrow"></div>
            <p className="navigate__text">{phone?.name}</p>
          </section>

          <section className="navigate info__navigate">
            <Link to={`/${name}`} className="navigate__href">
              <div className="navigate__arrow navigate__arrow--white"></div>
            </Link>
            <Link to={`/${name}`} className="navigate__href">
              <p className="navigate__text navigate__text--white">Back</p>
            </Link>
          </section>

          {phone && (
            <section className="info__block">
              <h1 className="info__block--name">{phone.name}</h1>
              <div className="info__grid">
                <img
                  src={image}
                  alt="gadget foto"
                  className="info__block--image"
                  onError={handleImageError}
                />
                <div className="info__images">
                  {phone.images.map((imagees: string | undefined) => (
                    <img
                      key={imagees}
                      src={imagees}
                      alt="gadget foto"
                      className={cn('info__images--foto', {
                        'info__images--foto--active': imagees === image,
                      })}
                      onClick={() => setImage(imagees)}
                      onError={handleImageError}
                    />
                  ))}
                </div>

                <div className="info__buy">
                  <div className="info__colors">
                    <p className="info__colors--text">Available colors</p>
                    <p className="info__colors--id">{`ID: 802390`}</p>
                  </div>

                  <div className="info__color">
                    {phone.colorsAvailable.map((color: string) => (
                      <div
                        key={color}
                        className={cn('info__color--round', {
                          select: activeColor === color,
                        })}
                        style={{ backgroundColor: colorMap[color] || color }}
                        onClick={() => availableColor(color)}
                      ></div>
                    ))}
                  </div>

                  <div className="info__hr"></div>

                  <div className="info__capacity">
                    <p className="info__capacity--text">Select capacity</p>

                    <div className="info__capacity--block">
                      {phone.capacityAvailable.map((capacity: string) => (
                        <div
                          key={capacity}
                          className={cn('info__capacity--block--gb', {
                            actives: activeCapacity === capacity,
                          })}
                          onClick={() => availableCapacity(capacity)}
                        >
                          {capacity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="info__hr"></div>

                  <div className="info__price">
                    <h1 className="info__price--discount">{`$${phone.priceDiscount}`}</h1>
                    <h1 className="info__price--regular">{`$${phone.priceRegular}`}</h1>
                  </div>

                  <div className="info__add">
                    <button
                      className={cn('card__buttons--add mobiles__button--add', {
                        'card__buttons--active': isCart,
                      })}
                      onClick={() => addCartItems(phone)}
                    >
                      {isCart ? 'Added' : 'Add to cart'}
                    </button>
                    <button
                      className={cn('info__add--like', {
                        'info__add--like--active': isLiked,
                      })}
                      onClick={() => addFavouritesItems(phone)}
                    >
                      <div
                        className={cn('card__buttons--foto', {
                          'card__buttons--foto--active': isLiked,
                        })}
                      ></div>
                    </button>
                  </div>

                  <div className="info__texts">
                    <ul className="info__texts--list">
                      <li className="info__texts--item">Screen</li>
                      <li className="info__texts--item">Resolution</li>
                      <li className="info__texts--item">Processor</li>
                      <li className="info__texts--item">RAM</li>
                    </ul>
                    <ul className="info__texts--lists">
                      <li className="info__texts--items">{phone.screen}</li>
                      <li className="info__texts--items">{phone.resolution}</li>
                      <li className="info__texts--items">{phone.processor}</li>
                      <li className="info__texts--items">{phone.ram}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="info__grids">
                <div className="info__about">
                  <h3 className="info__about--text">About</h3>

                  <div className="info__about--block">
                    <h4 className="info__about--block--title">
                      {phone.description[0].title}
                    </h4>
                    <p className="info__about--block--text">
                      {phone.description[0].text}
                    </p>
                  </div>

                  <div className="info__about--block">
                    <h4 className="info__about--block--title">
                      {phone.description[1].title}
                    </h4>
                    <p className="info__about--block--text">
                      {phone.description[1].text}
                    </p>
                  </div>

                  <div className="info__about--block">
                    <h4 className="info__about--block--title">
                      {phone.description[2].title}
                    </h4>
                    <p className="info__about--block--text">
                      {phone.description[2].text}
                    </p>
                  </div>
                </div>

                <div className="info__specs">
                  <h3 className="info__specs--text">Tech specs</h3>

                  <div className="info__texts">
                    <ul className="info__texts--list">
                      <li className="info__texts--item">Screen</li>
                      <li className="info__texts--item">Resolution</li>
                      <li className="info__texts--item">Processor</li>
                      <li className="info__texts--item">RAM</li>
                      <li className="info__texts--item">Built in memory</li>
                      <li className="info__texts--item">Camera</li>
                      <li className="info__texts--item">Zoom</li>
                      <li className="info__texts--item">Cell</li>
                    </ul>
                    <ul className="info__texts--lists">
                      <li className="info__texts--items">{phone.screen}</li>
                      <li className="info__texts--items">{phone.resolution}</li>
                      <li className="info__texts--items">{phone.processor}</li>
                      <li className="info__texts--items">{phone.ram}</li>
                      <li className="info__texts--items">{phone.capacity}</li>
                      <li className="info__texts--items">{phone.camera}</li>
                      <li className="info__texts--items">{phone.zoom}</li>
                      <li className="info__texts--items">
                        {phone.cell.join(', ')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        <section className="assortment">
          <h2 className="models__text">You may also like</h2>
          <div className="slider-second">
            <Flickity
              className="slider"
              elementType="div"
              options={{
                pageDots: false,
                prevNextButtons: true,
                cellAlign: 'left',
              }}
            >
              {phones.map(item => {
                const isLikedd = likeItems.some(
                  phonen => phonen.id === item.id,
                );
                const isCartt = cartItems.some(phonef => phonef.id === item.id);

                return (
                  <div key={item.id} className="card">
                    <img
                      src={item.images[0]}
                      alt="Phone image"
                      className="card__foto"
                    />
                    <h2 className="card__text">{item.name}</h2>
                    <div className="card__block">
                      <h3 className="card__price">
                        {item.priceDiscount + '$'}
                      </h3>
                      <h3 className="card__fullprice">
                        {item.priceRegular + '$'}
                      </h3>
                    </div>
                    <div className="card__hr"></div>
                    <div className="card__info">
                      <div className="card__info--block">
                        <p className="card__name">Screen</p>
                        <p className="card__data">{item.screen.slice(0, 5)}</p>
                      </div>
                      <div className="card__info--block">
                        <p className="card__name">Capacity</p>
                        <p className="card__data">{item.capacity}</p>
                      </div>
                      <div className="card__info--block">
                        <p className="card__name">RAM</p>
                        <p className="card__data">{item.ram}</p>
                      </div>
                    </div>

                    <div className="card__buttons">
                      <button
                        className={cn('card__buttons--add', {
                          'card__buttons--active': isCartt,
                        })}
                        onClick={() => addCartItems(item)}
                      >
                        {isCartt ? 'Added' : 'Add to cart'}
                      </button>
                      <button
                        className={cn('card__buttons--like', {
                          'card__buttons--like--active': isLikedd,
                        })}
                        onClick={() => addFavouritesItems(item)}
                      >
                        <div
                          className={cn('card__buttons--foto', {
                            'card__buttons--foto--active': isLikedd,
                          })}
                        ></div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </Flickity>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer__block">
          <div className="footer__logo"></div>
          <ul className="footer__list">
            <li className="footer__item">
              <a href="https://github.com/FoReWwEr" className="footer__href">
                Github
              </a>
            </li>
            <li className="footer__item">
              <a href="mailto:ovoo1339@gmail.com" className="footer__href">
                Contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="https://github.com/FoReWwEr" className="footer__href">
                rights
              </a>
            </li>
          </ul>

          <div className="footer__back">
            <a
              className="footer__href footer__href--flex"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <p className="footer__back--text">Back to top</p>
              <button className="footer__back--button">
                <div className="footer__back--image"></div>
              </button>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
