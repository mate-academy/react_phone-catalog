import styles from './ItemCard.module.scss';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  SetStateAction,
} from 'react';
import { GlobalContext } from '../../../app/store/GlobalContext';
import IconHeart from '../../../img/icons/icon-heart.png';
import IconHeartRed from '../../../img/icons/icon-heart-red.png';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone } from '../../../types/Phone';
import { Tablet } from '../../../types/Tablet';
import { Accessories } from '../../../types/Accessories';
import { makeGapBetween } from '../../../utils/format';
import { SimilarProducts } from '../SimilarProducts';
import { Loader } from '../Loader/Loader';

export const ItemCard: React.FC = () => {
  const {
    products,
    cart,
    favorites,
    selectedProduct,
    setSelectedProduct,
    phoneItems,
    tabletItems,
    accessoriesItems,
    toggleCartItem,
    toggleFavoritesItem,
    getProductCode,
  } = useContext(GlobalContext);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<
  Phone | Tablet | Accessories | null | undefined
  >(null);

  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemId]);

  useEffect(() => {
    return () => {
      setSelectedProduct(null);
    };
  }, [setSelectedProduct]);

  const findSelectedProduct = () => {
    if (!selectedProduct) {
      return;
    }

    let newProduct: SetStateAction<
    Phone | Tablet | Accessories | null | undefined
    >;

    switch (selectedProduct?.category) {
      case 'phones':
        newProduct = phoneItems.find(
          item => item.id === selectedProduct?.itemId,
        );

        break;
      case 'tablets':
        newProduct = tabletItems.find(
          item => item.id === selectedProduct?.itemId,
        );
        break;
      case 'accessories':
        newProduct = accessoriesItems.find(
          item => item.id === selectedProduct?.itemId,
        );
        break;
    }

    if (newProduct) {
      newProduct = { ...newProduct, year: selectedProduct.year };
    }

    setCurrentProduct(newProduct);
  };

  useEffect(() => {
    findSelectedProduct();
  }, [selectedProduct, phoneItems, tabletItems, accessoriesItems]);

  const allSameProducts: Phone[] | Tablet[] | Accessories[] | undefined =
    currentProduct?.category === 'phones'
      ? phoneItems.filter(p => p.namespaceId === currentProduct.namespaceId)
      : currentProduct?.category === 'tablets'
        ? tabletItems.filter(p => p.namespaceId === currentProduct.namespaceId)
        : currentProduct?.category === 'accessories'
          ? accessoriesItems.filter(
            p => p.namespaceId === currentProduct.namespaceId,
          )
          : undefined;

  const uniqueProductsByColor = allSameProducts?.reduce(
    (acc: (Phone | Tablet | Accessories)[], current) => {
      const alreadyExists = acc.some(
        product => product.color === current.color,
      );

      if (!alreadyExists) {
        acc.push(current);
      }

      return acc;
    },
    [],
  );

  useEffect(() => {
    if (!itemId) {
      return;
    }

    const allProducts = [...phoneItems, ...tabletItems, ...accessoriesItems];
    const foundProduct = allProducts.find(product => product.id === itemId);
    const updatedProduct = products.find(
      product => product.itemId === foundProduct?.id,
    );

    setCurrentProduct(foundProduct);
    setSelectedColor(foundProduct?.color || '');
    setSelectedCapacity(foundProduct?.capacity || '');
    setSelectedProduct(updatedProduct ?? null);
  }, [
    itemId,
    phoneItems,
    tabletItems,
    accessoriesItems,
    products,
    setSelectedProduct,
  ]);

  const isInCart = useMemo(() => {
    return cart.some(p => p.itemId === currentProduct?.id);
  }, [cart, currentProduct?.id]);

  const isInFavorites = useMemo(() => {
    return favorites.some(p => p.itemId === currentProduct?.id);
  }, [favorites, currentProduct?.id]);

  if (!currentProduct) {
    return <Loader />;
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="container">
      <section className={styles.itemCard}>
        <div className={styles.itemCard__navigation}>
          <div
            className={styles.itemCard__iconHome}
            onClick={() => navigate('/home')}
          ></div>
          <div className={styles.itemCard__address}>
            <div className={styles.itemCard__iconArrowRight}></div>
            <div
              className={styles.itemCard__pagePathName}
              onClick={() => navigate(-1)}
            >
              {selectedProduct?.category}
            </div>
            <div className={styles.itemCard__iconArrowRight}></div>
            <div className={styles.itemCard__pagePathNameProduct}>
              {selectedProduct?.name}
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate(-1)}
          className={styles.itemCard__backButton}
        >
          <div className={styles.itemCard__backButton_arrow}></div>
          <p className={styles.itemCard__backButton_text}>Back</p>
        </div>
        <h3 className={styles.itemCard__title}>{currentProduct.name}</h3>
        <div className={styles.itemCard__mainContent}>
          <div className={styles.itemCard__images}>
            <div className={styles.itemCard__bigImage}>
              <img
                src={currentProduct?.images[selectedImageIndex]}
                alt="Main image"
              />
            </div>
            <div className={styles.itemCard__smallImages}>
              {currentProduct.images.map((img, index) => (
                <div
                  key={index}
                  className={styles.itemCard__smallImage}
                  onClick={() => handleImageClick(index)}
                  style={{
                    border:
                      selectedImageIndex === index
                        ? '1px solid #c4c4c4'
                        : '#3b3e4a',
                  }}
                >
                  <img
                    src={img}
                    alt="image-1"
                    onClick={() => setSelectedImageIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.itemCard__moreOptions}>
            <div className={styles.itemCard__colorsContent}>
              <div className={styles.itemCard__wrapperTitleId}>
                <p className={styles.itemCard__colorsTitle}>Available colors</p>
                <div
                  className={styles.itemCard__id}
                >{`ID: ${getProductCode()}`}</div>
              </div>
              <div className={styles.itemCard__colors}>
                {uniqueProductsByColor?.map(product => {
                  const visualColor =
                    (product.color === 'rosegold'
                      ? 'rosybrown'
                      : product.color) && product.color === 'space gray'
                      ? ' #3b3e4a'
                      : product.color;
                  const productWithThisColor = allSameProducts?.find(
                    p =>
                      p.color === product.color &&
                      p.capacity === currentProduct.capacity,
                  );

                  if (!productWithThisColor) {
                    return null;
                  }

                  return (
                    <div
                      key={product.color}
                      className={`
                        ${styles.itemCard__color}
                        ${
                    selectedColor === product.color
                      ? `${styles.itemCard__color_selected}`
                      : ''
                        }
                      `}
                      onClick={() => {
                        setSelectedColor(product.color);
                        navigate(`/phones/${productWithThisColor.id}`);
                      }}
                    >
                      <div
                        className={styles.itemCard__color_circle}
                        style={{ backgroundColor: visualColor }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.itemCard__capacity}>
              <p className={styles.itemCard__capacity_text}>Select capacity</p>
              <div className={styles.itemCard__capacity_values}>
                {currentProduct?.capacityAvailable.map(capacity => {
                  const productWithThisCapacity = allSameProducts?.find(
                    p =>
                      p.color === currentProduct.color &&
                      p.capacity === capacity,
                  );

                  if (!productWithThisCapacity) {
                    return null;
                  }

                  return (
                    <div
                      key={capacity}
                      className={`
                        ${styles.itemCard__capacity_value}
                        ${
                    selectedCapacity === capacity
                      ? `${styles.itemCard__capacity_value_selected}`
                      : ''
                        }
                      `}
                      onClick={() => {
                        setSelectedCapacity(capacity);
                        navigate(`/phones/${productWithThisCapacity.id}`);
                      }}
                    >
                      {capacity}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.itemCard__price}>
              <p className={styles.itemCard__price_discountPrice}>
                ${currentProduct?.priceDiscount}
              </p>
              <p className={styles.itemCard__price_regularPrice}>
                ${currentProduct?.priceRegular}
              </p>
            </div>

            <div className={styles.itemCard__buttons}>
              <button
                className={styles.itemCard__button_addToCart}
                onClick={() =>
                  selectedProduct ? toggleCartItem(selectedProduct) : null
                }
                style={{
                  backgroundColor: isInCart ? '#323542' : '#905bff',
                }}
              >
                {isInCart ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={styles.itemCard__button_favorites}
                onClick={() =>
                  selectedProduct ? toggleFavoritesItem(selectedProduct) : null
                }
              >
                {isInFavorites ? (
                  <img src={IconHeartRed} alt="Icon-heart" />
                ) : (
                  <img src={IconHeart} alt="Icon-heart" />
                )}
              </button>
            </div>

            <div className={styles.itemCard__features}>
              <p className={styles.itemCard__screen}>
                <span className={styles.itemCard__property}>Screen</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.screen}
                </span>
              </p>
              <p className={styles.itemCard__resolution}>
                <span className={styles.itemCard__property}>Resolution</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.processor}
                </span>
              </p>
              <p className={styles.itemCard__processor}>
                <span className={styles.itemCard__property}>Processor</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.resolution}
                </span>
              </p>
              <p className={styles.itemCard__ram}>
                <span className={styles.itemCard__property}>ram</span>
                <span className={styles.itemCard__value}>
                  {makeGapBetween(currentProduct?.ram)}
                </span>
              </p>
            </div>
          </div>

          <div className={styles.itemCard__moreInfo}>
            <h3 className={styles.itemCard__moreInfoTitle}>About</h3>
            {currentProduct.description.map(({ title, text }) => (
              <div key={title}>
                <h3 className={styles.itemCard__title}>{title}</h3>
                <div className={styles.itemCard__text}>
                  {Array.isArray(text)
                    ? text.map((t, i) => <p key={i}>{t}</p>)
                    : text}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.itemCard__techSpecs}>
            <h3 className={styles.itemCard__techSpecsTitle}>Tech specs</h3>
            <div className={styles.itemCard__allFeatures}>
              <p className={styles.itemCard__screen}>
                <span className={styles.itemCard__property}>Screen</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.screen}
                </span>
              </p>
              <p className={styles.itemCard__resolution}>
                <span className={styles.itemCard__property}>Resolution</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.processor}
                </span>
              </p>
              <p className={styles.itemCard__processor}>
                <span className={styles.itemCard__property}>Processor</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.resolution}
                </span>
              </p>
              <p className={styles.itemCard__ram}>
                <span className={styles.itemCard__property}>ram</span>
                <span className={styles.itemCard__value}>
                  {makeGapBetween(currentProduct?.ram)}
                </span>
              </p>
              <p className={styles.itemCard__memory}>
                <span className={styles.itemCard__property}>
                  Built in memory
                </span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.capacity}
                </span>
              </p>
              <p className={styles.itemCard__camera}>
                <span className={styles.itemCard__property}>Camera</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.camera}
                </span>
              </p>
              <p className={styles.itemCard__zoom}>
                <span className={styles.itemCard__property}>Zoom</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.zoom}
                </span>
              </p>
              <p className={styles.itemCard__cell}>
                <span className={styles.itemCard__property}>Cell</span>
                <span className={styles.itemCard__value}>
                  {currentProduct?.cell}
                </span>
              </p>
            </div>
          </div>

          <div className={styles.itemCard__additionalContent}>
            <SimilarProducts />
          </div>
        </div>
      </section>
    </div>
  );
};
