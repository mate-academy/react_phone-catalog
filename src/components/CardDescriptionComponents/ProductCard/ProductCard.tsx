import cn from 'classnames';

import { Colors } from '../../../types/Colors';
import { useNavigate } from 'react-router-dom';
import { Phone } from '../../../types/PhoneType';
import { Tablet } from '../../../types/TabletType';
import { Accessories } from '../../../types/AccessoriesType';
import { getAccessories, getPhones, getTablets } from '../../../api';
import { Category } from '../../../types/CategoryEnum';
import { useContext, useState } from 'react';
import { FavouritesContext } from '../../../contexts/FavouritesContexr';
import { CartContext } from '../../../contexts/CartContext';
import { CartType } from '../../../types/CartType';

type Props = {
  device: Phone | Tablet | Accessories | null | undefined;
  setDevice: (el: Phone | Tablet | Accessories) => void;
  activedPhoto: string;
  category: string | undefined;
  setActivedPhoto: (el: string) => void;
};

export const ProductCard: React.FC<Props> = ({
  device,
  setDevice,
  activedPhoto,
  category,
  setActivedPhoto,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cart, setCart } = useContext(CartContext);

  const handleError = (err: unknown) => {
    throw new Error((err as Error).message || 'An unknown error occurred');
  };

  const navigate = useNavigate();

  const findDevice = async (
    transmittedCategory: string | undefined,
    criteria: Partial<Phone | Tablet | Accessories>,
  ): Promise<Phone | Tablet | Accessories | null> => {
    if (!transmittedCategory) {
      return null;
    }

    try {
      const fetchFunctions = {
        [Category.phones.toLowerCase()]: getPhones,
        [Category.tablets.toLowerCase()]: getTablets,
        [Category.accessories.toLowerCase()]: getAccessories,
      };

      const fetchFunction = fetchFunctions[transmittedCategory];

      if (!fetchFunction) {
        return null;
      }

      const devices = await fetchFunction();

      return (
        devices.find(loadedDevice =>
          Object.entries(criteria).every(
            ([key, value]) =>
              loadedDevice[key as keyof typeof loadedDevice] === value,
          ),
        ) || null
      );
    } catch (err) {
      handleError(err);

      return null;
    }
  };

  const handleColor = async (color: string) => {
    const updatedDevice = await findDevice(category, {
      namespaceId: device?.namespaceId,
      color,
      capacity: device?.capacity,
    });

    if (updatedDevice) {
      setDevice(updatedDevice);
      setActivedPhoto(updatedDevice.images[0]);
      navigate(`/${updatedDevice.category}/${updatedDevice.id}`, {
        replace: true,
      });
    }
  };

  const handleSelectCapacity = async (capacity: string) => {
    const updatedDevice = await findDevice(category, {
      namespaceId: device?.namespaceId,
      capacity,
      color: device?.color,
    });

    if (updatedDevice) {
      setDevice(updatedDevice);
      setActivedPhoto(updatedDevice.images[0]);
      navigate(`/${updatedDevice.category}/${updatedDevice.id}`, {
        replace: true,
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const deviceCartFind = () => {
    return cart.some(
      (foundItemId: CartType) => foundItemId.itemId === device?.id,
    );
  };

  const deviceFavouritesFind = () => {
    return favourites.some((foundItemId: string) => foundItemId === device?.id);
  };

  const [isInCart, setIsInCart] = useState(deviceCartFind());
  const [isInFavourites, setIsInFavourites] = useState(deviceFavouritesFind());

  const handleAddToCart = (itemId: string | null | undefined) => {
    if (!itemId) {
      return;
    }

    if (isInCart) {
      setCart((prev: CartType[]) =>
        prev.filter(cartItem => cartItem.itemId !== itemId),
      );
    } else {
      setCart((prev: CartType[]) => [...prev, { itemId, count: 1 }]);
    }

    setIsInCart(!isInCart);
  };

  const handleFavourites = (itemId: string | null | undefined) => {
    if (!itemId) {
      return;
    }

    if (isInFavourites) {
      setFavourites((prev: string[]) =>
        prev.filter((deviceItemId: string) => deviceItemId !== itemId),
      );
    } else {
      setFavourites((prev: string[]) => [...prev, itemId]);
    }

    setIsInFavourites(!isInFavourites);
  };

  return (
    <div className="product-card">
      <button
        className="product-card__back"
        onClick={() => goBack()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`icon ${
            isHovered ? 'icon--array--left--purple' : 'icon--array--left--light'
          }`}
        ></div>
        Back
      </button>
      <div className="product-card__title">{device?.name}</div>
      <div className="product-card__imgs-block">
        <img
          src={activedPhoto}
          className="product-card__img--main"
          alt="main images"
        />
        <div className="product-card__imgs">
          {device?.images.map(img => {
            return (
              <div
                onClick={() => {
                  setActivedPhoto(img);
                }}
                className={cn('product-card__img--secondary__block', {
                  // eslint-disable-next-line max-len
                  'product-card__img--secondary__block--is-active':
                    img === activedPhoto,
                })}
                key={img}
              >
                <img
                  src={img}
                  alt="secondary photo device"
                  className="product-card__img--secondary"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="product-card__content">
        <div className="product-card__colors">
          <div className="product-card__colors-title">Available colors</div>
          <div className="product-card__colors-block">
            {device?.colorsAvailable.map(color => {
              return (
                <div
                  className={cn('product-card__color-block', {
                    'product-card__color-block--is-active':
                      device.color === color,
                  })}
                  key={color}
                  onClick={() => handleColor(color)}
                >
                  <button
                    className="product-card__color"
                    style={{ backgroundColor: Colors[color || ''] }}
                  ></button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grey-line"></div>

        <div className="product-card__capacity">
          <div className="product-card__capacity__title">Select capacity</div>
          <div className="product-card__capacity__block">
            {device?.capacityAvailable.map(capacityAvailable => {
              return (
                <button
                  onClick={() => {
                    handleSelectCapacity(capacityAvailable);
                  }}
                  className={cn('product-card__capacity__option', {
                    // eslint-disable-next-line max-len
                    'product-card__capacity__option--is-active':
                      device.capacity === capacityAvailable,
                  })}
                  key={capacityAvailable}
                >
                  {capacityAvailable}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grey-line"></div>

        <div className="product-card__prices">
          <div
            className="
                      product-card__prices__current-price
                    "
          >
            $
            {device?.priceDiscount
              ? device.priceDiscount
              : device?.priceRegular}
          </div>
          {device?.priceDiscount ? (
            <div
              className="
                  product-card__prices__current-price--discount
                "
            >
              ${device.priceRegular}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="product-card__buttons">
          <button
            onClick={() => handleAddToCart(device?.id)}
            className={cn('product-card__buttons__add-to-cart', {
              'product-card__buttons__add-to-cart--is-active': isInCart,
            })}
          >
            {isInCart ? 'Added' : ' Add to cart'}
          </button>
          <button
            onClick={() => handleFavourites(device?.id)}
            className="
                product-card__buttons__add-to-favourites
              "
          >
            <div
              className={cn('icon icon--fovourites', {
                'icon--fovourites--is-active': isInFavourites,
              })}
            ></div>
          </button>
        </div>

        <div
          className="
                  characteristic product-card__characteristic
                "
        >
          <div className="characteristic__block">
            Scren
            <label className="characteristic__label">{device?.screen}</label>
          </div>
          <div className="characteristic__block">
            Resolution
            <label className="characteristic__label">
              {device?.resolution}
            </label>
          </div>
          <div className="characteristic__block">
            Processor
            <label className="characteristic__label">{device?.processor}</label>
          </div>
          <div className="characteristic__block">
            RAM
            <label className="characteristic__label">{device?.ram}</label>
          </div>
        </div>
      </div>
    </div>
  );
};
