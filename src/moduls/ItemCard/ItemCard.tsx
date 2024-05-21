/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import './ItemCard.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../context/ContextReducer';
import cn from 'classnames';
import { Path } from '../../componentsApp/Path/Path';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablets';
import { Accessorie } from '../../types/accessories';
import { Loader } from '../../componentsApp/Loader/Loader';
import { getRandomNumber } from '../../utils/randomDevice';
import { BrandList } from '../../componentsApp/SlideListDevices/BrandList/BrandList';

export const ItemCard: React.FC = () => {
  const {
    phones,
    Tablets,
    Accessories,
    cartPhone,
    favoritesDevice,
    mainItemPhoto,
    darkThem,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { pathname } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [allDevice, setAllDevice] = useState<(Phone | Tablet | Accessorie)[]>(
    [],
  );

  const allProducts: (Phone | Tablet | Accessorie)[] = [
    ...Accessories,
    ...phones,
    ...Tablets,
  ];

  const itemDevice = allProducts.find(d => d.id === productId);

  useEffect(() => {
    const randomFromZero = getRandomNumber(0, 10);

    const endIndexAccessories = getRandomNumber(
      randomFromZero,
      Accessories.length,
    );
    const endIndexPhones = getRandomNumber(randomFromZero, phones.length);
    const endIndexTablets = getRandomNumber(randomFromZero, Tablets.length);

    const selectedAccessories = Accessories.slice(
      randomFromZero,
      endIndexAccessories,
    );
    const selectedPhones = phones.slice(randomFromZero, endIndexPhones);
    const selectedTablets = Tablets.slice(randomFromZero, endIndexTablets);

    const allDevices = [
      ...selectedPhones,
      ...selectedTablets,
      ...selectedAccessories,
    ];

    setAllDevice(allDevices);

    if (itemDevice && itemDevice.images && itemDevice.images.length > 0) {
      dispatch({
        type: 'setMainItemPhoto',
        payload: `../${itemDevice.images[0]}`,
      });
    }
  }, [itemDevice, dispatch]);

  const filteredMapPhone = allDevice.filter(phone => {
    return (
      !favoritesDevice?.some(favorite => favorite.id === phone.id) &&
      !cartPhone?.some(card => card.id === phone.id)
    );
  });

  const relativeNavigate = (newId: string) => {
    if (pathname.includes('phones')) {
      navigate(`/phones/${newId}`);
    } else if (pathname.includes('tablets')) {
      navigate(`/tablets/${newId}`);
    } else if (pathname.includes('accessorie')) {
      navigate(`/accessories/${newId}`);
    } else {
      navigate(`/${newId}`);
    }
  };

  const handleColorClick = (newColor: string) => {
    const completedColor = newColor.replaceAll(' ', '-');

    if (productId) {
      const newId = (splitId: string[]) => {
        switch (splitId.length) {
          case 5:
            return splitId.slice(0, 4).concat(completedColor).join('-');

          case 6:
            return splitId.slice(0, 5).concat(completedColor).join('-');

          case 7:
            if (productId.includes('watch')) {
              return splitId.slice(0, 5).concat(completedColor).join('-');
            }

            return splitId.slice(0, 6).concat(completedColor).join('-');

          case 8:
            return splitId.slice(0, 6).concat(completedColor).join('-');

          default:
            return splitId.join('-');
        }
      };

      const newItemId = newId(productId.split('-'));
      const newItem = allProducts.find(p => p.id === newItemId);

      if (newItem) {
        relativeNavigate(newItemId);
      }
    }
  };

  const handleCLickCapacity = (capacity: string) => {
    if (productId) {
      const newId = (item: Tablet | Phone | Accessorie, splitId: string[]) => {
        switch (splitId.length) {
          case 5:
            return splitId
              .slice(0, 3)
              .concat(capacity)
              .concat(item.id.split('-')[4])
              .join('-')
              .toLowerCase();

          case 6:
            return splitId
              .slice(0, 4)
              .concat(capacity)
              .concat(item.id.split('-')[5])
              .join('-')
              .toLowerCase();

          case 7:
            if (productId.includes('watch')) {
              return splitId
                .slice(0, 4)
                .concat(capacity)
                .concat(item.id.split('-').slice(-2))
                .join('-')
                .toLowerCase();
            }

            return splitId
              .slice(0, 5)
              .concat(capacity)
              .concat(item.id.split('-')[6])
              .join('-')
              .toLowerCase();

          case 8:
            return splitId
              .slice(0, 5)
              .concat(capacity)
              .concat(item.id.split('-').slice(-2))
              .join('-')
              .toLowerCase();

          default:
            return splitId.join('-');
        }
      };

      const currentUrlItem = allProducts.find(p => p.id === productId);

      if (currentUrlItem) {
        const newItemId = newId(currentUrlItem, productId.split('-'));
        const newItem = allProducts.find(p => p.id === newItemId);

        if (newItem) {
          relativeNavigate(newItemId);
        }
      }
    }
  };

  const reChangeColor = (color: string) => {
    switch (color) {
      case 'rose gold':
        return '#F88CB7';

      case 'sky blue':
        return '#7EA7E4';

      case 'midnight':
        return '#566170';

      case 'spaceblack':
        return '#171E27';

      case 'space gray':
      case 'spacegray':
        return '#2A2A2B';

      case 'starlight':
        return '#E1E0D7';

      default:
        return color;
    }
  };

  if (!itemDevice) {
    return (
      <div className="ItemCard__loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="ItemCard">
      <div className="ItemCard__center">
        <Path pathname={pathname} itemPhone={itemDevice} />

        <div className="ItemCard__back">
          <div className="ItemCard__path__chevron ItemCard__path__chevron__back"></div>
          <button
            onClick={() => {
              navigate(-1);
              dispatch({ type: 'resetAlsoLikeSLide' });
            }}
            className={cn('ItemCard__back__link', { dark: darkThem })}
          >
            Back
          </button>
        </div>

        <div className="ItemCard__top">
          <h1 className={cn('ItemCard__top__title', { dark: darkThem })}>
            {itemDevice.name}
          </h1>
        </div>

        <div className="ItemCard__main">
          <div className="ItemCard__main__photos">
            <div className="ItemCard__main__photos__side-photos">
              {itemDevice.images.map(img => (
                <div
                  key={img}
                  onClick={() => {
                    dispatch({
                      type: 'setMainItemPhoto',
                      payload: `../${img}`,
                    });
                  }}
                  className={cn('ItemCard__main__photos__side-photos__photo', {
                    'is-active': mainItemPhoto === `../${img}`,
                    dark: darkThem,
                  })}
                >
                  <img
                    src={`../${img}`}
                    alt={img}
                    className="ItemCard__main__photos__side-photos__photo__img"
                  />
                </div>
              ))}
            </div>

            <div className="hidden">
              <TransitionGroup>
                <CSSTransition
                  key={mainItemPhoto}
                  classNames="slide"
                  timeout={300}
                  unmountOnExit
                  mountOnEnter
                >
                  <div className="ItemCard__main__photos__main-photo">
                    {mainItemPhoto && (
                      <img
                        src={mainItemPhoto}
                        alt="main-photo"
                        className="ItemCard__main__photos__main-photo__img"
                      />
                    )}
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>

          <div className="ItemCard__main__info">
            <div
              className={cn('ItemCard__main__info__colors', { dark: darkThem })}
            >
              <div className="ItemCard__main__info__colors__header">
                <p className="ItemCard__main__info__colors__title">
                  Available colors
                </p>
                <p className="ItemCard__main__info__colors__title">{`ID: 1232332`}</p>
              </div>

              <div className="ItemCard__main__info__colors__select">
                {itemDevice.colorsAvailable.map(c => (
                  <div
                    key={c}
                    className={cn(
                      'ItemCard__main__info__colors__select__color',
                      { 'is-active': itemDevice.color === c, dark: darkThem },
                    )}
                  >
                    <div
                      onClick={() => handleColorClick(c)}
                      className={cn(
                        'ItemCard__main__info__colors__select__color__background',
                        { dark: darkThem },
                      )}
                      style={{
                        backgroundColor: reChangeColor(c),
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={cn('ItemCard__main__info__capacity', {
                dark: darkThem,
              })}
            >
              <p className="ItemCard__main__info__colors__title">
                Select capacity
              </p>

              <div className="ItemCard__main__info__capacity__items">
                {itemDevice.capacityAvailable.map(cap => (
                  <div
                    key={cap}
                    onClick={() => handleCLickCapacity(cap)}
                    className={cn(
                      'ItemCard__main__info__capacity__items__item',
                      {
                        'is-active': itemDevice.capacity === cap,
                        dark: darkThem,
                      },
                    )}
                  >
                    {cap}
                  </div>
                ))}
              </div>
            </div>

            <div className="ItemCard__main__info__card">
              <div className="ItemCard__main__info__card__prices">
                <p
                  className={cn(
                    'ItemCard__main__info__card__prices__discount',
                    { dark: darkThem },
                  )}
                >
                  {`$${itemDevice.priceDiscount}`}
                </p>

                <p className="ItemCard__main__info__card__prices__regular">
                  {`$${itemDevice.priceRegular}`}
                </p>
              </div>

              <div className="ItemCard__main__info__card__buttons">
                <button
                  onClick={() =>
                    dispatch({ type: 'addCart', payload: itemDevice })
                  }
                  className={cn(
                    'ItemCard__main__info__card__buttons__addCard',
                    {
                      'is-active': cartPhone?.find(p => p.id === itemDevice.id),
                      dark: darkThem,
                    },
                  )}
                >
                  Add to cart
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: 'addFavorites', payload: itemDevice })
                  }
                  className={cn(
                    'ItemCard__main__info__card__buttons__favorites',
                    {
                      'is-active': favoritesDevice?.find(
                        p => p.id === itemDevice.id,
                      ),
                      dark: darkThem,
                    },
                  )}
                ></button>
              </div>

              <div className="ItemCard__main__info__card__params">
                <div className="BrandItem__bottom__Screen">
                  <p className="BrandItem__bottom__title">Screen</p>
                  <p
                    className={cn('BrandItem__bottom__param', {
                      dark: darkThem,
                    })}
                  >
                    {itemDevice.screen}
                  </p>
                </div>

                <div className="BrandItem__bottom__Screen">
                  <p className="BrandItem__bottom__title">Capacity</p>
                  <p
                    className={cn('BrandItem__bottom__param', {
                      dark: darkThem,
                    })}
                  >
                    {itemDevice.capacity}
                  </p>
                </div>

                <div className="BrandItem__bottom__Screen">
                  <p className="BrandItem__bottom__title">Processor</p>
                  <p
                    className={cn('BrandItem__bottom__param', {
                      dark: darkThem,
                    })}
                  >
                    {itemDevice.processor}
                  </p>
                </div>

                <div className="BrandItem__bottom__Screen">
                  <p className="BrandItem__bottom__title">RAM</p>
                  <p
                    className={cn('BrandItem__bottom__param', {
                      dark: darkThem,
                    })}
                  >
                    {itemDevice.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ItemCard__text">
          <div className="ItemCard__text__about">
            <h2
              className={cn('ItemCard__text__about__title', { dark: darkThem })}
            >
              About
            </h2>
            {itemDevice.description.map(d => (
              <div key={d.title} className="ItemCard__text__about__items">
                <h3
                  className={cn('ItemCard__text__about__title-second', {
                    dark: darkThem,
                  })}
                >
                  {d.title}
                </h3>
                <p className="ItemCard__text__about__description">{d.text}</p>
              </div>
            ))}
          </div>

          <div className="ItemCard__text__tech-specs">
            <h2 className="ItemCard__text__about__title">Tech specs</h2>

            <div className="ItemCard__main__info__card__params">
              <div className="BrandItem__bottom__Screen">
                <p className="BrandItem__bottom__title">Screen</p>
                <p
                  className={cn('BrandItem__bottom__param', { dark: darkThem })}
                >
                  {itemDevice.screen}
                </p>
              </div>

              <div className="BrandItem__bottom__Screen">
                <p className="BrandItem__bottom__title">Resolution</p>
                <p
                  className={cn('BrandItem__bottom__param', { dark: darkThem })}
                >
                  {itemDevice.resolution}
                </p>
              </div>

              <div className="BrandItem__bottom__Screen">
                <p className="BrandItem__bottom__title">Processor</p>
                <p
                  className={cn('BrandItem__bottom__param', { dark: darkThem })}
                >
                  {itemDevice.processor}
                </p>
              </div>

              <div className="BrandItem__bottom__Screen">
                <p className="BrandItem__bottom__title">RAM</p>
                <p
                  className={cn('BrandItem__bottom__param', { dark: darkThem })}
                >
                  {itemDevice.ram}
                </p>
              </div>

              <div className="BrandItem__bottom__Screen">
                <p className="BrandItem__bottom__title">Built in memory</p>
                <p
                  className={cn('BrandItem__bottom__param', { dark: darkThem })}
                >
                  {itemDevice.capacity}
                </p>
              </div>

              <div className="BrandItem__bottom__Screen">
                {itemDevice.camera && (
                  <>
                    <p className="BrandItem__bottom__title">Camera</p>
                    <p
                      className={cn('BrandItem__bottom__param', {
                        dark: darkThem,
                      })}
                    >
                      {itemDevice.camera}
                    </p>
                  </>
                )}
              </div>

              <div className="BrandItem__bottom__Screen">
                {itemDevice.zoom && (
                  <>
                    <p className="BrandItem__bottom__title">Zoom</p>
                    <p
                      className={cn('BrandItem__bottom__param', {
                        dark: darkThem,
                      })}
                    >
                      {itemDevice.zoom}
                    </p>
                  </>
                )}
              </div>

              <div className="BrandItem__bottom__Screen">
                <p className="BrandItem__bottom__title">Cell</p>

                <p
                  className={cn('BrandItem__bottom__param', { dark: darkThem })}
                >
                  {itemDevice.cell.join(' ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ItemCard__Also-like">
          <BrandList devicesForRender={filteredMapPhone} title="Also like" />
        </div>
      </div>
    </div>
  );
};
