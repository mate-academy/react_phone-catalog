import styles from './ProductDetailsPage.module.scss';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getAccessory, getPhone, getProducts, getTablet } from '../shared/api';
import { Product, ProductDetailed } from '../shared/types';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { ProductsSlider } from '../shared/components/ProductsSlider';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState<ProductDetailed | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isActiveFavorite, setIsActiveFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const category = pathname.split('/')[1];

  const handleFavorite = () => {
    setIsActiveFavorite(!isActiveFavorite);
  };

  const handleAddToCart = () => {
    setIsAdded(!isAdded);
  };

  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }

  useEffect(() => {
    setIsLoading(true);

    getProducts().then(responce => setProducts(responce));

    switch (category) {
      case 'phones':
        getPhone()
          .then(response => {
            const foundProduct = response.find(
              (p: ProductDetailed) => p.id === `${productId}`,
            );

            if (foundProduct) {
              setProduct(foundProduct);
              setErrorMessage('');
            } else {
              setProduct(null);
              setErrorMessage('Product was not found');
            }
          })
          .catch(() => setErrorMessage('Product was not found'))
          .finally(() => {
            setIsLoading(false);
          });
        break;
      case 'tablets':
        getTablet()
          .then(response => {
            const foundProduct = response.find(
              (p: ProductDetailed) => p.id === `${productId}`,
            );

            if (foundProduct) {
              setProduct(foundProduct);
              setErrorMessage('');
            } else {
              setProduct(null);
              setErrorMessage('Product was not found');
            }
          })
          .catch(() => setErrorMessage('Product was not found'))
          .finally(() => {
            setIsLoading(false);
          });
        break;
      case 'accessories':
        getAccessory()
          .then(response => {
            const foundProduct = response.find(
              (p: ProductDetailed) => p.id === `${productId}`,
            );

            if (foundProduct) {
              setProduct(foundProduct);
              setErrorMessage('');
            } else {
              setProduct(null);
              setErrorMessage('Product was not found');
            }
          })
          .catch(() => setErrorMessage('Product was not found'))
          .finally(() => {
            setIsLoading(false);
          });
        break;
    }
  }, [category, productId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlerSwipes = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImage(prev => {
        if (product?.images?.length) {
          if (prev + 1 >= product.images.length) {
            return 0;
          } else {
            return prev + 1;
          }
        } else {
          return prev;
        }
      }),
    onSwipedRight: () =>
      setCurrentImage(prev => {
        if (product?.images?.length) {
          if (prev - 1 < 0) {
            return product.images.length - 1;
          } else {
            return prev - 1;
          }
        } else {
          return prev;
        }
      }),
  });

  function shuffleArray(array: Product[]) {
    const copiedArray = [...array];

    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }

    return copiedArray;
  }

  function getSuggestedProducts(goods: Product[], numberOfSuggestions: number) {
    const shuffledProducts = shuffleArray([...goods]);

    return shuffledProducts.slice(0, numberOfSuggestions);
  }

  const suggestedProducts = getSuggestedProducts(products, 20);

  return errorMessage ? (
    <div className={styles.error}>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  ) : isLoading ? (
    <div className={styles.loaderContainer}>
      <img
        src="./img/icons/loader-spinner.gif"
        className={styles.loaderSpinner}
        alt="loader animation"
      />
    </div>
  ) : (
    <div className={styles.detailsPageContainer}>
      <div className={styles.detailsPage}>
        <div className={styles.path}>
          <Link to="/" className={styles.homeLink}>
            <div className={styles.pathHome}></div>
          </Link>

          <div className={styles.pathSeparator}></div>
          <Link to={`/${category}`} className={styles.pathName}>
            {category}
          </Link>
          <div className={styles.pathSeparator}></div>
          <p className={styles.pathName}>{product?.name}</p>
        </div>

        <div className={styles.backContainer}>
          <div className={styles.backSeparator}></div>
          <button onClick={goBack} className={styles.backBtn}>
            Back
          </button>
        </div>

        <h1 className={styles.detailsTitle}>{product?.name}</h1>

        <div className={styles.gallaryContainer}>
          {isMobile ? (
            <>
              <div className={styles.mainImgContainer} {...handlerSwipes}>
                <img
                  src={`${product?.images[currentImage]}`}
                  alt={`${category} image`}
                  className={styles.mainImg}
                />
              </div>
              <div className={styles.thumbnailsContainer}>
                {product?.images.map(image => (
                  <div
                    key={image}
                    className={classNames(styles.thumbnailImgContainer, {
                      [styles.activeThumbnail]:
                        product?.images.indexOf(image) === currentImage,
                    })}
                  >
                    <img
                      src={`${image}`}
                      alt={`${category}`}
                      className={styles.thumbnailImg}
                      onClick={() => {
                        setCurrentImage(product?.images.indexOf(image));
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={styles.thumbnailsContainer}>
                {product?.images.map(image => (
                  <div
                    key={image}
                    className={classNames(styles.thumbnailImgContainer, {
                      [styles.activeThumbnail]:
                        product?.images.indexOf(image) === currentImage,
                    })}
                  >
                    <img
                      src={`${image}`}
                      alt={`${category}`}
                      className={styles.thumbnailImg}
                      onClick={() => {
                        setCurrentImage(product?.images.indexOf(image));
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.mainImgContainer} {...handlerSwipes}>
                <img
                  src={`${product?.images[currentImage]}`}
                  alt={`${category} image`}
                  className={styles.mainImg}
                />
              </div>
            </>
          )}
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.colorsContainer}>
            <h4 className={styles.avilableColors}>Available colors</h4>
            <div className={styles.colorContainer}>
              {product?.colorsAvailable.map(color => (
                <div
                  key={color}
                  className={classNames(styles.outerColorContainer, {
                    [styles.activeColor]: product.color === color,
                  })}
                >
                  <div
                    className={styles.color}
                    style={{ backgroundColor: `${color}` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.detailsSeparator}></div>

          <div className={styles.capacityContainer}>
            <h4 className={styles.capacityTitle}>Select capacity</h4>
            <div className={styles.availableCapacityContainer}>
              {product?.capacityAvailable.map(capacity => (
                <div
                  key={capacity}
                  className={classNames(styles.capacity, {
                    [styles.activeCapacity]: product.capacity === capacity,
                  })}
                >
                  {capacity}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.detailsSeparator}></div>

          <div className={styles.productPriceContainer}>
            <h3 className={styles.productPrice}>${product?.priceRegular}</h3>
            <p className={styles.productDiscount}>${product?.priceDiscount}</p>
          </div>

          <div className={styles.btnsContainer}>
            <button
              className={classNames(styles.addToCardBtn, {
                [styles.addedToCart]: isAdded,
              })}
              onClick={handleAddToCart}
            >
              {isAdded ? `Added to cart` : `Add to cart`}
            </button>
            <button
              className={classNames(styles.favoriteBtn, {
                [styles.favoriteActive]: isActiveFavorite,
              })}
              onClick={handleFavorite}
            ></button>
          </div>

          <div className={styles.techCharacteristicsContainer}>
            <div className={styles.characteristic}>
              <p className={styles.characteristicTitle}>Screen</p>
              <p className={styles.characteristicValue}>{product?.screen}</p>
            </div>
            <div className={styles.characteristic}>
              <p className={styles.characteristicTitle}>Resolution</p>
              <p className={styles.characteristicValue}>
                {product?.resolution}
              </p>
            </div>
            <div className={styles.characteristic}>
              <p className={styles.characteristicTitle}>Processor</p>
              <p className={styles.characteristicValue}>{product?.processor}</p>
            </div>
            <div className={styles.characteristic}>
              <p className={styles.characteristicTitle}>RAM</p>
              <p className={styles.characteristicValue}>{product?.ram}</p>
            </div>
          </div>
        </div>

        <div className={styles.about}>
          <h2 className={styles.aboutTitle}>About</h2>
          <div className={styles.aboutSeparator}></div>
          {product?.description.map(about => (
            <div key={about.title} className={styles.aboutDescriptionContainer}>
              <h3 className={styles.aboutDescriptionTitle}>{about.title}</h3>
              <p className={styles.aboutDescriptionText}> {about.text} </p>
            </div>
          ))}
        </div>

        <div className={styles.techSpecsContainer}>
          <h2 className={styles.aboutTitle}>Tech specs</h2>

          <div className={styles.aboutSeparator}></div>

          <div className={styles.techSpecsCharacteristicsContainer}>
            <div className={styles.characteristicTechSpecs}>
              <p className={styles.characteristicTitleTechSpecs}>Screen</p>
              <p className={styles.characteristicValueTechSpecs}>
                {product?.screen}
              </p>
            </div>
            <div className={styles.characteristicTechSpecs}>
              <p className={styles.characteristicTitleTechSpecs}>Resolution</p>
              <p className={styles.characteristicValueTechSpecs}>
                {product?.resolution}
              </p>
            </div>
            <div className={styles.characteristicTechSpecs}>
              <p className={styles.characteristicTitleTechSpecs}>Processor</p>
              <p className={styles.characteristicValueTechSpecs}>
                {product?.processor}
              </p>
            </div>
            <div className={styles.characteristicTechSpecs}>
              <p className={styles.characteristicTitleTechSpecs}>Ram</p>
              <p className={styles.characteristicValueTechSpecs}>
                {product?.ram}
              </p>
            </div>
            {category === 'accessories' ? (
              <div className={styles.characteristicTechSpecs}>
                <p className={styles.characteristicTitleTechSpecs}>Cell</p>
                <p className={styles.characteristicValueTechSpecs}>
                  {product?.cell.join(' ')}
                </p>
              </div>
            ) : (
              <>
                <div className={styles.characteristicTechSpecs}>
                  <p className={styles.characteristicTitleTechSpecs}>Camera</p>
                  <p className={styles.characteristicValueTechSpecs}>
                    {product?.camera}
                  </p>
                </div>
                <div className={styles.characteristicTechSpecs}>
                  <p className={styles.characteristicTitleTechSpecs}>Zoom</p>
                  <p className={styles.characteristicValueTechSpecs}>
                    {product?.zoom}
                  </p>
                </div>
                <div className={styles.characteristicTechSpecs}>
                  <p className={styles.characteristicTitleTechSpecs}>Cell</p>
                  <p className={styles.characteristicValueTechSpecs}>
                    {product?.cell.join(' ')}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.alsoLikeContainer}>
          <ProductsSlider
            title={'You may also like'}
            products={suggestedProducts}
            discount={true}
          />
        </div>
      </div>
    </div>
  );
};
