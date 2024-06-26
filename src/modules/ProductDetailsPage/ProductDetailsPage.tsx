import * as Tooltip from '@radix-ui/react-tooltip';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackLink from '../../UI/BackLink/BackLink';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import Button from '../../UI/Buttons/Button';
import Heading from '../../UI/Heading/Heading';
import Loader from '../shared/Loader/Loader';
import Product from '../../types/Product';
import ProductNotFound from '../shared/ProductNotFound/ProductNotFound';
import SliderProducts from '../shared/SliderProducts/SliderProducts';
import { getProductOfType } from '../../api/getProduct';
import style from './ProductDetailsPage.module.css';
import styles from '../shared/ProductCard/ProductCard.module.css';
import { useCartStore } from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useToastStore } from '../../store/toastStore';

const ProductDetailsPage = () => {
  const { pathname } = useLocation();

  const extractCategory = () => {
    const parts = pathname.split('/');

    return parts.length > 1 ? parts[1] : null;
  };

  const category = extractCategory();

  const { productId } = useParams<{ productId: string }>();
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [likedProduct, setLikedProduct] = useState<Product[]>([]);

  const navigate = useNavigate();

  const [currentPhoto, setCurrentPhoto] = useState<string>();
  const allPhotos = currentProduct?.images;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductOfType(category)
      .then(res => {
        setCurrentProduct(res.find(prod => prod.id === productId));
        setCurrentPhoto(res.find(prod => prod.id === productId)?.images[0]);
        setLikedProduct(res.slice(0, 8));
      })
      .catch(() => {
        navigate(`/`);
      })
      .finally(() => setIsLoading(false));
  }, [category, navigate, productId]);

  function handleOnColor(colorToChange: string) {
    setIsLoading(true);

    let correctColor: string = colorToChange;

    if (colorToChange.includes(' ')) {
      correctColor = colorToChange.split(' ').join('-');
    }

    let productColor: string | string[] | undefined = currentProduct?.color;

    if (currentProduct?.color.includes(' ')) {
      productColor = currentProduct.color.split(' ');
    }

    const changedId = productId
      ?.split('-')
      .map(tech => {
        if (Array.isArray(productColor)) {
          if (productColor[0] === tech) {
            return correctColor;
          } else if (productColor[1] === tech) {
            return null;
          }
        } else {
          if (productColor === tech) {
            return correctColor;
          }
        }

        return tech;
      })
      .filter(Boolean);

    if (
      changedId !== undefined &&
      changedId[changedId.length - 1] !== currentProduct?.color
    ) {
      const newProductId = changedId.join('-');

      navigate(`/${category}/${newProductId}`);
    }
  }

  function handleOnCapacity(capacityToChange: string) {
    setIsLoading(true);

    const changedId = productId
      ?.split('-')
      .map(tech =>
        tech === currentProduct?.capacity.toLowerCase()
          ? capacityToChange.toLowerCase()
          : tech,
      );

    if (
      changedId !== undefined &&
      changedId[changedId.length - 2] !== currentProduct?.capacity
    ) {
      const newProductId = changedId.join('-');

      navigate(`/${category}/${newProductId}`);
    }
  }

  const { toggleProductInCart, cartItems } = useCartStore(state => ({
    toggleProductInCart: state.toggleProductInCart,
    cartItems: state.cartItems,
  }));

  const { toggleFavorite, favorites } = useFavoritesStore(state => ({
    toggleFavorite: state.toggleFavorite,
    favorites: state.favorites,
  }));

  const { addToast } = useToastStore();

  const isInCart = useMemo(
    () =>
      currentProduct !== undefined
        ? cartItems.some(item => item.id === currentProduct.id)
        : false,
    [cartItems, currentProduct],
  );

  const isFavorite = useMemo(
    () => favorites.some(item => item.id === currentProduct?.id),

    [favorites, currentProduct?.id],
  );

  const handleToggleCart = (newProduct: Product) => {
    toggleProductInCart({
      id: newProduct.id,
      quantity: 1,
      product: newProduct,
    });
    addToast(isInCart ? 'Removed from Cart' : 'Added to Cart', newProduct.name);
  };

  const handleToggleFavorite = (newProduct: Product) => {
    toggleFavorite(newProduct);
    addToast(
      isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      newProduct.name,
    );
  };

  if (!isLoading && !currentProduct) {
    return <ProductNotFound />;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={style.container}>
            <div className={style.breadcrumbs}>
              <Breadcrumbs />
            </div>

            <BackLink className={style.backButton} />

            <Heading as={'h2'} className={style.titleH2}>
              {currentProduct?.name}
            </Heading>

            <div className={style.mainInfoContainer}>
              <div className={style.photoContainer}>
                <div className={style.smallPhotosContainer}>
                  {allPhotos?.map(photo => (
                    <Button
                      key={photo}
                      variant={'icon'}
                      isSelected={currentPhoto === photo}
                      className={style.smallPhoto}
                      onClick={() => setCurrentPhoto(photo)}
                    >
                      <img src={photo} alt={photo} />
                    </Button>
                  ))}
                </div>
                <div className={style.bigPhoto}>
                  <img src={currentPhoto} alt={currentPhoto} />
                </div>
              </div>

              <div className={style.mainInfoSelectable}>
                <span>Available colors</span>
                <div className={style.buttonContainer}>
                  {currentProduct?.colorsAvailable.map(availableColor => (
                    <Button
                      key={availableColor}
                      variant={'color-selector'}
                      color={availableColor}
                      size={[32, 32]}
                      isSelected={availableColor === currentProduct?.color}
                      onClick={() => handleOnColor(availableColor)}
                    ></Button>
                  ))}
                </div>

                <span>Select capacity</span>
                <div className={style.buttonContainer}>
                  {currentProduct?.capacityAvailable.map(availableCapacity => (
                    <Button
                      key={availableCapacity}
                      variant={
                        availableCapacity === currentProduct?.capacity
                          ? 'primary'
                          : 'icon'
                      }
                      className={style.button}
                      onClick={() => handleOnCapacity(availableCapacity)}
                    >
                      {`${availableCapacity.slice(0, -2)} ${availableCapacity.slice(-2)}`}
                    </Button>
                  ))}
                </div>

                <p className={style.prices}>
                  <span className={style.newPrice}>
                    ${currentProduct?.priceDiscount}
                  </span>
                  {!!currentProduct?.priceDiscount && (
                    <span className={style.oldPrice}>
                      ${currentProduct?.priceRegular}
                    </span>
                  )}
                </p>

                <div className={style.actionsWrapper}>
                  <Button
                    variant="primary"
                    isSelected={isInCart}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onClick={() => handleToggleCart(currentProduct)}
                  >
                    {isInCart ? 'Added' : 'Add to cart'}
                  </Button>

                  <Tooltip.Provider skipDelayDuration={300} delayDuration={500}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Button
                          variant="icon"
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          onClick={() => handleToggleFavorite(currentProduct)}
                          size={[40, 40]}
                        >
                          {isFavorite ? (
                            <FaHeart color="red" size={16} />
                          ) : (
                            <FaRegHeart size={16} />
                          )}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className={styles.tooltipContent}
                          sideOffset={5}
                          aria-label={
                            isFavorite
                              ? 'Delete from favorite'
                              : 'Add to favorite'
                          }
                        >
                          {isFavorite
                            ? 'Delete from favorite'
                            : 'Add to favorite'}
                          <Tooltip.Arrow className={styles.tooltipArrow} />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>

                <ul className={style.paramsList}>
                  <li className={style.paramItem}>
                    <span className={style.paramType}>Screen</span>
                    <span className={style.paramValue}>
                      {currentProduct?.screen}
                    </span>
                  </li>
                  <li className={style.paramItem}>
                    <span className={style.paramType}>Resolution</span>
                    <span className={style.paramValue}>
                      {currentProduct?.resolution}
                    </span>
                  </li>
                  <li className={style.paramItem}>
                    <span className={style.paramType}>Processor</span>
                    <span className={style.paramValue}>
                      {currentProduct?.processor}
                    </span>
                  </li>
                  <li className={style.paramItem}>
                    <span className={style.paramType}>RAM</span>
                    <span className={style.paramValue}>
                      {currentProduct?.ram}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={style.column}>
              <Heading as={'h3'} className={style.underline}>
                About
              </Heading>
              {currentProduct?.description.map(desc => (
                <div
                  className={style.description}
                  key={currentProduct?.id + desc.title}
                >
                  <Heading as={'h4'} className={style.titleH4}>
                    {desc.title}
                  </Heading>
                  {desc.text.map((descText, idx) => (
                    <span
                      className={style.descr}
                      key={currentProduct?.id + idx}
                    >
                      {descText}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className={style.column}>
              <Heading as={'h3'} className={style.underline}>
                Tech specs
              </Heading>
              <ul className={style.allParamsList}>
                <li className={style.paramItem}>
                  <span className={style.paramType}>Screen</span>
                  <span className={style.paramValue}>
                    {currentProduct?.screen}
                  </span>
                </li>
                <li className={style.paramItem}>
                  <span className={style.paramType}>Resolution</span>
                  <span className={style.paramValue}>
                    {currentProduct?.resolution}
                  </span>
                </li>
                <li className={style.paramItem}>
                  <span className={style.paramType}>Processor</span>
                  <span className={style.paramValue}>
                    {currentProduct?.processor}
                  </span>
                </li>
                <li className={style.paramItem}>
                  <span className={style.paramType}>RAM</span>
                  <span className={style.paramValue}>
                    {currentProduct?.ram}
                  </span>
                </li>
                <li className={style.paramItem}>
                  <span className={style.paramType}>Built in memory</span>
                  <span className={style.paramValue}>
                    {currentProduct?.capacity}
                  </span>
                </li>
                <li className={style.paramItem}>
                  <span className={style.paramType}>Camera</span>
                  <span className={style.paramValue}>
                    {currentProduct?.camera ? currentProduct.camera : '-'}
                  </span>
                </li>
                <li className={style.paramItem}>
                  <span className={style.paramType}>Zoom</span>
                  <span className={style.paramValue}>
                    {currentProduct?.zoom ? currentProduct.zoom : '-'}
                  </span>
                </li>
                <li className={style.paramItem}>
                  <span className={style.paramType}>Ceil</span>
                  <span className={style.paramValue}>
                    {currentProduct?.cell.join(', ')}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <SliderProducts
            sliderTitle={'You may also like'}
            products={likedProduct}
            totalPages={2}
            isLoading={isLoading}
            isError={false}
          />
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
