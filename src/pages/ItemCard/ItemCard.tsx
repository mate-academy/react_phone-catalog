import { useParams, useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addFavouritePhones,
  // addPhonesInCart,
  deleteFavouritePhones,
  // deletePhonesInCart,
  // deletePhonesInCart,
} from '../../features/favouritesSlice';
import './ItemCard.scss';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';
import { TypeCard } from '../../types/TypeCard';
import { selectPhone } from '../../features/phonesSlice';
import { addPhonesInCart, deletePhonesInCart } from '../../features/cartSlice';

export const ItemCard = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const splitedId = id?.split('-');
  const { favouritesPhones } = useAppSelector(
    (state) => state.favouritesPhones,
  );

  const { selectedPhone } = useAppSelector(
    (state) => state.phones,
  );

  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(selectedPhone?.images[0]);

  console.log(favouritesPhones);

  useEffect(() => {
    if (id) {
      dispatch(selectPhone(id));
    }
  }, [id]);

  useEffect(() => {
    setSelectedImg(selectedPhone?.images[0]);
  }, [selectedPhone?.images]);

  const changeSelectedPhone = (key: string, value: string) => {
    if (splitedId) {
      switch (key) {
        case 'color':
          splitedId[splitedId.length - 1] = value;

          navigate(`/Phones/${splitedId.join('-')}`);
          break;
        case 'memory':
          splitedId[splitedId.length - 2] = value.toLocaleLowerCase();

          navigate(`/Phones/${splitedId.join('-')}`);
          break;
        default:
      }
    }
  };

  const phones = useAppSelector(
    (state) => state.phones.items,
  );

  //
  const oldFav = localStorage.getItem('favourites') || '';
  const newFav: TypeCard[] = JSON.parse(oldFav);

  const oldCart = localStorage.getItem('cart') || '';
  const newCart: TypeCard[] = JSON.parse(oldCart);
  //

  const ThisCard = phones.find(phone => phone.phoneId === id);

  const includesCard = ThisCard && newCart.some(
    item => item.id === ThisCard.id,
  ); // phonesInCart.includes(ThisCard)
  const includesFav = ThisCard && newFav.some(
    item => item.id === ThisCard.id,
  );

  if (!selectedPhone) {
    return <div>Loading...</div>;
  }

  const changeFavourites = () => {
    if (ThisCard) {
      if (newFav.some(item => item.id === ThisCard.id)) {
        // localStorage.setItem('favourites', JSON.stringify(
        //   newFav.filter(item => item.id !== ThisCard.id),
        // ));
        dispatch(deleteFavouritePhones(ThisCard));

        return;
      }

      // if (oldFav) {
      //   newFav.push(ThisCard);
      //   localStorage.setItem('favourites', JSON.stringify(newFav));
      // } else {
      //   localStorage.setItem('favourites', JSON.stringify([ThisCard]));
      // }

      dispatch(addFavouritePhones(ThisCard));
    }
  };

  const changeCart = () => {
    if (ThisCard) {
      if (newCart.some(item => item.id === ThisCard.id)) {
        // localStorage.setItem('cart', JSON.stringify(
        //   newCart.filter(item => item.id !== ThisCard.id),
        // ));

        dispatch(deletePhonesInCart(ThisCard));

        return;
      }

      // if (oldCart) {
      //   newCart.push(ThisCard);
      //   localStorage.setItem('cart', JSON.stringify(newCart));
      // } else {
      //   localStorage.setItem('cart', JSON.stringify([ThisCard]));
      // }

      dispatch(addPhonesInCart(ThisCard));
    }
  };

  const colors: { [key: string]: string } = {
    gold: '#FCDBC1',
    midnightgreen: '#5F7170',
    spacegray: '#4C4C4C',
    silver: '#E2E6E9',
  };

  return (
    <div className="ItemCard">
      <div className="top-link" data-cy="breadCrumbs">
        <Link to="/">
          <img
            src="/img/Home.png"
            alt="Home"
          />
        </Link>
        <img
          src="/img/UpperLink.png"
          alt="ArrowRight"
        />
        <Link to="/Phones">
          <p>Phones</p>
        </Link>
        <img
          src="/img/UpperLink.png"
          alt="ArrowRight"
        />
        <p>{selectedPhone?.name}</p>
      </div>

      <ButtonBack />

      <h1>{selectedPhone?.name}</h1>

      <div className="ItemCard__properties">
        <div className="ItemCard__list">
          {selectedPhone.images.map(image => (
            <div
              role="button"
              key={image}
              onClick={() => setSelectedImg(image)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedImg(image);
                }
              }}
              tabIndex={0}
            >
              <img
                src={`/_new/${image}`}
                alt="Phone"
                className={classNames('ItemCard__img', {
                  active__img: image === selectedImg,
                })}
                key={image}
              />
            </div>
          ))}
        </div>

        <img src={`/_new/${selectedImg}`} alt="Phone" className="ItemCard__selected-img" />

        <div className="ItemCard__info">
          <p>Available colors</p>
          <div className="Change__list">
            {selectedPhone.colorsAvailable.map(color => (
              <button
                key={color}
                type="button"
                style={{ backgroundColor: colors[color] || color }}
                className={classNames('Change-color__item', {
                  active__color: id?.includes(color),
                })}
                onClick={() => changeSelectedPhone('color', color)}
                aria-label="Color Selector"
                disabled={id?.includes(color)}
              />
            ))}
          </div>

          <p>Select capacity</p>
          <div className="Change__list">
            {selectedPhone.capacityAvailable.map(memory => (
              <button
                key={memory}
                type="button"
                className={classNames('Change-memory__item', {
                  active__memory: id?.includes(memory.toLocaleLowerCase()),
                })}
                onClick={() => changeSelectedPhone(
                  'memory', memory.toLocaleLowerCase(),
                )}
                disabled={id?.includes(memory.toLocaleLowerCase())}
              >
                {memory}
              </button>
            ))}
          </div>

          <div className="ItemCard__buttons">
            <div className="ItemCard__price">
              <h1>
                {selectedPhone.priceRegular}
              </h1>
              <p>{selectedPhone.priceDiscount}</p>
            </div>

            <div className="ItemCard__button">
              <button
                type="button"
                className={classNames('ItemCard-button', {
                  'active-button': includesCard,
                })}
                onClick={() => changeCart()}
              >
                Add to cart
              </button>

              <button
                type="button"
                className={classNames('ItemCard-favorites', {
                  'active-button': includesFav,
                })}
                onClick={() => changeFavourites()}
              >
                {includesFav ? (
                  <img
                    src="/img/Red-heart.png"
                    alt="Heart"
                    className="favourites-img"
                  />
                ) : (
                  <img
                    src="/img/heart.png"
                    alt="Heart"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="ItemCard__characteristics small-text">
            <div className="characteristics">
              <p>Screen</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.screen}
              </p>
            </div>
            <div className="characteristics">
              <p>Resolution</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.resolution}
              </p>
            </div>
            <div className="characteristics">
              <p>Processor</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.processor}
              </p>
            </div>
            <div className="characteristics">
              <p>RAM</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.ram}
              </p>
            </div>
          </div>
        </div>
        <div>{`ID: ${selectedPhone.id}`}</div>
      </div>

      <div className="ItemCard__description">
        <div className="description" data-cy="productDescription">
          <h2 className="description__header">About</h2>
          {selectedPhone.description.map(text => (
            <article className="description__article" key={text.title}>
              <h3>{text.title}</h3>
              {text.text.map(element => (
                <p key={element.length}>
                  {element}
                </p>
              ))}
            </article>
          ))}
        </div>

        <article className="description">
          <h2 className="description__header">Tech specs</h2>
          <div className="description__characteristics">
            <div className="characteristics">
              <p>Screen</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.screen}
              </p>
            </div>
            <div className="characteristics">
              <p>Resolution</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.resolution}
              </p>
            </div>
            <div className="characteristics">
              <p>Processor</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.processor}
              </p>
            </div>
            <div className="characteristics">
              <p>RAM</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.ram}
              </p>
            </div>
            <div className="characteristics">
              <p>Built in memory</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.capacityAvailable.map(memory => (
                  id?.includes(memory.toLocaleLowerCase()) ? memory : ''
                ))}
              </p>
            </div>
            <div className="characteristics">
              <p>Camera</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.camera}
              </p>
            </div>
            <div className="characteristics">
              <p>Zoom</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.zoom}
              </p>
            </div>
            <div className="characteristics">
              <p>Cell</p>
              <p
                className="characteristics__value"
              >
                {selectedPhone.cell.join(', ')}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
