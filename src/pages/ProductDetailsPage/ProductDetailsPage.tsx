import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import arrowLeft from '../../images/arrow-left-black.svg';
import { Loader } from '../../components/Loader/Loader';
import {
  client,
  getAllProducts,
  getPhoneData,
} from '../../helpers/utils/fetchData';
import { PhoneDetail } from '../../Types/PhoneDetail';
import { Phone } from '../../Types/Phone';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Categories } from '../../Types/Categories';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { defaultPhone } from '../../helpers/defaultPhone';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const phoneId = location.pathname.replace('/phones/', '');
  const upperPhoneId = phoneId.replace(phoneId[0], phoneId[0].toUpperCase());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState<PhoneDetail | null>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [suggestedProducts, setSuggestedProducts] = useState<Phone[]>([]);

  const {
    cartPhones,
    setCartPhones,
    favourites,
    setFavourites,
  } = useProducts();

  const card = suggestedProducts.find(i => i.itemId === phoneId)
    || defaultPhone;

  const cardId = card.id;

  const addToFavourites = () => {
    if (favourites.find(i => i.id === cardId)) {
      return;
    }

    const newFavourites = [...favourites, card];

    setFavourites(newFavourites);
  };

  const removeFromFavourites = () => {
    const newFavourites = favourites.filter(i => i.id !== cardId);

    setFavourites(newFavourites);
  };

  const addToCart = () => {
    const newPhone = { id: cardId, quantity: 1, product: { ...card } };

    if (cartPhones.find(i => i.id === newPhone.id)) {
      return;
    }

    const setOfPhones = new Set([...cartPhones, newPhone]);

    const newPhones = Array.from(setOfPhones);

    setCartPhones(newPhones);
  };

  const cartPhonesIds = cartPhones.map(i => i.id);
  const favouritesPhonesIds = favourites.map(i => i.id);

  const techSpecsList = [
    'Screen',
    'Resolution',
    'Processor',
    'RAM',
    'Camera',
    'Zoom',
    'Cell',
  ];

  let phoneColor = phone?.color;
  const phoneCapacity = phone?.capacity.replace('GB', ' GB');

  const colors = phone?.colorsAvailable.map(i => {
    if (i === 'spacegray') {
      phoneColor = '#4c4c4c';

      return '#4c4c4c';
    }

    if (i === 'midnightgreen') {
      phoneColor = '#5f7170';

      return '#5f7170';
    }

    if (i === 'gold') {
      phoneColor = '#fcdbc1';

      return '#fcdbc1';
    }

    if (i === 'silver') {
      phoneColor = '#f5f5f0';

      return '#f5f5f0';
    }

    if (i === 'white') {
      phoneColor = '#f0f0f0';

      return '#f0f0f0';
    }

    if (i === 'red') {
      phoneColor = '#ba0c2e';

      return '#ba0c2e';
    }

    if (i === 'green') {
      phoneColor = '#aee1cd';

      return '#aee1cd';
    }

    if (i === 'black') {
      phoneColor = '#201d24';

      return '#201d24';
    }

    if (i === 'purple') {
      phoneColor = '#b8afe6';

      return '#b8afe6';
    }

    if (i === 'yellow') {
      phoneColor = '#ffe681';

      return '#ffe681';
    }

    if (i === 'rosegold') {
      phoneColor = '#fad7bd';

      return '#fad7bd';
    }

    if (i === 'coral') {
      phoneColor = '#ee7762';

      return '#ee7762';
    }

    return i;
  });

  const capacities = phone?.capacityAvailable
    .map(i => i.replace('GB', ' GB'));

  const techSpecsValues = [
    phone?.screen,
    phone?.resolution,
    phone?.processor,
    phone?.ram,
    phone?.camera,
    phone?.zoom,
    phone?.cell.join(', '),
  ];

  const handleChangePhoto = (src: string) => {
    setSelectedPhoto(src);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPhoneData<PhoneDetail>(`/${phoneId}.json`);

        setPhone(data);
        setIsLoading(false);
        handleChangePhoto(data?.images[0] || '');
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhone, phoneId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchProducts();

        const mappedData = data.map((i) => {
          return { ...i, name: `${i.name} (iMT9G2FS/A)` };
        });

        setSuggestedProducts(getAllProducts(mappedData, Categories.Phones));
        setIsLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setSuggestedProducts]);

  const formattedId = upperPhoneId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="phones">
      <div className="path" data-cy="breadCrumbs">
        <Link to="/" className="go-home" />
        <img src={arrowRight} alt="arrow_right" />
        <Link to="/phones" className="phones__prev-page">Phones</Link>
        <img src={arrowRight} alt="arrow_right" />
        <h3>{formattedId}</h3>
      </div>
      <button
        type="button"
        className="left-back"
        onClick={() => navigate(-1)}
        data-cy="backButton"
      >
        <img src={arrowLeft} alt="arrow_right" />
        <p>Back</p>
      </button>
      <h1 className="phones__title phones__title--mb-40px">
        {formattedId}
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {card.id ? (
            <div className="container-details">
              <div className="details">
                <div className="details__small-photo-container">
                  {phone?.images.map(image => (
                    <div
                      key={image}
                      className={classNames('details__small-photo', {
                        selected: selectedPhoto === image,
                      })}
                      onClick={() => handleChangePhoto(image)}
                      role="presentation"
                    >
                      <img
                        className="details__small-image"
                        src={image}
                        alt={image}
                      />
                    </div>
                  ))}
                </div>
                <div className="details__big-photo-container">
                  <div className="details__big-photo">
                    <img
                      className="details__big-image"
                      src={selectedPhoto}
                      alt={selectedPhoto}
                    />
                  </div>
                </div>
                <aside className="aside">
                  <div className="colors">
                    <h3 className="colors__title">Avaliable colors</h3>
                    <ul className="colors__list">
                      {colors?.map(color => (
                        <li
                          className={classNames('colors__item', {
                            colors__selected: phoneColor === color,
                            colors__disabled: phoneColor !== color,
                          })}
                        >
                          <div
                            className="colors__color"
                            style={{ backgroundColor: `${color}` }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="capacity colors">
                    <h3 className="colors__title">Select capacity</h3>
                    <ul className="colors__list">
                      {capacities?.map(capacity => (
                        <li
                          className={classNames('capacity__item', {
                            capacity__selected: capacity === phoneCapacity,
                            capacity__disabled: capacity !== phoneCapacity,
                          })}
                        >
                          {capacity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card__price aside__price">
                    {phone?.priceDiscount ? (
                      <>
                        <p className="card__hot-price">{`$${phone?.priceDiscount}`}</p>
                        <p className="card__full-price">{`$${phone?.priceRegular}`}</p>
                      </>
                    ) : (
                      <p className="card__hot-price">{`$${phone?.priceRegular}`}</p>
                    )}
                  </div>
                  <div className="card__info">
                    <div className="card__button aside__button">
                      <div
                        onClick={addToCart}
                        className={classNames('card__link', {
                          'card__link--added': cartPhonesIds.includes(cardId),
                        })}
                        role="presentation"
                      >
                        {cartPhonesIds.includes(cardId)
                          ? 'Added to cart'
                          : 'Add to cart'}
                      </div>
                      {favouritesPhonesIds.includes(cardId) ? (
                        <div
                          className="card__icon card__icon--added"
                          data-cy="addToFavorite"
                          role="presentation"
                          onClick={removeFromFavourites}
                        />
                      ) : (
                        <div
                          className="card__icon"
                          data-cy="addToFavorite"
                          role="presentation"
                          onClick={addToFavourites}
                        />
                      )}
                    </div>
                    <div className="card__row">
                      <p className="card__char-name">Screen</p>
                      <p className="card__char-value">{phone?.screen}</p>
                    </div>
                    <div className="card__row">
                      <p className="card__char-name">Capacity</p>
                      <p className="card__char-value">{phone?.capacity}</p>
                    </div>
                    <div className="card__row">
                      <p className="card__char-name">RAM</p>
                      <p className="card__char-value">{phone?.ram}</p>
                    </div>
                  </div>
                </aside>
                <p className="details__phone-id">ID: 802390</p>
              </div>
              <div>
                <section className="info">
                  <ul className="info__about">
                    <h2 className="info__title">About</h2>
                    {phone?.description.map(paragrahp => (
                      <div
                        className="info__about-article"
                        key={paragrahp.title}
                      >
                        <h3 className="info__about-title">{paragrahp.title}</h3>
                        <div className="info__about-content">
                          {paragrahp.text[0]}
                          {paragrahp.text[1] && (
                            <>
                              <p className="br" />
                              <p>{paragrahp.text[1]}</p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </ul>
                  <ul className="info__specs">
                    <h2 className="info__title">Tech specs</h2>
                    {techSpecsList.map((specsName, index) => (
                      <li className="card__row" key={specsName}>
                        <p className="card__char-name">{specsName}</p>
                        <p className="card__char-value">
                          {techSpecsValues[index]}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          ) : (
            <h1>Phone was not found</h1>
          )}
          <ProductCard
            products={suggestedProducts}
            discount
            title="You may also like"
          />
        </>
      )}
    </div>
  );
};
