import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PhoneDetails } from '../../types/phoneDetails';
// import { ButtonsAdd } from '../ButtonsAdd';
import { DescriptionList } from '../DescriptionList';
import { PhoneSpecs } from '../PhoneSpecs';

import './style.scss';
import { Back } from '../Back';
import { Breadcrumbs } from '../Breadcrumbs';
import { Phone } from '../../types/phone';
import { DispatchContext, StateContext } from '../Store';

type Props = {
  phoneDetails: PhoneDetails,
  phoneData: Phone[],
  phoneId: string,
};

export const CurrentPhone: React.FC<Props> = ({
  phoneDetails,
  phoneId,
  phoneData,
}) => {
  const {
    id,
    name,
    images,
    colorsAvailable,
    capacityAvailable,
    screen,
    capacity,
    camera,
    resolution,
    processor,
    ram,
    description,
    zoom,
    cell,
    priceDiscount,
    priceRegular,
    namespaceId,
    color,
  } = phoneDetails;

  const { cartItems, favoriteItems } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [currentPhoto, setCurrentPhoto] = useState<string>(`_new/${images[0]}`);

  const changeBigPhoto = (path: string) => {
    const imgPath = `_new/${path}`;

    setCurrentPhoto(imgPath);
  };

  const updateStateContext = (isInCart:boolean) => {
    if (isInCart) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: cartItems.map((el) => {
          if (el.id === id) {
            return ({
              ...el,
              quantity: el.quantity + 1,
            });
          }

          return el;
        }),
      });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: cartItems.concat({
          id: phoneId,
          quantity: 1,
          product: phoneData[phoneData.findIndex(el => el.phoneId === id)],
          discount: true,
        }),
      });
    }
  };

  const updateFavoriteInContext = (isInFavorite: boolean) => {
    if (isInFavorite) {
      dispatch({
        type: 'UPDATE_FAVORITES',
        payload: favoriteItems
          .filter((el) => el.phoneId !== id),
        // .filter((el) => el.favoriteItem.phoneId !== phoneId),
      });
    } else {
      dispatch({
        type: 'UPDATE_FAVORITES',
        payload: favoriteItems
          .concat(phoneData[phoneData
            .findIndex(el => el.phoneId === id)]),
        // payload: [...favoriteItems, { favoriteItem: data, discount }],
      });
    }
  };

  useEffect(() => {
    setCurrentPhoto(`_new/${images[0]}`);
  }, [images]);

  // useEffect(() => {
  //   loadPhonDetails();
  // }, [phoneId]);

  const inCart = cartItems.some((el) => (
    el.id === phoneId
  ));

  const inFavorite = favoriteItems.some((el) => (
    el.phoneId === id
  ));

  return (
    <div className="phoneDetails">
      <nav className="phoneDetails__nav">
        <div className="phoneDetails__navBreadcrumbs">
          <Breadcrumbs page="phones" name={name} />
        </div>
        <div className="phoneDetails__navBack">
          <Back data-cy="backButton" />
        </div>
      </nav>
      <h1 className="phoneDetails__title">
        {name}
      </h1>
      <section className="phoneDetails__section">
        <div className="phoneDetails__photos">
          <div className="phoneDetails__photosSmall">
            <ul className="phoneDetails__listItems">
              {images.map((photo) => (
                <li
                  className="phoneDetails__listItem"
                  key={photo}
                >
                  <button
                    className="phoneDetails__listItemButton"
                    type="button"
                    onClick={() => changeBigPhoto(photo)}
                  >
                    <img
                      src={`_new/${photo}`}
                      alt=""
                      className="phoneDetails__listItemImage"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="phoneDetails__photo">
            <img
              src={currentPhoto}
              alt=""
              className="phoneDetails__photoBig"
            />
          </div>
        </div>
        {/* // ! start info -> move to some component */}
        <div className="phoneDetails__info">
          <div className="phoneDetails__infoSelect infoSelect">
            <h5 className="infoSelect__text">
              Available colors
            </h5>

            <ul className="infoSelect__colors colorsList">
              {colorsAvailable.map((colorItem) => (
                <li
                  className="colorsList__item"
                  key={colorItem}
                >
                  <Link
                    to={`../${namespaceId}-${capacity}-${colorItem}`}
                    className="infoSelect__color"
                    style={{ backgroundColor: colorItem }}
                  />
                </li>
              ))}
            </ul>

            <span className="infoSelect__underline" />

            <h5 className="infoSelect__text">
              Select capacity
            </h5>

            <ul className="infoSelect__capacities">
              {capacityAvailable.map((capacityModel) => (
                <li
                  key={capacityModel}
                  className="infoSelect__capacity"
                >
                  <Link
                    to={`../${namespaceId}-${capacityModel}-${color}`}
                    className={classNames('infoSelect__capacitiesBtn', {
                      'infoSelect__capacitiesBtn--selected':
                      capacity === capacityModel,
                    })}
                  >
                    {capacityModel}
                  </Link>
                </li>
              ))}
            </ul>

            <span
              className="infoSelect__underline infoSelect__underline--mb32"
            />

            <div className="infoSelect__price">
              <span className="infoSelect__priceDiscount">
                {`$${priceDiscount}`}
              </span>
              <span className="infoSelect__priceRegular">
                {`$${priceRegular}`}
              </span>
            </div>

            <div className="infoSelect__buttonsWrapper">
              <button
                onClick={() => updateStateContext(inCart)}
                type="button"
                className={
                  classNames('infoSelect__btnAddToCart', {
                    'infoSelect__btnAddToCart--includes': inCart,
                  })
                }
              >
                { inCart ? 'Added to cart' : 'Add to cart' }
              </button>

              <button
                className="infoSelect__button-favorite"
                data-cy="addToFavorite"
                type="button"
                aria-label="add-to-favorite"
                onClick={() => updateFavoriteInContext(inFavorite)}
              >
                <span className={
                  classNames('icon icon-hearth', {
                    'icon-hearth--selected': inFavorite,
                  })
                }
                />
              </button>
            </div>

            <ul className="infoSelect__list">
              <li className="infoSelect__listItem">
                <span className="infoSelect__listTitle">
                  Screen
                </span>
                <span className="infoSelect__listSpecs">
                  {screen}
                </span>
              </li>

              <li className="infoSelect__listItem">
                <span className="infoSelect__listTitle">
                  Resolution
                </span>
                <span className="infoSelect__listSpecs">
                  {resolution}
                </span>
              </li>

              <li className="infoSelect__listItem">
                <span className="infoSelect__listTitle">
                  Processor
                </span>
                <span className="infoSelect__listSpecs">
                  {processor}
                </span>
              </li>

              <li className="infoSelect__listItem">
                <span className="infoSelect__listTitle">
                  RAM
                </span>
                <span className="infoSelect__listSpecs">
                  {ram}
                </span>
              </li>
            </ul>
          </div>

          <div className="phoneDetails__infoId">
            <h5 className="phoneDetails__infoIdText">ID: 802390</h5>
          </div>
        </div>

        <div
          className="phoneDetails__description description"
          data-cy="productDescription"
        >
          <h2 className="description__title">
            About
          </h2>

          <span className="infoSelect__underline infoSelect__underline--mb32" />

          <DescriptionList
            description={description}
          />
        </div>

        <div className="phoneDetails__specification specification">
          <h2 className="specification__title">
            Tech specs
          </h2>

          <span className="infoSelect__underline" />

          <PhoneSpecs
            screen={screen}
            resolution={resolution}
            processor={processor}
            ram={ram}
            capacity={capacity}
            camera={camera}
            zoom={zoom}
            cell={cell}
          />
        </div>

      </section>
    </div>
  );
};
