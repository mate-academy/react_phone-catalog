import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Product, ProductSpecs } from '../../types/Product';
import styles from './ProductDetails.module.scss';
import icons from '../../assets/icons/icons.svg';
import { Button } from '../UI/Button';
import { ProductsContext } from '../../store/ProductsContext';
import classNames from 'classnames';

type Props = {
  productDetails: ProductSpecs;
  product: Product;
};

export const ProductDetails: React.FC<Props> = ({
  productDetails,
  product,
}) => {
  const {
    name,
    images,
    priceRegular,
    priceDiscount,
    screen,
    colorsAvailable,
    color,
    capacityAvailable,
    resolution,
    processor,
    description,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = productDetails;

  const { id } = product;
  const { favorites, SetRemoveFromFavorites, SetAddToFavorites } =
    useContext(ProductsContext);
  const [displayedImageIndex, setDisplayedImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [selectedCapacity, setSelectedCapacity] = useState<string>(capacity);
  const navigate = useNavigate();

  const location = useLocation();

  const colorMapping: { [key: string]: string } = {
    'space gray': '#6E6E73',
    spacegray: '#6E6E73',
    'space-gray': '#6E6E73',
    silver: '#C0C0C0',
    gold: '#D4AF37',
    blue: '#0071E3',
    red: '#FF3B30',
    'rose gold': '#B76E79',
    rosegold: '#B76E79',
    green: '#34C759',
    'sky blue': '#87CEEB',
    starlight: '#F9F3EE',
    pink: '#FFD3E1',
    black: '#1C1C1E',
    'midnight green': '#004E3F',
    midnightgreen: '#004E3F',
    midnight: '#001E3C',
    coral: '#FF6F61',
    white: '#F5F5F7',
    yellow: '#FFD60A',
    purple: '#A020F0',
    spaceblack: '#1D1D1F',
    graphite: '#4A4A4C',
    sierrablue: '#9BB5CE',
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [product, productDetails]);

  const isFavorite = favorites.some(favorite => favorite.id === product.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      SetRemoveFromFavorites(product.id);
    } else {
      SetAddToFavorites(product);
    }
  };

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);

    const formattedColor = encodeURIComponent(newColor.toLowerCase().trim());

    const currentPath = location.pathname;

    const parts = currentPath.split('/');

    const productId = parts[parts.length - 1];

    const idParts = productId.split('-');

    idParts[idParts.length - 1] = formattedColor;

    const newProductId = idParts.join('-');

    parts[parts.length - 1] = newProductId;

    const newPath = parts.join('/');

    navigate(newPath);
  };

  const handleCapacityChange = (newCapacity: string) => {
    setSelectedCapacity(newCapacity);

    const currentPath = location.pathname;

    const parts = currentPath.split('/');

    const productId = parts[parts.length - 1];

    const idParts = productId.split('-');

    idParts[idParts.length - 2] = newCapacity.toLowerCase();

    const newProductId = idParts.join('-');

    parts[parts.length - 1] = newProductId;

    const newPath = parts.join('/');

    navigate(newPath);
  };

  return (
    <section className={styles.block}>
      <button className={styles.navigationBack} onClick={() => navigate(-1)}>
        <span className={styles.arrowLeft}>
          <svg>
            <use href={`${icons}#arrow-left-icon`}></use>
          </svg>
        </span>
        <span className={styles.back}>Back</span>
      </button>

      <h2 className={styles.title}>{name}</h2>

      <div className={styles.content}>
        <div className={styles.slider}>
          <ul className={styles.imagesList}>
            {images.map((img, index) => (
              <li
                key={img}
                className={`${styles.imagesItem} ${index === displayedImageIndex ? styles.active : ''}`}
              >
                <button
                  type="button"
                  style={{ backgroundImage: `url(${img})` }}
                  className={styles.imagePreview}
                  onClick={() => setDisplayedImageIndex(index)}
                ></button>
              </li>
            ))}
          </ul>

          <div className={styles.imageWrapper}>
            <img src={images[displayedImageIndex]} alt={name} />
          </div>

          <div className={styles.information}>
            <div className={styles.selectors}>
              {selectedColor && (
                <>
                  <p className={styles.selectors__title}>Available colors</p>
                  <div className={styles.selectors__options}>
                    {colorsAvailable.map(col => (
                      <div
                        key={col}
                        className={classNames(styles.wrapperColor, {
                          [styles.active]: col === selectedColor,
                        })}
                        onClick={() => handleColorChange(col)}
                      >
                        <div
                          className={styles.color}
                          style={{
                            backgroundColor: colorMapping[col] || col,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedCapacity && (
                <div className={styles.selectors}>
                  <p className={styles.selectors__title}>Select capacity</p>
                  <div className={styles.selectors__options}>
                    {capacityAvailable.map(item => (
                      <button
                        key={item}
                        className={classNames(styles.capacity, {
                          [styles.active]:
                            item.toLowerCase() ===
                            selectedCapacity.toLowerCase(),
                        })}
                        onClick={() => handleCapacityChange(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.price}>
              <h2 className={styles.priceCurrent}>${priceDiscount}</h2>
              <del className={styles.priceFull}>${priceRegular}</del>
            </div>

            <div className={styles.productCardButtons}>
              <Button product={product} className={styles.customButton} />

              <button
                className={styles.addToFavouriteBtn}
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleToggleFavorite();
                }}
              >
                <svg
                  className={classNames(styles.icon, {
                    [styles.favoriteIcon]: isFavorite,
                  })}
                >
                  {!isFavorite ? (
                    <use href={`${icons}#header-icon-header`}></use>
                  ) : (
                    <use href={`${icons}#heart-icon`}></use>
                  )}
                </svg>
              </button>
            </div>

            <div className={styles.specsWrapper}></div>
            <div className={styles.specs}>
              <ul className={styles.specsList}>
                <li className={styles.specsList__itemSm}>
                  <p className={styles.specsChar}>Screen</p>
                  <p className={styles.specsProperty}>{screen}</p>
                </li>
                <li className={styles.specsList__itemSm}>
                  <p className={styles.specsChar}>Resolution</p>
                  <p className={styles.specsProperty}>{resolution}</p>
                </li>
                <li className={styles.specsList__itemSm}>
                  <p className={styles.specsChar}>Processor</p>
                  <p className={styles.specsProperty}>{processor}</p>
                </li>
                <li className={styles.specsList__itemSm}>
                  <p className={styles.specsChar}>RAM</p>
                  <p className={styles.specsProperty}>{ram}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.id}>ID:{id}</div>
        </div>

        <div className={styles.specsWrapper}>
          <div className={styles.about}>
            <h3 className={styles.titleAbout}>About</h3>
            <ul className={styles.about__list}>
              {description.map((item, index) => (
                <li key={index} className={styles.about__item}>
                  <h4>{item.title}</h4>
                  <p className={styles.description}>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.specs}>
            <h3 className={styles.titleAbout}>Tech specs</h3>
            <ul className={styles.specsList}>
              <li className={styles.specsList__item}>
                <p className={styles.property}>Screen</p>
                <p className={styles.mark}>{screen}</p>
              </li>
              <li className={styles.specsList__item}>
                <p className={styles.property}>Resolution</p>
                <p className={styles.mark}>{resolution}</p>
              </li>
              <li className={styles.specsList__item}>
                <p className={styles.property}>Processor</p>
                <p className={styles.mark}>{processor}</p>
              </li>
              <li className={styles.specsList__item}>
                <p className={styles.property}>RAM</p>
                <p className={styles.mark}>{ram}</p>
              </li>
              <li className={styles.specsList__item}>
                <p className={styles.property}>Built in memory</p>
                <p className={styles.mark}>{capacity}</p>
              </li>
              <li className={styles.specsList__item}>
                <p className={styles.property}>Camera</p>
                <p className={styles.mark}>{camera}</p>
              </li>
              <li className={styles.specsList__item}>
                <p className={styles.property}>Zoom</p>
                <p className={styles.mark}>{zoom}</p>
              </li>
              <li className={styles.specsList__item}>
                <p className={styles.property}>Cell</p>
                <p className={styles.mark}>{cell.join(', ')}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
