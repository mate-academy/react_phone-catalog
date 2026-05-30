import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductDetailsPage.module.scss';
import { AppContext } from '../../AppContext';
import { getProductDetails } from '../../api';

import {
  Breadcrumbs,
  Error,
  Loader,
  ProductControllers,
  ProductsSlider,
} from '../../components';

import { ChevronArrowLeft } from '../../helpers/icons';
import { getSuggestedProducts } from '../../utils';
import { Product, ProductDetail } from '../../typies';

type Props = {
  category: string;
};

export const ProductDetailsPage: React.FC<Props> = ({ category }) => {
  const navigator = useNavigate();
  const { phoneId, tabletId, accessoryId } = useParams();
  const { products } = React.useContext(AppContext);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [productDetails, setProductDetails] =
    React.useState<ProductDetail | null>(null);
  const [imageSrc, setImageSrc] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [suggestedProducts, setSuggestedProducts] = React.useState<Product[]>(
    [],
  );

  const productId = phoneId || tabletId || accessoryId;

  const getAllProductDetails = React.useCallback(async () => {
    try {
      const response = await getProductDetails(category);
      const productsList = response;

      return productsList;
    } catch (e) {
      return [];
    }
  }, [category]);

  React.useEffect(() => {
    const productItem =
      products?.find(item => item.itemId === productDetails?.id) || null;

    setProduct(productItem);

    if (products) {
      setSuggestedProducts(getSuggestedProducts(products));
    }
  }, [products, productDetails]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const productsList = await getAllProductDetails();
        const productDetailsItem =
          productsList.find(
            (productItem: ProductDetail) => productItem.id === productId,
          ) || null;

        if (productDetailsItem) {
          setProductDetails(productDetailsItem);
          setImageSrc(productDetailsItem.images[0] || '');
        }
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, getAllProductDetails]);

  const handleColorClick = async (colorItem: string) => {
    try {
      const productsList = await getAllProductDetails();

      if (productDetails) {
        const pickedProduct = productsList
          .filter(item => item.namespaceId === productDetails.namespaceId)
          .filter(item => item.color.toLowerCase() === colorItem.toLowerCase())
          .filter(
            item =>
              item.capacity.toLowerCase() ===
              productDetails.capacity.toLowerCase(),
          );

        navigator(`../${pickedProduct[0].id}`);
      }
    } catch (e) {
      setIsError(true);
    }
  };

  const handleCapacityClick = async (capacityItem: string) => {
    try {
      const productsList = await getAllProductDetails();

      if (productDetails) {
        const pickedProduct = productsList
          .filter(item => item.namespaceId === productDetails.namespaceId)
          .filter(
            item =>
              item.color.toLowerCase() === productDetails.color.toLowerCase(),
          )
          .filter(
            item => item.capacity.toLowerCase() === capacityItem.toLowerCase(),
          );

        navigator(`../${pickedProduct[0].id}`);
      }
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <section className={styles.container}>
      {isLoading && <Loader />}
      {!isLoading && isError && <Error />}

      {!!productDetails ? (
        <>
          <Breadcrumbs category={category} productName={productDetails.name} />

          <button
            type="button"
            className={styles.backLink}
            onClick={() => navigator(-1)}
          >
            <ChevronArrowLeft />
            Back
          </button>

          <h1 className={styles.topTitle}>{productDetails.name}</h1>
          <div className={styles.header}>
            <div className={styles.imagesContainer}>
              <ul className={styles.imagesList}>
                {productDetails.images.map((imageItemSrc, index) => (
                  <li
                    key={index}
                    className={classNames(
                      styles.imagesItem,
                      imageSrc === imageItemSrc ? styles.imagesItemActive : '',
                    )}
                    onClick={() => setImageSrc(imageItemSrc)}
                  >
                    <img
                      src={`./${imageItemSrc}`}
                      alt=""
                      className={styles.imagePrev}
                    />
                  </li>
                ))}
              </ul>

              <div className={styles.imageMainContainer}>
                <img
                  src={`./${imageSrc}`}
                  alt={`${productDetails.name} image`}
                  className={styles.imageMain}
                />
              </div>
            </div>

            <div className={styles.mainInfo}>
              <div className={styles.infoContainer}>
                <p className={styles.infoTitle}>Available colors</p>
                <ul className={styles.infoList}>
                  {productDetails.colorsAvailable.map((color, index) => {
                    return (
                      <li
                        key={index}
                        className={classNames(
                          styles.colorItem,
                          color === productDetails.color
                            ? `${styles.colorItemActive}`
                            : '',
                        )}
                      >
                        <button
                          type="button"
                          className={styles.colorItemButton}
                          style={{ backgroundColor: `${color}` }}
                          onClick={() => handleColorClick(color)}
                        ></button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className={styles.infoContainer}>
                <p className={styles.infoTitle}>Select capacity</p>
                <ul className={styles.infoList}>
                  {productDetails.capacityAvailable.map((capacity, index) => (
                    <li
                      key={index}
                      className={classNames(
                        styles.capacityItem,
                        capacity === productDetails.capacity
                          ? `${styles['capacityItem--active']}`
                          : '',
                      )}
                      onClick={() => handleCapacityClick(capacity)}
                    >
                      {capacity}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className={styles.pricesWrapper}>
                  <p className={styles.price}>
                    ${productDetails.priceDiscount}
                  </p>
                  <p className={styles.fullPrice}>
                    ${productDetails.priceRegular}
                  </p>
                </div>

                <ProductControllers product={product} />
              </div>

              <div className={styles.mainSpecsContainer}>
                <div className={styles.itemSpecsWraper}>
                  <p className={styles.itemSpecsTitle}>Screen</p>
                  <p className={styles.itemSpecsInfo}>
                    {productDetails.screen}
                  </p>
                </div>

                <div className={styles.itemSpecsWraper}>
                  <p className={styles.itemSpecsTitle}>Resolution</p>
                  <p className={styles.itemSpecsInfo}>
                    {productDetails.resolution}
                  </p>
                </div>

                <div className={styles.itemSpecsWraper}>
                  <p className={styles.itemSpecsTitle}>Processor</p>
                  <p className={styles.itemSpecsInfo}>
                    {productDetails.processor}
                  </p>
                </div>

                <div className={styles.itemSpecsWraper}>
                  <p className={styles.itemSpecsTitle}>RAM</p>
                  <p className={styles.itemSpecsInfo}>{productDetails.ram}</p>
                </div>
              </div>
            </div>
          </div>
          <section className={styles.mainContainer}>
            <article className={styles.about}>
              <h2 className={styles.title}>About</h2>

              {productDetails.description.map((info, index) => (
                <div key={index} className={styles.aboutParagrafWrapper}>
                  <p className={styles.aboutTitle}>{info.title}</p>
                  <p className={styles.titleText}>{info.text}</p>
                </div>
              ))}
            </article>

            <article className={styles.techSpecs}>
              <h2 className={styles.title}>Tech specs</h2>

              <div className={styles.techSpecsContainer}>
                {productDetails.screen && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>Screen</p>
                    <p className={styles.techSpescInfo}>
                      {productDetails.screen}
                    </p>
                  </div>
                )}

                {productDetails.resolution && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>Resolution</p>
                    <p className={styles.techSpescInfo}>
                      {productDetails.resolution}
                    </p>
                  </div>
                )}

                {productDetails.processor && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>Processor</p>
                    <p className={styles.techSpescInfo}>
                      {productDetails.processor}
                    </p>
                  </div>
                )}

                {productDetails.ram && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>RAM</p>
                    <p className={styles.techSpescInfo}>{productDetails.ram}</p>
                  </div>
                )}

                {productDetails.capacity && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>
                      {category === 'accessories'
                        ? 'Display'
                        : 'Built in memory'}
                    </p>
                    <p className={styles.techSpescInfo}>
                      {productDetails.capacity}
                    </p>
                  </div>
                )}

                {productDetails.camera && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>Camera</p>
                    <p className={styles.techSpescInfo}>
                      {productDetails.camera}
                    </p>
                  </div>
                )}

                {productDetails.zoom && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>Zoom</p>
                    <p className={styles.techSpescInfo}>
                      {productDetails.zoom}
                    </p>
                  </div>
                )}

                {productDetails.cell && (
                  <div className={styles.techSpecsWrapper}>
                    <p className={styles.techSpecsTitle}>Cell</p>
                    <p className={styles.techSpescInfo}>
                      {productDetails.cell.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </article>
          </section>

          <section className={styles.interestingContainer}>
            {products && (
              <ProductsSlider
                title="You may also like"
                products={suggestedProducts}
              />
            )}
          </section>
        </>
      ) : (
        <>
          {!isLoading && (
            <>
              <Link to={`/${category}`} className={styles.backLink}>
                <ChevronArrowLeft />
                Back
              </Link>

              <h1 className={styles.productNotFound}>Product was not found</h1>
            </>
          )}
        </>
      )}
    </section>
  );
};
