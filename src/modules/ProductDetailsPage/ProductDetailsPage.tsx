/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  NavLink,
  useActionData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Gargets } from '../../interface/Gargets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './ProductDetailsPage.scss';
import { useEffect, useState } from 'react';
import { Loader } from '../ProductPages/Loader';
import classNames from 'classnames';
import { useCart } from '../CartContext/CartContext';
import { Phone } from '../../interface/Phone';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const item = location.state as Gargets;
  const [clickImage, setClickImage] = useState<string | null>(null);
  const [garg, setGarg] = useState<Gargets[]>([]);
  const [loadingDataOnServer, setLoadingDataOnServer] = useState(false);
  const [chooseButtonGB, setChooseButtonGB] = useState<string>(item.capacity);
  const [chooseColor, setChooseColor] = useState(item.color);
  const navigate = useNavigate();
  const { cartItems, favoriteItems, addToCart, addFavorite, removeFavorite } =
    useCart();
  const [like, setLike] = useState(false);
  const [addedCart, setAddedCart] = useState(false);
    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [cartItems2, setCartItems] = useState<Phone[]>([]);

  useEffect(() => {
    setLoadingDataOnServer(true);
    fetch(`./api/${item.category}.json`)
      .then(response => response.json())
      .then(data => {
        setGarg(data);
      })
      .finally(() => {
        setLoadingDataOnServer(false);
      });
  }, []);

  const currentModel = garg.find(
    phone =>
      phone.capacity.toLowerCase().trim() ===
        chooseButtonGB.toLowerCase().trim() &&
      phone.color.toLowerCase().trim() === chooseColor.toLowerCase().trim(),
  );

  const getSuggestedProducts = () => {
    const randomPhones = [...garg].sort(() => Math.random() - 0.5);

    return randomPhones.slice(0, 5);
  };

  if (loadingDataOnServer) {
    return <Loader loading={true} />;
  }

  const suggestedProducts = getSuggestedProducts();

  return (
    <>
      <div className="details">
        <div className="gargets__back-to-home">
          <NavLink to="/" className="gargets__home-img" />
          <span className="gargets__arrow"></span>
          <NavLink to={`/${item.category}`} className="details__back-home-h2">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </NavLink>
          <span className="gargets__arrow"></span>
          <span className="details__phone-models">{currentModel?.name}</span>
        </div>

        <div className="details__back-btn">
          <span className="details__arrow"></span>
          <NavLink to="/phones" className="details__back">
            Back
          </NavLink>
        </div>

        <h2 className="details__phone-name">
          {item.name.replace(/\d+GB/, `${chooseButtonGB}`) ||
            item.name.replace(/\d+GB/, `${chooseButtonGB} GB`)}
        </h2>

        <div className="details__phone-colums">
          {item.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`image-phone-${index}`}
              className={`details__image ${clickImage === img ? 'details__image--active' : ''}`}
              onClick={() => setClickImage(img)}
            />
          ))}
        </div>

        <div className="details__image-block">
          <img
            src={clickImage ? clickImage : item.images[0]}
            alt="main-image-phone"
            className="details__image-main"
          />
        </div>

        <div className="details__information">
          <h3 className="details__information-h3">Available colors</h3>
          <div className="details__colors-wrapper">
            {item.colorsAvailable.map((color, index) => (
              <button
                key={index}
                className="details__color-button"
                style={{ color: color }}
                onClick={() => {
                  setChooseColor(color);
                  setClickImage(null);

                  const baseId = item.id.replace(/-\w+$/, '');
                  const newId = `${baseId}-${color.toLowerCase()}`;

                  const targetPhone = garg.find(g => g.id === newId);

                  if (targetPhone) {
                    navigate(`/phones/${targetPhone.id}`, {
                      state: targetPhone,
                    });
                  }
                }}
              />
            ))}
          </div>

          {/* <div className="details__id">
      <div className="details__information-id">рфнд</div>
    </div> */}

          <div className="details__small-line"></div>
          <h3 className="details__capacity">Select capacity</h3>
          <div className="details__button">
            {item.capacityAvailable.map((capacity, index) => (
              <button
                key={index}
                className={classNames('details__button-gb', {
                  active: chooseButtonGB === capacity,
                })}
                onClick={() => {
                  setChooseButtonGB(capacity);

                  const newId = `${item.namespaceId}-${capacity.toLowerCase()}-${item.color.toLowerCase()}`;

                  const targetPhone = garg.find(g => g.id === newId);

                  if (targetPhone) {
                    navigate(`/phones/${targetPhone.id}`, {
                      state: targetPhone,
                    });
                  }
                }}
              >
                {capacity}
              </button>
            ))}
          </div>

          <div className="details__small-line"></div>

          <div className="details__position-price">
            <div className="details__price">
              ${currentModel?.priceRegular || item.priceRegular}
            </div>

            {currentModel?.priceDiscount &&
              currentModel.priceDiscount < currentModel.priceRegular && (
                <div className="details__discount">
                  ${currentModel.priceDiscount}
                </div>
              )}
          </div>

          <div className="details__position">
            <button
              className={classNames('details__add-to-cart', {
                added: addedCart,
              })}
              onClick={() => {
                setAddedCart(true);
                const selected = currentModel || item;

                const alreadyInCart = cartItems.some(
                  product => product.id === selected.id,
                );

                if (alreadyInCart) {
                  alert('Added to cart!');

                  return;
                } else {
                  addToCart(selected);
                }
              }}
            >
              Add to cart
            </button>

            <button
              type="button"
              className={'details__button-like'}
              onClick={() => {
                const selected = currentModel ?? item;

                if (!selected) {
                  alert('No product selected');

                  return;
                }

                setLike(prevLike => {
                  const newLike = !prevLike;

                  const isAlreadyFavorite = favoriteItems.some(
                    product => product.id === selected.id,
                  );

                  if (isAlreadyFavorite) {
                    removeFavorite(item.id);
                  }

                  if (newLike) {
                    addFavorite(selected);
                  }

                  return newLike;
                });
              }}
            >
              <span
                className="swiper__like"
                style={{
                  backgroundImage: like
                    ? 'url(./img/favorites.png)'
                    : 'url(./img/navbar/like.png)',
                }}
              ></span>
            </button>
          </div>

          <div className="details__position">
            <h5 className="details__screen">Screen</h5>
            <h5 className="details__oled">{item.screen}</h5>
          </div>

          <div className="details__position">
            <h5 className="details__resolution">Resolution</h5>
            <h5 className="details__resolution-characters">
              {item.resolution}
            </h5>
          </div>

          <div className="details__position">
            <h5 className="details__processor">Resolution</h5>
            <h5 className="details__processor-characters">{item.processor}</h5>
          </div>

          <div className="details__position">
            <h5 className="details__ram">RAM</h5>
            <h5 className="details__ram-characters">{item.ram}</h5>
          </div>
        </div>

        <div className="details__description">
          <div className="details__about">
            <h3 className="details__about-h3">About</h3>
            <div className="details__about-line"></div>
            {item.description.map((desc, index) => (
              <div key={index}>
                <h4 className="details__about-desc-h4">{desc.title}</h4>
                {desc.text.map((paragraph, i) => (
                  <p key={i} className="details__about-desc">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="details__tech">
          <div className="details__position-tech">
            <h3 className="details__position-tech-h3">Tech specs</h3>
            <div className="details__about-line"></div>

            <div className="details__position">
              <h5 className="details__screen">Screen</h5>
              <h5 className="details__oled">{item.screen}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__resolution">Resolution</h5>
              <h5 className="details__resolution-characters">
                {item.resolution}
              </h5>
            </div>

            <div className="details__position">
              <h5 className="details__processor">Processor</h5>
              <h5 className="details__processor-characters">
                {item.processor}
              </h5>
            </div>

            <div className="details__position">
              <h5 className="details__ram">RAM</h5>
              <h5 className="details__ram-characters">{item.ram}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__memory">Built in memory</h5>
              <h5 className="details__memory-characters">{item.capacity}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__camera">Camera</h5>
              <h5 className="details__camera-characters">{item.camera}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__zoom">Zoom</h5>
              <h5 className="details__zoom-characters">{item.zoom}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__cell">Cell</h5>
              {item.cell.map((cellItem, index) => (
                <h5 className="details__cell-characters" key={index}>
                  {cellItem}
                  {index < item.cell.length - 1 ? ',' : ''}
                </h5>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="details__roundabout">
        <div className="swiper">
          <div className="swiper__top-bar">
            <h2 className="swiper__brand-h2">You may also like</h2>
            <div className="swiper__nav-buttons">
              <div className="swiper-button-prev" />
              <div className="swiper-button-next" />
            </div>
          </div>

          <div className="swiper__phone">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              className="swiper__slide"
            >
              {garg.map(phone => (
                <SwiperSlide key={phone.id} className="swiper__card">
                  <img
                    src={phone.images[0]}
                    alt={phone.name}
                    className="swiper__image-phone"
                    onClick={() => {
                      const productId = phone.id;

                      navigate(`/phones/${productId}`, { state: phone });
                    }}
                  />
                  <h4 className="swiper__name">{phone.name}</h4>
                  <div className="swiper__position">
                    <h3 className="swiper__costs">${phone.priceRegular}</h3>
                    <h3 className="swiper__sale">${phone.priceDiscount}</h3>
                    <div className="swiper__line"></div>
                  </div>
                  <div className="swiper__small-line" />
                  <div className="swiper__position">
                    <h5 className="swiper__screen">Screen</h5>
                    <h5 className="swiper__oled">{phone.screen}</h5>
                  </div>
                  <div className="swiper__position">
                    <h5 className="swiper__capacity">Capacity</h5>
                    <h5 className="swiper_gb">{phone.capacity}</h5>
                  </div>
                  <div className="swiper__position">
                    <h5 className="swiper__ram">RAM</h5>
                    <h5 className="swiper__ram-gb">{phone.ram}</h5>
                  </div>
                  <div className="swiper__position">
                    <NavLink
                      to="/"
                      className={classNames('swiper__add-to-cart', {
                        added: cartItems2.some(items => items.id === phone.id),
                      })}
                      onClick={e => {
                        e.preventDefault();
                        addToCart(phone);

                        setCartItems(prev =>
                          prev.some(items => items.id === phone.id)
                            ? prev
                            : [...prev, phone],
                        );

                        // alert('Added to cart!');
                      }}
                    >
                      {cartItems2.some(items => items.id === phone.id)
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </NavLink>

                    <button
                      className="swiper__button-like"
                      onClick={() => {
                        const isLiked = likedIds.includes(phone.id);

                        setLikedIds(prev =>
                          isLiked
                            ? prev.filter(id => id !== phone.id)
                            : [...prev, phone.id],
                        );

                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        isLiked ? removeFavorite(phone.id) : addFavorite(phone);
                      }}
                    >
                      <span
                        className="swiper__like"
                        style={{
                          backgroundImage: likedIds.includes(phone.id)
                            ? 'url(./img/favorites.png)'
                            : 'url(./img/navbar/like.png)',
                        }}
                      ></span>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};
