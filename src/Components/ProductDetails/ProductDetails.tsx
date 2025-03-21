import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ProductWithYear } from '../../types/product';
import { home, arrowRight, arrowLeft } from '../../icons';
import styles from './ProductDetails.module.scss';
import { useEffect, useState } from 'react';
import { fav } from '../../icons';
import classNames from 'classnames';
import { ProductNotFound } from '../ProductNotFound/ProductNotFound';

type Props = {
  items: ProductWithYear[];
};

export const ProductDetails: React.FC<Props> = ({ items }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = items.find(item => item.id === productId);

  const [photo, setPhoto] = useState(product?.images[0] || '');
  const defaultCapacity = product?.capacity || '';
  const defaultColor = product?.color || '';

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedCapacity, setSelectedCapacity] = useState(defaultCapacity);

  if (!product) {
    return <ProductNotFound name={productId!} />;
  }

  const capitalizedPath =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const getImageClass = (image: string) => {
    return classNames(styles.imageContainer, {
      [styles.activeImage]: image === photo,
    });
  };

  const updateProductUrl = (color: string, capacity: string) => {
    const newColor = color.toLocaleLowerCase().split(' ').join('-');
    const newCapacity = capacity.toLocaleLowerCase();
    const newProductId = `${product.namespaceId}-${newCapacity}-${newColor}`;

    navigate(`/${product.category}/${newProductId}`, { replace: false });
    window.scrollTo(0, 0);
    setSelectedColor(color);
    setSelectedCapacity(capacity);
  };

  const colorMap: Record<string, string> = {
    gold: '#FCDBC1',
    midnightgreen: '#5F7170',
    spacegray: '#4C4C4C',
    silver: '#F0F0F0',
    black: '#000000',
    rosegold: '#DEA193',
    coral: '#FFA38C',
    yellow: '#FFFF00',
    white: '#FFFFFF',
    red: '#D1001F',
    midnight: '#272757',
    purple: '#CC8899',
    spaceblack: '#333334',
    pink: '#FFB5C0',
    blue: '#1260CC',
    graphite: '#414141',
    sierrablue: '#BFDAF7',
    green: '#008000',
  };

  return (
    <div className={styles.marginContainer}>
      <div className={styles.navContainer}>
        <NavLink to="/">
          <img src={home} alt="home-icon" className={styles.homeIcon} />
        </NavLink>
        <img src={arrowRight} alt="arrow-right" className={styles.arrowIcon} />
        <NavLink
          to={`/${product.category}`}
          className={styles.locationContainer}
        >
          <p className={styles.location}>{capitalizedPath}</p>
        </NavLink>
        <img src={arrowRight} alt="arrow-right" className={styles.arrowIcon} />
        <p className={styles.productLinkName}>{product.name}</p>
      </div>
      <div className={styles.backContainer} onClick={() => navigate(-1)}>
        <img src={arrowLeft} alt="arrow-left" className={styles.arrowIcon} />
        <p className={styles.backButton}>Back</p>
      </div>
      <h1 className={styles.title}>{product.name}</h1>
      <div className={styles.mainContent}>
        <div className={styles.imagesContainer}>
          <div className={styles.imageWrapper}>
            {product.images.map(image => {
              return (
                <div
                  key={image}
                  className={getImageClass(image)}
                  onClick={() => setPhoto(image)}
                >
                  <img
                    src={image}
                    alt={product.name}
                    className={styles.image}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.mainPhotoContainer}>
            <img src={photo} alt="main-photo" className={styles.mainPhoto} />
          </div>
        </div>

        <div className={styles.optionsContainer}>
          <div className={styles.optionContainer}>
            <h3 className={styles.optionsTitle}>Available colors</h3>
            <div className={styles.colorOptions}>
              {product.colorsAvailable.map(color => (
                <label
                  key={color}
                  className={`${styles.colorOption} ${selectedColor === color ? styles.active : ''}`}
                  onClick={() => updateProductUrl(color, selectedCapacity)}
                >
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    readOnly
                  />
                  <p className={styles.hidden}>{color}</p>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: colorMap[color] || '#000' }}
                  ></div>
                </label>
              ))}
            </div>
          </div>
          <hr className={styles.lines} />
          <div className={styles.capacityOptionContainer}>
            <h3 className={styles.optionsTitle}>Select capacity</h3>
            <div className={styles.capacityOptions}>
              {product.capacityAvailable.map(capacity => (
                <label
                  key={capacity}
                  className={`${styles.capacityOption} ${selectedCapacity === capacity ? styles.active : ''}`}
                  onClick={() => updateProductUrl(selectedColor, capacity)}
                >
                  <input
                    type="radio"
                    name="capacity"
                    value={capacity}
                    checked={selectedCapacity === capacity}
                    readOnly
                  />
                  {capacity.replace(/(\d+)([A-Za-z]+)/, '$1\u00A0$2')}
                </label>
              ))}
            </div>
          </div>
          <hr className={styles.lines} />
          <div className={styles.shoppingContainer}>
            <div className={styles.priceContainer}>
              <p className={styles.priceDiscount}>${product.priceDiscount}</p>
              <p className={styles.priceRegular}>${product.priceRegular}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.buttonAdd}>Add to cart</button>
              <button className={styles.buttonFav}>
                <img src={fav} alt="favourites-heart-icon" />
              </button>
            </div>
          </div>

          <div className={styles.techContainer}>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Screen</p>
              <p className={styles.techParams}>{product.screen}</p>
            </div>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Resolution</p>
              <p className={styles.techParams}>{product.resolution}</p>
            </div>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Processor</p>
              <p className={styles.techParams}>{product.processor}</p>
            </div>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>RAM</p>
              <p className={styles.techParams}>{product.ram}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.secondaryContent}>
        <div className={styles.aboutContainer}>
          <h3 className={styles.aboutTitle}>About</h3>
          <hr className={styles.lines} />
          {product.description.map(content => {
            return (
              <div key={content.title} className={styles.descriptionContainer}>
                <h4 className={styles.descriptionTitle}>{content.title}</h4>
                {content.text.map((paragraph, index) => (
                  <p key={index} className={styles.descriptionText}>
                    {paragraph}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
        <div className={styles.techSpecs}>
          <h3 className={styles.aboutTitle}>Tech specs</h3>
          <hr className={styles.lines} />
          <div className={styles.techContainer}>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Screen</p>
              <p className={styles.techParams}>{product.screen}</p>
            </div>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Resolution</p>
              <p className={styles.techParams}>{product.resolution}</p>
            </div>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Processor</p>
              <p className={styles.techParams}>{product.processor}</p>
            </div>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>RAM</p>
              <p className={styles.techParams}>{product.ram}</p>
            </div>
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Built in memory</p>
              <p className={styles.techParams}>{product.capacity}</p>
            </div>
            {product.camera && (
              <div className={styles.singleTech}>
                <p className={styles.techTitle}>Camera</p>
                <p className={styles.techParams}>{product.camera}</p>
              </div>
            )}
            {product.zoom && (
              <div className={styles.singleTech}>
                <p className={styles.techTitle}>Zoom</p>
                <p className={styles.techParams}>{product.zoom}</p>
              </div>
            )}
            <div className={styles.singleTech}>
              <p className={styles.techTitle}>Cell</p>
              <p className={styles.techParams}>{product.cell.join(' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
