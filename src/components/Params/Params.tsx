import classNames from 'classnames';
import styles from './Params.module.scss';
import { UseHooks } from '../../AppHooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import fav from '../../assets/Icons/Favourites.svg';
import favFilled from '../../assets/Icons/Favourites-filled.svg';
import { getData } from '../../services';
import { DeviceFull } from '../../types/DeviceFull';
import { ParamsContextProvider, ParamsHooks } from './ParamsHooks';

const Params1 = () => {
  const {
    currentDevice,
    setCurrentDevice,
    hotProducts,
    cartItems,
    setCartItems,
    favourites,
    setFavourites,
    allProducts,
  } = UseHooks();
  const { setLoadingParams, setErrorParams } = ParamsHooks();

  const navigate = useNavigate();
  const { productId } = useParams();
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];

  const colorStyle = (color: string) => {
    let hashColor = '';

    switch (color) {
      case 'midnight':
        hashColor = '#282442';
        break;
      case 'spaceblack':
        hashColor = '#404140';
        break;
      case 'graphite':
        hashColor = '#41424C';
        break;
      case 'gold':
        hashColor = '#FFD700';
        break;
      case 'sierrablue':
        hashColor = '#BFDAF7';
        break;
      case 'white':
        hashColor = '#F0F0F0';
        break;
      case 'blue':
        hashColor = '#007AFF';
        break;
      case 'spacegray':
        hashColor = '#4f5b66';
        break;
      case 'midnightgreen':
        hashColor = '#004953';
        break;
      case 'space gray':
        hashColor = '#4f5b66';
        break;
      default:
        hashColor = color;
    }

    return {
      backgroundColor: `${hashColor}`,
    };
  };

  const changeColor = (color: string) => {
    setLoadingParams(true);
    getData<DeviceFull[]>(category)
      .then(data =>
        data.filter(element => {
          if (
            element.color === color &&
            element.capacity === currentDevice?.capacity &&
            element.namespaceId === currentDevice?.namespaceId
          ) {
            setCurrentDevice(element);
          }
        }),
      )
      .catch(() => setErrorParams(true))
      .finally(() => setLoadingParams(false));
  };

  const changeCapacity = (cap: string) => {
    const linkArray = productId?.slice(10).split('-');

    if (linkArray) {
      linkArray[linkArray?.length - 2] = cap;
      const newProductId = linkArray.join('-');

      navigate(`/${category}/productId=${newProductId}`);
    }
  };

  const shortCurentDevice = allProducts.find(
    element => element.name === currentDevice?.name,
  );

  const chooseHeart = () => {
    if (favourites.some(device => device.id === shortCurentDevice?.id)) {
      return favFilled;
    }

    return fav;
  };

  const handleFavourite = () => {
    if (favourites.some(device => device.id === shortCurentDevice?.id)) {
      setFavourites(prev =>
        prev.filter(device => device.name !== shortCurentDevice?.name),
      );
    } else {
      if (shortCurentDevice) {
        setFavourites(prev => [...prev, shortCurentDevice]);
      }
    }
  };

  const handleCart = () => {
    if (
      !cartItems.some(([device]) => device.id === shortCurentDevice?.id) &&
      shortCurentDevice
    ) {
      setCartItems(prev => [...prev, [shortCurentDevice, 1]]);
    }
  };

  const itemAddedToCart = cartItems.some(
    ([device]) => device.id === shortCurentDevice?.id,
  );

  return (
    <>
      <div className={styles.params}>
        <div className={styles.params__color}>
          <p className={classNames(styles.params__text, 'small-text')}>
            Available colors
          </p>
          <div className={styles.params__allParams}>
            {currentDevice &&
              currentDevice.colorsAvailable.map((color, index) => (
                <div
                  onClick={() => changeColor(color)}
                  key={index}
                  className={classNames(styles.params__colorContainer, {
                    [styles['params__colorContainer--active']]:
                      productId?.includes(color),
                  })}
                >
                  <div
                    className={styles.params__theColor}
                    style={colorStyle(color)}
                  ></div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.params__divider}></div>
        <div className={styles.params__capacity}>
          <p className={classNames(styles.params__text, 'small-text')}>
            Select capacity
          </p>
          <div className={styles.params__allParams}>
            {currentDevice &&
              currentDevice.capacityAvailable.map((cap, index) => (
                <button
                  onClick={() => changeCapacity(cap.toLowerCase())}
                  key={index}
                  className={classNames(
                    styles.params__button,
                    {
                      [styles['params__button--active']]:
                        currentDevice.capacity === cap,
                    },
                    'small-text',
                  )}
                >
                  {cap}
                </button>
              ))}
          </div>
        </div>
        <div className={styles.params__divider}></div>
        <div className={styles.params__price}>
          {hotProducts.some(prod => prod.name === currentDevice?.name) ? (
            <>
              <h2>${currentDevice?.priceDiscount}</h2>
              <p
                className={classNames(styles.params__crossedPrice, 'body-text')}
              >
                ${currentDevice?.priceRegular}
              </p>
            </>
          ) : (
            <h2>${currentDevice?.priceRegular}</h2>
          )}
        </div>
        <div className={styles.buttons}>
          <button
            className={classNames(styles.buttons__add, 'button--black', {
              'button--active': itemAddedToCart,
            })}
            onClick={handleCart}
          >
            {itemAddedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className={classNames(styles.buttons__fav, 'button')}
            onClick={handleFavourite}
          >
            <img src={chooseHeart()} alt="fav" />
          </button>
        </div>
        <div className={styles.chars}>
          <div className={styles.chars__row}>
            <p className="small-text">Screen</p>
            <p className="small-text-black">{currentDevice?.screen}</p>
          </div>
          <div className={styles.chars__row}>
            <p className="small-text">Resolution</p>
            <p className="small-text-black">{currentDevice?.resolution}</p>
          </div>
          <div className={styles.chars__row}>
            <p className="small-text">Processor</p>
            <p className="small-text-black">{currentDevice?.processor}</p>
          </div>
          <div className={styles.chars__row}>
            <p className="small-text">RAM</p>
            <p className="small-text-black">{currentDevice?.ram}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const Params = () => {
  return (
    <ParamsContextProvider>
      <Params1 />
    </ParamsContextProvider>
  );
};
