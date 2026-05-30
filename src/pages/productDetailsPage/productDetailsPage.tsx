import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import styles from './productDetailsPage.module.scss';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { ProductContext } from '../../context/ProductContext';
import { getSpecificProducts } from '../../utils/api';
import { Loader } from '../../components/loader';
import { BackBtn } from '../../components/backBtn';
import { BreadCrumbs } from '../../components/breadCrumbs';
import { GalleryImg } from '../../components/galleryImg';
import { colors } from '../../constants/colors';
import { CardPrice } from '../../components/cardPrice';
import { CardButton } from '../../components/cardButton';
import { SectionSlider } from '../../components/sectionSlider';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [connectedProducts, setConnectedProducts] = useState<Product>();
  const [localErrorMessage, setLocalErrorMessage] = useState<string>('');
  const [alsoLike, setAlsoLike] = useState<Product[]>([]);
  const isDesktop = useMediaQuery({ maxWidth: 1199 });

  const arrLocation = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean);

    if (product?.name && parts.length > 1) {
      parts[1] = product.name;
    }

    return parts;
  }, [location.pathname, product?.name]);

  const { isLoading, setIsLoading, filteredProductsCategory, setCategory } =
    useContext(ProductContext);

  const currCategory = arrLocation[0];
  const params = useParams();
  const currentProductId = params.productId;

  useEffect(() => {
    setCategory(currCategory);
  }, [setCategory, currCategory]);

  useEffect(() => {
    setIsLoading(true);
    setLocalErrorMessage('');

    const timeout = setTimeout(() => {
      getSpecificProducts(currCategory)
        .then(fetchedSpecificProducts => {
          const currentProduct = fetchedSpecificProducts.find(
            fetchedProduct => fetchedProduct.id === currentProductId,
          );

          if (currentProduct) {
            setProduct(currentProduct);
            const connectedProd = [...filteredProductsCategory].find(
              prod => prod.itemId === currentProductId,
            );

            setConnectedProducts(connectedProd);

            if (connectedProd?.year) {
              const similarProducts = [...filteredProductsCategory].filter(
                prod =>
                  prod.year === connectedProd.year &&
                  prod.itemId !== product?.id,
              );

              setAlsoLike(similarProducts);
            }

            setLocalErrorMessage('');
          } else {
            setProduct(null);
            setConnectedProducts(undefined);
            setAlsoLike([]);
            setLocalErrorMessage('Product not found');
          }
        })
        .catch(() => {
          setLocalErrorMessage('Error! This product does not exist.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
    /* eslint-disable-next-line */
  }, [currCategory, currentProductId, setLocalErrorMessage, setIsLoading]);

  const year = connectedProducts?.year;
  const fullPrice = connectedProducts?.fullPrice;
  const priceDisc = connectedProducts?.price;

  const capacityActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.availableCapacityLink, {
      [styles['availableCapacityLink--active']]: isActive,
    });

  const splitCapacity = (str: string) => str.replace(/(GB|TB)/, ' $1');

  const getLink = useCallback(
    (option: string, value: string) => {
      const normalizeCapacity = product?.capacity
        .split(/(GB|TB)/)
        .join('')
        .toLowerCase();

      if (option === 'color') {
        return `${product?.namespaceId}-${normalizeCapacity}-${value}`;
      }

      if (option === 'capacity') {
        const normalizeValue = value
          .split(/(GB|TB)/)
          .join('')
          .toLowerCase();

        return `${product?.namespaceId}-${normalizeValue}-${product?.color}`;
      }

      return product?.id;
    },
    [product],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (localErrorMessage) {
    return (
      <div className={styles.productNotFound}>
        <BackBtn to={`/${currCategory}`} />
        <h1 className={styles.errorMessage}>{localErrorMessage}</h1>
      </div>
    );
  }

  if (!product) {
    return;
  }

  return (
    <div className={styles.productDetails}>
      <BreadCrumbs location={arrLocation} />
      <div className={styles.container}>
        <BackBtn to={`/${currCategory}`} />
        <h1 className={styles.productTitle}>{product?.name}</h1>
        <div className={styles.productDetailsTop}>
          {product?.images && product.images.length > 0 && (
            <GalleryImg images={product.images} />
          )}
          <div className={styles.characteristics}>
            <div className={styles.characteristicsColors}>
              <div className={styles.availableColorsTop}>
                <p className={styles.characteristicsTitle}>Available colors</p>
                {isDesktop && (
                  <div className={styles.availableColorsId}>ID: 802390</div>
                )}
              </div>
              <ul className={styles.availableColorsItems}>
                {product?.colorsAvailable.map(color => (
                  <li
                    className={classNames(styles.availableColorsList, {
                      [styles['availableColorsList--active']]:
                        color === product.color,
                    })}
                    key={color}
                  >
                    <NavLink
                      className={styles.availableColorsLink}
                      style={{ backgroundColor: colors[color] }}
                      to={`/${currCategory}/${getLink('color', color)}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.characteristicsCapacity}>
              <p className={styles.characteristicsTitle}>Select capacity</p>
              <ul className={styles.availableCapacityItems}>
                {product?.capacityAvailable.map(capacity => (
                  <li key={capacity} className={styles.availableCapacityList}>
                    <NavLink
                      className={capacityActiveLink}
                      to={`/${currCategory}/${getLink('capacity', capacity)}`}
                    >
                      {splitCapacity(capacity)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <CardPrice
              fullPrice={fullPrice}
              price={priceDisc}
              year={year}
              prodDet
            />
            <CardButton id={product.id} prodDet />
            <div className={styles.cardContent}>
              <div className={styles.cardDescription}>
                <span className={styles.descriptionName}>Screen</span>
                <span className={styles.descriptionValue}>
                  {product?.screen}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.descriptionName}>Resolution</span>
                <span className={styles.descriptionValue}>
                  {product?.resolution}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.descriptionName}>Processor</span>
                <span className={styles.descriptionValue}>
                  {product?.processor}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.descriptionName}>RAM</span>
                <span className={styles.descriptionValue}>{product?.ram}</span>
              </div>
            </div>
          </div>
          {!isDesktop && (
            <div className={styles.availableColorsId}>ID: 802390</div>
          )}
        </div>

        <div className={styles.productDetailsBottom}>
          <div className={styles.about}>
            <h3 className={styles.aboutTitle}>About</h3>
            {product?.description.map(item => (
              <div key={item.title} className={styles.productDecsription}>
                <h4 className={styles.productDecsriptionTitle}>{item.title}</h4>
                {item.text.map((paragraph, i) => (
                  <p key={i} className={styles.productDecsriptionText}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.techSpecs}>
            <h3 className={styles.techSpecsTitle}>Tech specs</h3>
            <div className={styles.cardContent}>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>Screen</span>
                <span className={styles.techSpecsDescriptionValue}>
                  {product?.screen}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>
                  Resolution
                </span>
                <span className={styles.techSpecsDescriptionValue}>
                  {product?.resolution}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>
                  Processor
                </span>
                <span className={styles.techSpecsDescriptionValue}>
                  {product?.processor}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>RAM</span>
                <span className={styles.techSpecsDescriptionValue}>
                  {product?.ram}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>
                  Built in memory
                </span>
                <span className={styles.techSpecsDescriptionValue}>
                  {product?.capacity}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>Camera</span>
                <span className={styles.techSpecsDescriptionValue}>
                  {product?.camera}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>Zoom</span>
                <span className={styles.techSpecsDescriptionValue}>
                  {product?.zoom}
                </span>
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.techSpecsDescriptionName}>Cell</span>
                <div className={styles.techSpecsDescriptionValues}>
                  {product?.cell.map((cell, i) => (
                    <span
                      key={cell}
                      className={styles.techSpecsDescriptionValue}
                      style={{ paddingLeft: '6px' }}
                    >
                      {cell}
                      {i < product.cell.length - 1 && ','}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionSlider product={alsoLike} mayAlsoLike />
    </div>
  );
};
