/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSuggestedProducts } from '../../helper/api';
import './ProductDetailsPage.scss';
import { ProductsSlide } from '../../Components/ProductsSlide/ProductsSlide';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { ProductContext } from '../../helper/ProductContext';
import { handleAddButton, handleFavorites } from '../../helper/handlers';
import classNames from 'classnames';
import { Loader } from '../../Components/Loader/Loader';
import { NoResults } from '../../Components/NoResults/NoResults';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [activeBox, setActiveBox] = useState('');

  const {
    setCard,
    details,
    setDetails,
    card,
    product,
    favorites,
    setFavorites,
    category,
  } = useContext(ProductContext);

  const sameCard = card.some(c => c.itemId === details?.id);
  const neededProduct = product.find(c => c.itemId === details?.id);
  const sameFavorites = favorites.some(c => c.id === neededProduct?.id);

  const {
    camera,
    capacityAvailable,
    cell,
    colorsAvailable,
    description = [
      {
        title: '',
        text: [],
      },
    ],
    images,
    name,
    priceDiscount,
    priceRegular,
    processor,
    ram,
    resolution,
    screen,
    zoom,
    capacity,
  } = details || {};

  const { pathname } = location;
  const segments = pathname.split('/');
  const phoneId = segments[segments.length - 1];
  const cellItem = cell?.join(', ');
  const excludedColors = ['midnightgreen', 'spacegray', 'coral', 'rosecold'];
  const [newId, setId] = useState('');
  const whatCategoryIs = category ? category : details.category;
  const whatIdIs = phoneId ? phoneId : newId;

  const modImages = images?.map(img => {
    return img.split('.jpg').join('.webp');
  });

  function showBigPicture(imageSrc: string) {
    const picture = document.querySelector(
      '.details__bigImage',
    ) as HTMLImageElement;

    if (imageSrc) {
      picture.src = imageSrc;
    }
  }

  const goBack = () => {
    window.history.back();
  };

  const handleCapacity = (newCapac: string) => {
    const splitPhoneId = newId.split('-');

    splitPhoneId[splitPhoneId?.length - 2] = newCapac;
    const newCapacity = splitPhoneId
      .join('-')
      .replace('GB', 'gb')
      .replace('TB', 'tb');

    setId(newCapacity);
    navigate(`/product/${newCapacity}`);
  };

  const handleColors = (color: string) => {
    const splitPhoneId = newId.split('-');

    splitPhoneId[splitPhoneId?.length - 1] = color;
    const newCardColor = splitPhoneId.join('-');

    setId(newCardColor);
    navigate(`/product/${newCardColor}`);
  };

  useEffect(() => {
    setLoader(true);
    setId(phoneId);
    getSuggestedProducts(whatCategoryIs, whatIdIs)
      .then(setDetails)
      .finally(() => setLoader(false));
  }, [whatCategoryIs, whatIdIs]);

  return loader ? (
    <Loader />
  ) : details ? (
    <div className="details">
      <div className="details__items">
        <Breadcrumbs device={whatCategoryIs} phoneName={name} />
        <div className="details__back">
          <button className="details__back-link" onClick={goBack}>
            <img className="details__arrey" src="img/Vector(Stroke)Back.png" />
            <p>Back</p>
          </button>
        </div>
        <h1 className="details__h1">{name}</h1>
      </div>

      <div className="details__card">
        <div className="details__images">
          <div className="details__smallImagesBox">
            {modImages?.map(image => (
              <div
                className={classNames('details__smallBox details__box', {
                  active: image === activeBox,
                })}
                key={image}
                onClick={() => setActiveBox(image)}
              >
                <img
                  src={image}
                  alt=""
                  className="details__image"
                  onClick={() => showBigPicture(image)}
                />
              </div>
            ))}
          </div>

          <div className="details__bigBox">
            <img
              src={modImages && modImages[0]}
              className="details__bigImage details__image"
            />
          </div>
        </div>

        <div className="details__featuresBox">
          <div className="details__features">
            <div className="details__colors">
              <div className="details__small-title">Available colors</div>
              <div className="details__colors-box">
                {colorsAvailable?.map(color => (
                  <div className="details__color-frame" key={color}>
                    <button
                      onClick={() => handleColors(color)}
                      className={classNames(
                        `details__color details__color--${color}`,
                        { 'details__is-active': color === details?.color },
                      )}
                      style={
                        !excludedColors.includes(color)
                          ? { backgroundColor: color }
                          : undefined
                      }
                    ></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="details__capacity">
              <div className="details__small-title">Select capacity</div>
              <div className="details__capacity-box">
                {capacityAvailable?.map(capac => (
                  <button
                    className={classNames('details__capacity-button', {
                      'is-active': capac === details.capacity,
                    })}
                    key={capac}
                    onClick={() => handleCapacity(capac)}
                  >
                    {capac}
                  </button>
                ))}
              </div>
            </div>

            <div className="details__price">
              <div className=" details__price details__price--discount">{`$${priceDiscount}`}</div>
              <div className=" details__price details__price--regular">{`$${priceRegular}`}</div>
            </div>
            <div className="details__buttons">
              {sameCard ? (
                <button className="details__button added">Added to cart</button>
              ) : (
                <button
                  className="details__button"
                  onClick={() => {
                    if (neededProduct) {
                      handleAddButton(card, neededProduct, setCard, sameCard);
                    }
                  }}
                >
                  Add to cart
                </button>
              )}

              <div
                className="details__favorite"
                onClick={() => {
                  if (neededProduct) {
                    handleFavorites(
                      favorites,
                      neededProduct,
                      setFavorites,
                      sameFavorites,
                    );
                  }
                }}
              >
                {sameFavorites ? (
                  <img
                    src="./img/RedHurt.png"
                    alt="favourites"
                    className="card__favor-icon"
                  />
                ) : (
                  <img
                    src="./img/WhiteHurt.png"
                    alt="favourites"
                    className="card__favor-icon"
                  />
                )}
              </div>
            </div>

            <div className="details__inform">
              <div className="details__inform-item">
                <p className="details__small-tex">Screen:</p>
                <p className="details__char">{screen}</p>
              </div>
              <div className="details__inform-item">
                <p className="details__small-tex">Resolution: </p>
                <p className="details__char">{resolution}</p>
              </div>
              <div className="details__inform-item">
                <p className="details__small-tex">Processor: </p>
                <p className="details__char">{processor}</p>
              </div>
              <div className="details__inform-item">
                <p className="details__small-tex">RAM: </p>
                <p className="details__char">{ram}</p>
              </div>
            </div>
          </div>

          <div className="details__id">ID: {neededProduct?.id}</div>
        </div>
      </div>
      <div className="details__description">
        <div className="details__about" data-cy="productDescription">
          <h2 className="details__h2">About</h2>

          {description?.map(elem => (
            <div className="details__section" key={elem.title}>
              <p className="details__text">{elem.text[0]}</p>
              <p className="details__text">{elem.text[1]}</p>
            </div>
          ))}
        </div>

        <div className="details__tech-specs">
          <h2 className="details__h2">Tech specs</h2>
          <div className="details__tech-item">
            <p className="details__tech-name">Screen</p>
            <p className="details__tech-char">{screen}</p>
          </div>

          <div className="details__tech-item">
            <p className="details__tech-name">Resolution</p>
            <p className="details__tech-char">{resolution}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">Processor</p>
            <p className="details__tech-char">{processor}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">RAM</p>
            <p className="details__tech-char">{ram}</p>
          </div>

          <div className="details__tech-item">
            <p className="details__tech-name">Built in memory</p>
            <p className="details__tech-char">{capacity}</p>
          </div>

          <div className="details__tech-item">
            <p className="details__tech-name">Camera</p>
            <p className="details__tech-char">{camera}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">Zoom</p>
            <p className="details__tech-char">{zoom}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">Cell</p>
            <p className="details__tech-char">{cellItem}</p>
          </div>
        </div>
      </div>
      <section className="details__alsoLike">
        <ProductsSlide sectionType="alsoLike" />
      </section>
    </div>
  ) : (
    <NoResults />
  );
};
