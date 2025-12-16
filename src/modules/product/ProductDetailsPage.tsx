import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { ProductDetailsContext } from '../../shared/context/ProductDetailsContext';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs';
import { Loader } from '../../shared/ui/loader';
import { ErrorMessage } from '../../shared/ui/errorMessage';
import { BREAKPOINTS } from '../../shared/styles/constants';
import { ProductsStateContext } from '../../shared/context/ProductsContext';
import { AddToCart } from '../../shared/ui/buttons/addToCart';
import { AddToFavoriteButton } from '../../shared/ui/buttons/addToFavorite';
import { SuggestedProducts } from './components/suggestedProducts';
import { BackButton } from '../../shared/ui/buttons/back/BackButton';

export const ProductDetailsPage = () => {
  const { allProducts, loading, errorMessage } = useContext(
    ProductDetailsContext,
  );
  const { products } = useContext(ProductsStateContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const globalProduct = products.find(product => product.itemId === productId);
  const currentProduct = allProducts?.find(product => product.id === productId);
  const itemId = products.find(product => product.itemId === productId)?.id;

  const sameModels = allProducts.filter(
    product => product.namespaceId === currentProduct?.namespaceId,
  );

  const isMobile = window.innerWidth < BREAKPOINTS.tablet;
  const hasCamera = currentProduct?.hasOwnProperty('camera');
  const hasZoom = currentProduct?.hasOwnProperty('zoom');

  const [selectedCap, setSelectedCap] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedImg, setSelectedImg] = useState<string | undefined>();

  // eslint-disable-next-line no-console
  console.log('selectedImg: ', selectedImg);

  useEffect(() => {
    if (currentProduct) {
      setSelectedCap(currentProduct.capacity);
      setSelectedColor(currentProduct.color);
      setSelectedImg(currentProduct?.images[0]);
    }
  }, [currentProduct]);

  const handleCapacityChange = (capacity: string) => {
    const newProduct = sameModels.find(
      product =>
        product.capacity === capacity && product.color === selectedColor,
    );

    if (newProduct) {
      navigate(`/${newProduct.category}/${newProduct.id}`);
    }
  };

  const handleColorChange = (color: string) => {
    const newProduct = sameModels.find(
      product => product.color === color && product.capacity === selectedCap,
    );

    if (newProduct) {
      navigate(`/${newProduct.category}/${newProduct.id}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs pathname={pathname} productName={currentProduct?.name} />
      <BackButton pathname={pathname} />
      {loading && <Loader />}

      {!loading && errorMessage && <ErrorMessage />}

      {!loading && !errorMessage && currentProduct === undefined && (
        <p className="button-text">Product not found</p>
      )}

      {!loading && currentProduct && !errorMessage && (
        <>
          <h2 className={styles.productName}>{currentProduct.name}</h2>

          <div className={styles.mainInfoBlock}>
            {isMobile ? (
              <div className={styles.allPhotos}>
                <img
                  src={`${selectedImg}`}
                  alt={currentProduct.name}
                  className={styles.bigPhoto}
                />
                <div className={styles.smallPhotos}>
                  {currentProduct.images.map((image, index) => (
                    <img
                      key={image}
                      src={`${image}`}
                      alt={image}
                      className={
                        selectedImg === image
                          ? styles.smallPhotoSelected
                          : styles.smallPhoto
                      }
                      onClick={() =>
                        setSelectedImg(currentProduct.images[index])
                      }
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.allPhotos}>
                <div className={styles.smallPhotos}>
                  {currentProduct.images.map((image, index) => (
                    <img
                      key={image}
                      src={`${image}`}
                      alt={image}
                      className={
                        selectedImg === image
                          ? styles.smallPhotoSelected
                          : styles.smallPhoto
                      }
                      onClick={() =>
                        setSelectedImg(currentProduct.images[index])
                      }
                    />
                  ))}
                </div>
                <img
                  src={`${selectedImg}`}
                  alt={currentProduct.name}
                  className={styles.bigPhoto}
                />
              </div>
            )}
            <div className={styles.mainSpecs}>
              <div className={styles.mainSpecsTop}>
                <div className={styles.colors}>
                  <p className={`small-text ${styles.colorsTite}`}>
                    Available colors
                  </p>
                  <div className={styles.colorsButtons}>
                    {currentProduct.colorsAvailable.map(color => (
                      <div key={color} className={styles.radioWrapper}>
                        <input
                          id={color}
                          type="radio"
                          name="color"
                          value={color}
                          checked={selectedColor === color}
                          onChange={() => {
                            setSelectedColor(color);
                            handleColorChange(color);
                          }}
                          className={styles.radioInput}
                        />

                        <label
                          htmlFor={color}
                          className={styles.radioLabelColor}
                          style={{ backgroundColor: color }}
                        >
                          {/* {color} */}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <p className={`small-text ${styles.itemId}`}>ID: {itemId}</p>
              </div>
              <div className={styles.strike}></div>
              <div className={styles.capacity}>
                <p className={`small-text ${styles.capacityTite}`}>
                  Select capacity
                </p>
                <div className={styles.capacityButtons}>
                  {currentProduct.capacityAvailable.map(capacity => (
                    <div key={capacity} className={styles.radioWrapper}>
                      <input
                        id={capacity}
                        type="radio"
                        name="capacity"
                        value={capacity}
                        checked={selectedCap === capacity}
                        onChange={() => {
                          setSelectedCap(capacity);
                          handleCapacityChange(capacity);
                        }}
                        className={styles.radioInput}
                      />

                      <label
                        htmlFor={capacity}
                        className={`body-text ${styles.radioLabelCapacity}`}
                      >
                        {capacity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.strike}></div>

              <div className={styles.mainSpecsMiddle}>
                <div className={styles.priceBlock}>
                  <h2 className={styles.price}>
                    {`$${currentProduct.priceDiscount}`}
                  </h2>
                  <div className={styles.fullPriceWrapper}>
                    <span
                      className={styles.fullPrice}
                    >{`$${currentProduct.priceRegular}`}</span>
                    <span className={styles.strike}></span>
                  </div>
                </div>
                <div className={styles.buttonBlock}>
                  <AddToCart product={globalProduct} />
                  <AddToFavoriteButton product={globalProduct} />
                </div>
              </div>

              <div className={styles.mainSpecsBottom}>
                <div className={`small-text ${styles.infoBlock}`}>
                  <div className={styles.infoText}>
                    <p className={styles.infoTitle}>Screen</p>
                    <p className={styles.specs}>{currentProduct.screen}</p>
                  </div>
                  <div className={styles.infoText}>
                    <p className={styles.infoTitle}>Resolution</p>
                    <p className={styles.specs}>{currentProduct.resolution}</p>
                  </div>
                  <div className={styles.infoText}>
                    <p className={styles.infoTitle}>Processor</p>
                    <p className={styles.specs}>{currentProduct.processor}</p>
                  </div>
                  <div className={styles.infoText}>
                    <p className={styles.infoTitle}>RAM</p>
                    <p className={styles.specs}>{currentProduct.ram}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.descriptionBlock}>
            <div className={styles.aboutBlock}>
              <div className={styles.descriptionTop}>
                <h3 className={styles.descriptionMainTitle}>About</h3>
                <div className={styles.strikeLong}></div>
              </div>

              <div className={styles.descriptionSection}>
                <h4 className={styles.descriptionTitle}>
                  {currentProduct.description[0].title}
                </h4>
                <p className={`body-text ${styles.descriptionText}`}>
                  {currentProduct.description[0].text}
                </p>
              </div>

              <div className={styles.descriptionSection}>
                <h4 className={styles.descriptionTitle}>
                  {currentProduct.description[1].title}
                </h4>
                <p className={`body-text ${styles.descriptionText}`}>
                  {currentProduct.description[1].text}
                </p>
              </div>

              <div className={styles.descriptionSection}>
                <h4 className={styles.descriptionTitle}>
                  {currentProduct.description[2].title}
                </h4>
                <p className={`body-text ${styles.descriptionText}`}>
                  {currentProduct.description[2].text}
                </p>
              </div>
            </div>

            <div className={styles.techSpecsBlock}>
              <div className={styles.descriptionTop}>
                <h3 className={styles.descriptionMainTitle}>Tech specs</h3>
                <div className={styles.strikeLong}></div>
              </div>

              <div className={`body-text ${styles.techSpecs}`}>
                <div className={styles.infoText}>
                  <p className={styles.infoTitle}>Screen</p>
                  <p className={styles.specs}>{currentProduct.screen}</p>
                </div>
                <div className={styles.infoText}>
                  <p className={styles.infoTitle}>Resolution</p>
                  <p className={styles.specs}>{currentProduct.resolution}</p>
                </div>
                <div className={styles.infoText}>
                  <p className={styles.infoTitle}>Processor</p>
                  <p className={styles.specs}>{currentProduct.processor}</p>
                </div>
                <div className={styles.infoText}>
                  <p className={styles.infoTitle}>RAM</p>
                  <p className={styles.specs}>{currentProduct.ram}</p>
                </div>
                {hasCamera && (
                  <div className={styles.infoText}>
                    <p className={styles.infoTitle}>Camera</p>
                    <p className={styles.specs}>{currentProduct.camera}</p>
                  </div>
                )}
                {hasZoom && (
                  <div className={styles.infoText}>
                    <p className={styles.infoTitle}>Zoom</p>
                    <p className={styles.specs}>{currentProduct.zoom}</p>
                  </div>
                )}
                <div className={styles.infoText}>
                  <p className={styles.infoTitle}>Cell</p>
                  <p className={styles.specs}>{currentProduct.cell}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.suggesionsBlock}>
            <SuggestedProducts />
          </div>
        </>
      )}
    </div>
  );
};
