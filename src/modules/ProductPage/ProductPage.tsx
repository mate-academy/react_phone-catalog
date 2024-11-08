import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import styles from './ProductPage.module.scss';
import { useContext } from 'react';
import { ProductListContext } from '../../ContextProvider';
import { ProductPageSlider } from './components';
import classNames from 'classnames';
import { useCart } from '../../hooks/useCart';
import { useFavourite } from '../../hooks/useFavourite';
import { formatSpecText } from '../../utils/formatSpecText';
import { idGenerator } from '../../utils/idGenerator';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';
import { SliderTitle } from '../../types/SliderTitle';

export const ProductPage = () => {
  const { state, pathname } = useLocation();
  const { productId: id = '' } = useParams();
  const { productList } = useContext(ProductListContext);
  const navigate = useNavigate();

  const prevPath = pathname
    .split('/')
    .filter(path => path !== '')
    .map(path => '/' + path)
    .slice(0, -1)
    .join('');

  const { search, pathname: path } = state ?? { search: '', pathname: '' };

  const product = productList.find(item => item.id === id);

  const [isAddedToCart, addToCart] = useCart(id, product);
  const [isAddedToFavourite, addToFavourite] = useFavourite(id, product);

  if (!product) {
    return <Navigate to=".." />;
  }

  const {
    name,
    images,
    colorsAvailable,
    color,
    category,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    ram,
    resolution,
    processor,
    description,
    camera,
    zoom,
    cell,
  } = product;

  const productsSameModel = productList.filter(
    item => item.namespaceId === product.namespaceId,
  );

  const goBack = () => {
    if (path) {
      navigate(-1);
    } else {
      navigate({
        pathname: prevPath,
        search,
      });
    }
  };

  const changeSpec = (
    availableCapacity: string = capacity,
    availableColor: string = color,
  ) => {
    const differentProductId = productsSameModel.find(
      item =>
        item.color === availableColor && item.capacity === availableCapacity,
    )?.id;

    if (!differentProductId) {
      return;
    }

    navigate(`../${differentProductId}`, {
      state: {
        search,
        pathname: prevPath,
        id: differentProductId,
      },
    });
  };

  return (
    <>
      <section className={styles.container}>
        <div onClick={goBack} className={styles.goBack}>
          <span className={styles.arrowLeft}></span>
          <span className={styles.backText}>Back</span>
        </div>
        <h2 className={styles.productTitle}>{name}</h2>
        <ProductPageSlider productName={name} images={images} />

        <div className={styles.productSpecsContainer}>
          <div className={styles.configContainer}>
            <span className={styles.subTitle}>Available colors</span>
            <div className={styles.configSelection}>
              {colorsAvailable.map(availableColor => (
                <span
                  className={classNames(
                    styles.color,
                    styles[`color${category}-${availableColor}`],
                    {
                      [styles.colorIsActive]: availableColor === color,
                    },
                  )}
                  key={availableColor}
                  onClick={() => changeSpec(undefined, availableColor)}
                ></span>
              ))}
            </div>
            <span className={styles.randomID}>{idGenerator()}</span>
          </div>
          <div className={styles.configContainer}>
            <span className={styles.subTitle}>Select capacity</span>
            <div className={styles.configSelection}>
              {capacityAvailable.map(availableCapacity => {
                return (
                  <span
                    className={classNames(styles.capacity, {
                      [styles.capacityIsActive]: availableCapacity === capacity,
                    })}
                    key={availableCapacity}
                    onClick={() => changeSpec(availableCapacity, undefined)}
                  >
                    {formatSpecText(availableCapacity)}
                  </span>
                );
              })}
            </div>
          </div>
          <div className={styles.priceContainer}>
            <p className={styles.price}>{'$' + priceRegular}</p>
            <p className={classNames(styles.price, styles.priceDiscount)}>
              {'$' + priceDiscount}
            </p>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={classNames('btnCart', styles.btnAddToCart, {
                btnCartPressed: isAddedToCart,
              })}
              onClick={addToCart}
              // disabled={isAddedToCart}
            >
              {isAddedToCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button
              className={classNames('buttonFavourite', 'btnFavourite', {
                btnFavouritePressed: isAddedToFavourite,
              })}
              onClick={addToFavourite}
              aria-label="Add to favourite"
            ></button>
          </div>
          <ul className={styles.productInfo}>
            <li className={styles.productInfoItem}>
              <span>Screen</span>
              <span>{formatSpecText(screen)}</span>
            </li>
            <li className={styles.productInfoItem}>
              <span>Resolution</span>
              <span>{resolution}</span>
            </li>
            <li className={styles.productInfoItem}>
              <span>Processor</span>
              <span>{processor}</span>
            </li>
            <li className={styles.productInfoItem}>
              <span>RAM</span>
              <span>{formatSpecText(ram)}</span>
            </li>
          </ul>
        </div>

        <div className={styles.aboutProductContainer}>
          <h3 className={styles.aboutTitle}>About</h3>
          {description.map(({ title, text }) => {
            return (
              <div className={styles.descriptionContainer} key={title}>
                <h4 className={styles.descriptionTitle}>{title}</h4>
                {text.map(paragraph => (
                  <p className={styles.descriptionText} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        <div className={styles.productTechSpecContainer}>
          <h3 className={styles.aboutTitle}>Tech specs</h3>
          <ul className={styles.productInfo}>
            <li
              className={classNames(
                styles.productInfoItem,
                styles.productSpecItem,
              )}
            >
              <span>Screen</span>
              <span>{formatSpecText(screen)}</span>
            </li>
            <li
              className={classNames(
                styles.productInfoItem,
                styles.productSpecItem,
              )}
            >
              <span>Resolution</span>
              <span>{resolution}</span>
            </li>
            <li
              className={classNames(
                styles.productInfoItem,
                styles.productSpecItem,
              )}
            >
              <span>Processor</span>
              <span>{processor}</span>
            </li>
            <li
              className={classNames(
                styles.productInfoItem,
                styles.productSpecItem,
              )}
            >
              <span>RAM</span>
              <span>{formatSpecText(ram)}</span>
            </li>
            <li
              className={classNames(
                styles.productInfoItem,
                styles.productSpecItem,
              )}
            >
              <span>Built in memory</span>
              <span>{formatSpecText(capacity)}</span>
            </li>
            {!!camera && (
              <li
                className={classNames(
                  styles.productInfoItem,
                  styles.productSpecItem,
                )}
              >
                <span>Camera</span>
                <span>{formatSpecText(camera)}</span>
              </li>
            )}
            {!!zoom && (
              <li
                className={classNames(
                  styles.productInfoItem,
                  styles.productSpecItem,
                )}
              >
                <span>Zoom</span>
                <span>{formatSpecText(zoom)}</span>
              </li>
            )}
            {cell.includes('Not applicable') || (
              <li
                className={classNames(
                  styles.productInfoItem,
                  styles.productSpecItem,
                )}
              >
                <span>Cell</span>
                <span>{cell.join(', ')}</span>
              </li>
            )}
          </ul>
        </div>
      </section>
      <SuggestionsSlider
        productList={getSuggestedProducts()}
        title={SliderTitle.suggestions}
      />
    </>
  );
};
