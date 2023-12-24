/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ItemDetails } from '../../types/ItemDetails';
import { getProductById } from '../../helpers/getProducts';
import { ProductsContext } from '../../context/ProductsContext';
import { ProductSlider } from '../../components/ProductSlider';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';
import { HistoryButton } from '../../components/HistoryButton';
import { HistoryLinks } from '../../components/HistoryLinks';
import { getLinkTypeByProduct } from '../../helpers/getLinkTypeByProduct';
import { Item } from '../../types/Item';
import { Loader } from '../../components/Loader';
import { getCorrectImageUrl } from '../../helpers/getCorrectImageUrl';
import { Title } from '../../components/Title';
import { getMemoryString } from '../../helpers/getMemoryString';
import { PageItems } from '../../types/others/types';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const {
    isLoading,
    setIsLoading,
    products,
    cart,
    favourites,
    setFavourites,
    setCart,
  } = useContext(ProductsContext);
  const [productDetails, setProductDetails]
    = useState<ItemDetails | null>(null);
  const [product, setProduct] = useState<Item | null>(null);
  const [linkType, setLinkType] = useState<PageItems>('/');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const nav = useNavigate();

  const productsToSuggest = useMemo(() => getSuggestedProducts(products),
    [products]);

  const handleFavouriteButton = useCallback((
    item: Item,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (favourites.find((favItem) => favItem.id === item.id)) {
      setFavourites(favourites.filter((favItem) => favItem.id !== item.id));
    } else {
      setFavourites([...favourites, item]);
    }
  }, [favourites]);

  const handleAddToCartButton = useCallback((
    item: Item,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!cart.find((favItem) => favItem.id === item.id)) {
      const productToCart = { ...item, quantity: 1 };

      setCart([...cart, productToCart]);
    }
  }, [cart]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getProductById(id)
        .then(setProductDetails)
        .catch(() => nav('/not-found'))
        .finally(() => setIsLoading(false));
    } else {
      nav('/not-found');
    }
  }, [id, products]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const pr = products.find((item) => item.id === id);

    if (pr) {
      setProduct(pr);
      setLinkType(getLinkTypeByProduct(pr));
    } else {
      setProduct(null);
    }
  }, [id, products]);

  return (
    <div className="ProductDetailsPage">
      {isLoading || !productDetails || !product
        ? <Loader />
        : (
          <>
            <div className="ProductDetailsPage__product">
              <HistoryLinks
                links={[
                  { title: linkType, link: `/${linkType}` },
                  { title: product.name, link: null },
                ]}
              />
              <div className="ProductDetailsPage__product-header">
                <HistoryButton text="Back" />
                <Title title={product.name} />
              </div>
              <div className="ProductDetailsPage__product-content">
                <div className="ProductDetailsPage__images">
                  <div className="ProductDetailsPage__images-block">
                    {productDetails.images.map((image, index) => (
                      <div
                        key={image}
                        className={cn('ProductDetailsPage__images-block-item',
                          { active: index === currentImageIndex })}
                        onClick={() => setCurrentImageIndex(index)}
                        role="presentation"
                      >
                        <img
                          src={getCorrectImageUrl(image)}
                          alt={product.name}
                          className="ProductDetailsPage__images-block-item-img"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="ProductDetailsPage__images-main">
                    <TransitionGroup component={null}>
                      <CSSTransition
                        key={currentImageIndex}
                        timeout={500}
                        classNames="ProductDetailsPage__animation"
                      >
                        <img
                          key={currentImageIndex}
                          src={getCorrectImageUrl(
                            productDetails.images[currentImageIndex],
                          )}
                          alt={product.name}
                          className="ProductDetailsPage__images-main-img"
                        />
                      </CSSTransition>
                    </TransitionGroup>
                  </div>
                </div>
                <div className="ProductDetailsPage__topInfo">
                  {/* <div className="ProductDetailsPage__topInfo-colors">
                    <p className="ProductDetailsPage__topInfo-title">
                      Available colors
                    </p>
                    <div className="ProductDetailsPage__topInfo-colors-list">
                      <div className="ProductDetailsPage__topInfo-colors-color active">
                        <div
                          className="ProductDetailsPage__topInfo-colors-color-value"
                          style={{ backgroundColor: '#000' }}
                        />
                      </div>
                      <div className="ProductDetailsPage__topInfo-colors-color">
                        <div
                          className="ProductDetailsPage__topInfo-colors-color-value"
                          style={{ backgroundColor: '#888' }}
                        />
                      </div>
                      <div className="ProductDetailsPage__topInfo-colors-color">
                        <div
                          className="ProductDetailsPage__topInfo-colors-color-value"
                          style={{ backgroundColor: '#fff' }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="ProductDetailsPage__splitter" />
                  <div className="ProductDetailsPage__topInfo-capacity">
                    <p className="ProductDetailsPage__topInfo-title">
                      Select capacity
                    </p>
                    <div className="ProductDetailsPage__topInfo-capacity-list">
                      <button
                        className="primary-button active
                            ProductDetailsPage__topInfo-capacity-button"
                        type="button"
                      >
                        64 GB
                      </button>
                      <button
                        className="primary-button
                            ProductDetailsPage__topInfo-capacity-button"
                        type="button"
                      >
                        256 GB
                      </button>
                      <button
                        className="primary-button
                            ProductDetailsPage__topInfo-capacity-button"
                        type="button"
                      >
                        512 GB
                      </button>
                    </div>
                  </div>
                  <span className="ProductDetailsPage__splitter" /> */}
                  <div className="ProductDetailsPage__topInfo-price">
                    <p className="ProductDetailsPage__topInfo-price-new">
                      {`$${(product.price
                        - ((product.price * product.discount) / 100))}`}
                    </p>
                    {!!product.discount && (
                      <p className="ProductDetailsPage__topInfo-price-old">
                        {`$${product.price}`}
                      </p>
                    )}
                  </div>
                  <div className="ProductDetailsPage__topInfo-buttons">
                    <button
                      className={cn('primary-button wide', {
                        selected: cart.find((favItem) => favItem.id
                          === product.id),
                      })}
                      type="button"
                      onClick={(event) => handleAddToCartButton(product, event)}
                    >
                      {
                        cart.find((favItem) => favItem.id === product.id)
                          ? 'Added to cart'
                          : 'Add to cart'
                      }
                    </button>
                    <button
                      type="button"
                      className={cn('simple-button', 'favourite',
                        'ProductDetailsPage__topInfo-buttons-favourite',
                        {
                          selected: favourites.find((favItem) => favItem.id
                            === product.id),
                        })}
                      onClick={(event) => handleFavouriteButton(product, event)}
                    />
                  </div>
                  <div className="ProductDetailsPage__topInfo-specs">
                    {(productDetails.display.screenSize
                      && productDetails.display.screenResolution)
                      && (
                        <div
                          className="ProductDetailsPage__topInfo-specs-block"
                        >
                          <p className="ProductDetailsPage__topInfo-specs-title">
                            Screen
                          </p>
                          <p className="ProductDetailsPage__topInfo-specs-value">
                            {
                              `${productDetails.display.screenSize}`
                              + ` ${productDetails.display.screenResolution}`
                            }
                          </p>
                        </div>
                      )}
                    {productDetails.storage.ram && (
                      <div className="ProductDetailsPage__topInfo-specs-block">
                        <p className="ProductDetailsPage__topInfo-specs-title">
                          RAM
                        </p>
                        <p className="ProductDetailsPage__topInfo-specs-value">
                          {getMemoryString(productDetails.storage.ram)}
                        </p>
                      </div>
                    )}
                    {productDetails.storage.flash && (
                      <div className="ProductDetailsPage__topInfo-specs-block">
                        <p className="ProductDetailsPage__topInfo-specs-title">
                          Storage
                        </p>
                        <p className="ProductDetailsPage__topInfo-specs-value">
                          {getMemoryString(productDetails.storage.flash)}
                        </p>
                      </div>
                    )}
                    {productDetails.battery.type && (
                      <div className="ProductDetailsPage__topInfo-specs-block">
                        <p className="ProductDetailsPage__topInfo-specs-title">
                          Battery
                        </p>
                        <p className="ProductDetailsPage__topInfo-specs-value">
                          {productDetails.battery.type}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="ProductDetailsPage__description">
              <div
                data-cy="productDescription"
                className="ProductDetailsPage__description-about"
              >
                <p className="ProductDetailsPage__description-title">
                  About
                </p>
                <span className="ProductDetailsPage__splitter" />
                <p className="ProductDetailsPage__description-about-text">
                  {productDetails.description}
                </p>
              </div>
              <div className="ProductDetailsPage__description-specs">
                <p className="ProductDetailsPage__description-title">
                  Tech specs
                </p>
                <span className="ProductDetailsPage__splitter" />
                <div className="ProductDetailsPage__description-specs-list">
                  {(productDetails.display.screenSize
                    && productDetails.display.screenResolution)
                    && (
                      <div className="ProductDetailsPage__description-specs-block">
                        <p className="ProductDetailsPage__description-specs-title">
                          Screen
                        </p>
                        <p className="ProductDetailsPage__description-specs-value">
                          {
                            `${productDetails.display.screenSize}`
                            + ` ${productDetails.display.screenResolution}`
                          }
                        </p>
                      </div>
                    )}
                  {productDetails.storage.ram && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p
                        className="ProductDetailsPage__description-specs-title"
                      >
                        RAM
                      </p>
                      <p
                        className="ProductDetailsPage__description-specs-value"
                      >
                        {getMemoryString(productDetails.storage.ram)}
                      </p>
                    </div>
                  )}
                  {productDetails.storage.flash && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p
                        className="ProductDetailsPage__description-specs-title"
                      >
                        Storage
                      </p>
                      <p
                        className="ProductDetailsPage__description-specs-value"
                      >
                        {getMemoryString(productDetails.storage.flash)}
                      </p>
                    </div>
                  )}
                  {productDetails.battery.type && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        Battery
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.battery.type}
                      </p>
                    </div>
                  )}
                  {productDetails.android.os && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        System
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.android.os}
                      </p>
                    </div>
                  )}
                  {productDetails.camera.primary && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        Primary camera
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.camera.primary}
                      </p>
                    </div>
                  )}
                  {productDetails.hardware.cpu && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        Processor
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.hardware.cpu}
                      </p>
                    </div>
                  )}
                  {productDetails.hardware.accelerometer && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        Accelerometer
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.hardware.accelerometer ? 'Yes' : 'No'}
                      </p>
                    </div>
                  )}
                  {productDetails.hardware.fmRadio && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        FM-radio
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.hardware.fmRadio ? 'Yes' : 'No'}
                      </p>
                    </div>
                  )}
                  {productDetails.connectivity.wifi && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        Wi-fi
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.connectivity.wifi}
                      </p>
                    </div>
                  )}
                  {productDetails.connectivity.bluetooth && (
                    <div
                      className="ProductDetailsPage__description-specs-block"
                    >
                      <p className="ProductDetailsPage__description-specs-title">
                        Bluetooth
                      </p>
                      <p className="ProductDetailsPage__description-specs-value">
                        {productDetails.connectivity.bluetooth}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="ProductDetailsPage__slider">
              <ProductSlider
                title="You may also like"
                items={productsToSuggest}
              />
            </div>
          </>
        )}
    </div>
  );
};
