import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useEffect, useState } from 'react';
import {
  getProductsFromApi,
  getDetailedProductByCategory,
  getSuggestedProducts,
} from '../../utils/api';
import { Products } from '../../types/Products';
import classNames from 'classnames';
import { ProductsSlider } from '../../../HomePage/components/ProductsSlider';
import { useFavourites } from '../../contexts/FavouritesContext';
import { useCart } from '../../contexts/CartContext';
import { Loader } from '../Loader';
import { scrollToTop } from '../../utils/functions';

const colorsPrograms: Record<string, string> = {
  midnight: '#191970',
  yellow: '#E5E0C1',
  purple: '#e6ddeb',
  black: '#202020',
  green: '#ADE1CD',
  white: '#FFE681',
  red: '#BA0C2E',
  spaceblack: '#403E3D',
  gold: '#F4E8CE',
  graphite: '#6e6967',
  sierrablue: '#a7c1d9',
  pink: '#FADDD7',
  blue: '#A7C1D9',
  silver: '#C0C0C0',
  coral: '#FF7F50',
  rosegold: '#B76E79',
  midnightgreen: '#4E5851',
};

export const ProductDetailsPage = () => {
  const [detailedDevice, setDetailedDevice] = useState<Products>();
  const [shuffledDevices, setShuffledDevices] = useState<Products[]>();

  const fullLocation =
    window.location.pathname +
    window.location.hash.split('/').slice(0, -1).join('/');

  const { favIconsId, toggleFavourite } = useFavourites();
  const { isInCart, addToCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [clickedPhoto, setClickedPhoto] = useState(0);

  const navigate = useNavigate();
  const { productId } = useParams();

  const phoneWithoutColor = detailedDevice?.id
    .split('-')
    .slice(0, -1)
    .join('-');
  const phoneWithoutMemory = detailedDevice?.id
    .split('-')
    .slice(0, -2)
    .join('-');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getProductsFromApi()
      .then(async devicesFromApi => {
        const foundInCatalog = devicesFromApi.find(
          allDevices => allDevices.itemId === productId,
        );

        if (!foundInCatalog || !productId) {
          setErrorMessage('Product was not found');

          return;
        }

        const detailed = await getDetailedProductByCategory(
          foundInCatalog.category,
          productId,
        );

        if (!detailed) {
          setErrorMessage('Product was not found');

          return;
        }

        setDetailedDevice(detailed);
      })
      .catch(() => {
        setErrorMessage('Error, please try again');
      })
      .finally(() => {
        setIsLoading(false);
      });

    getSuggestedProducts()
      .then(products => {
        if (!products) {
          return;
        }

        setShuffledDevices(products);
      })
      .catch(() => {
        setErrorMessage('Error, please try again');
      });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage || !detailedDevice) {
    return (
      <>
        <img
          src="img/product-not-found.png"
          alt="notFound"
          className={styles.notFoundPhoto}
        />
        <p className={styles.notFoundText}>
          {errorMessage || 'Product was not found'}
        </p>
      </>
    );
  }

  const {
    color,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    ram,
    id,
    resolution,
    processor,
    camera,
    zoom,
    cell,
  } = detailedDevice;

  const cellItems = cell.join(', ');

  const arrayDevices = shuffledDevices?.filter(deviceModel =>
    deviceModel.namespaceId.includes(phoneWithoutMemory),
  );

  return (
    <div className={styles.productPage}>
      <div className={styles.links}>
        <div className={styles.navigation}>
          <Link to="/">
            <img src="./img/home.svg" alt="homePhoto" />
          </Link>
          <img
            src="./img/arrowRight.svg"
            alt="arrowLeft"
            className={styles.arrrows}
          />
          <Link to={`/${detailedDevice?.category}`} className={styles.title}>
            <p>{detailedDevice?.category}</p>
          </Link>
          <img
            src="./img/arrowRight.svg"
            alt="arrowLeft"
            className={styles.arrrows}
          />
          <p className={styles.detailedDevice}>{detailedDevice?.name}</p>
        </div>

        <div className={styles.back}>
          <button
            className={styles.title}
            onClick={e => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <img src="./img/arrowLeft.svg" alt="arrowLeft" />
          </button>
          <button
            className={styles.title}
            onClick={e => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <p>Back</p>
          </button>
        </div>
      </div>

      <h1 className={styles.detailedName}>{detailedDevice?.name}</h1>

      <div className={styles.productTitle}>
        <div className={styles.ptohos}>
          <div className={styles.allPhotos}>
            {detailedDevice?.images.map(image => {
              return (
                <img
                  src={image || 'img/product-not-found.png'}
                  alt={image}
                  key={image}
                  className={styles.images}
                  onClick={() =>
                    setClickedPhoto(detailedDevice.images.indexOf(image))
                  }
                />
              );
            })}
          </div>
        </div>

        <div className={styles.currentphoto}>
          <img
            src={
              detailedDevice.images[clickedPhoto] || 'img/product-not-found.png'
            }
            alt="currentPhoto"
            className={styles.currentPhoto}
          />
        </div>

        <div className={styles.productSettings}>
          <p>Available colors</p>
          <div className={styles.productColors}>
            {detailedDevice?.colorsAvailable.map(availableColor => (
              <input
                type="radio"
                name="color"
                checked={availableColor === color}
                className={classNames(styles.colorBlock, {
                  [styles.colorActive]: availableColor === color,
                })}
                key={availableColor}
                style={{ backgroundColor: colorsPrograms[availableColor] }}
                onChange={() => {
                  const newDevice = arrayDevices?.find(
                    device =>
                      device.id === phoneWithoutColor + '-' + availableColor,
                  );

                  if (newDevice) {
                    setDetailedDevice(newDevice);

                    window.history.replaceState(
                      {},
                      '',
                      `${fullLocation}/${newDevice.id}`,
                    );
                  }
                }}
              />
            ))}
          </div>

          <p>Select capacity</p>
          <div className={styles.productCapacity}>
            {detailedDevice?.capacityAvailable.map(memory => {
              return (
                <label
                  key={memory}
                  className={classNames(styles.capacityLabel, {
                    [styles.capacityActive]: memory === capacity,
                  })}
                >
                  <input
                    type="radio"
                    name="capacity"
                    checked={memory === capacity}
                    onChange={() => {
                      const newDevice = arrayDevices?.find(
                        device =>
                          device.id ===
                          `${phoneWithoutMemory}-${memory.toLowerCase()}-${color}`,
                      );

                      if (newDevice) {
                        setDetailedDevice(newDevice);

                        window.history.replaceState(
                          {},
                          '',
                          `${fullLocation}/${newDevice.id}`,
                        );
                      }
                    }}
                  />
                  <span>{memory}</span>
                </label>
              );
            })}
          </div>

          <div className={styles.productCount}>
            <div className={styles.catalogPrice}>
              <p className={styles.catalogCurrentPrice}>
                ${priceDiscount || priceRegular}
              </p>

              {priceDiscount && (
                <p className={styles.catalogOldPrice}>${priceRegular}</p>
              )}
            </div>

            <div className={styles.catalogButtons}>
              <button
                className={classNames(styles.button, {
                  [styles.selectedPhone]: isInCart(id),
                  [styles.buttonsBuy]: !isInCart(id),
                })}
                disabled={isInCart(id)}
                onClick={() => {
                  addToCart(id);
                }}
              >
                {isInCart(id) ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={classNames(
                  styles.button,
                  styles.buttonsLike,
                  'icons',
                )}
                onClick={() => {
                  toggleFavourite(id);
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/img/${favIconsId.includes(id) ? 'likeClicked.svg' : 'like.svg'}`}
                  alt="logo"
                  className="logo"
                />
              </button>
            </div>

            <div className={styles.catalogSettings}>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td className={styles.title}>screen</td>
                    <td className={styles.result}>{screen}</td>
                  </tr>
                  <tr>
                    <td className={styles.title}>Resolution</td>
                    <td className={styles.result}>{resolution}</td>
                  </tr>
                  <tr>
                    <td className={styles.title}>Processor</td>
                    <td className={styles.result}>{processor}</td>
                  </tr>
                  <tr>
                    <td className={styles.title}>RAM</td>
                    <td className={styles.result}>{ram}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.catalogLegend}>
        <div className={styles.legendAbout}>
          <p className={styles.legendName}>About</p>

          {detailedDevice.description.map(legend => {
            return (
              <div className={styles.description} key={legend.title}>
                <p className={styles.legendTitle}>{legend.title}</p>
                <p className={styles.legendText}>{legend.text}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.legendTechSpecs}>
          <p className={styles.legendName}>Tech specs</p>
          <table className={styles.legendTable}>
            <tbody>
              <tr>
                <td className={styles.legendText}>Screen</td>
                <td className={styles.result}>{screen}</td>
              </tr>
              <tr>
                <td className={styles.legendText}>Resolution</td>
                <td className={styles.result}>{resolution}</td>
              </tr>
              <tr>
                <td className={styles.legendText}>Processor</td>
                <td className={styles.result}>{processor}</td>
              </tr>
              <tr>
                <td className={styles.legendText}>RAM</td>
                <td className={styles.result}>{ram}</td>
              </tr>
              <tr>
                <td className={styles.legendText}>Built in memory</td>
                <td className={styles.result}>{capacity}</td>
              </tr>
              <tr>
                <td className={styles.legendText}>Camera</td>
                <td className={styles.result}>{camera}</td>
              </tr>
              <tr>
                <td className={styles.legendText}>Zoom</td>
                <td className={styles.result}>{zoom}</td>
              </tr>
              <tr>
                <td className={styles.legendText}>Cell</td>
                <td className={styles.result}>{cellItems}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.catalogCommonProducts} onClick={scrollToTop}>
        <ProductsSlider
          product={shuffledDevices ?? []}
          title="You may also like"
          isShowDiscount
        />
      </div>
    </div>
  );
};
