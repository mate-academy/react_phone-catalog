/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import styles from './PhonePage.module.scss';
import Breadcrumb, {
  BreadcrumbType,
} from '../../components/Breadcrumb/Breadcrumb';
import BackButton from '../../components/BackButton/BackButton';
import { Product } from '../../types/product';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import { fetchProducts } from '../../store/slices/productsSlice';
import { useNavigate } from 'react-router-dom';
import {
  // setPreviousProducts,
  setSelectedProduct,
} from '../../store/slices/selectedProductSlice';

const PhonePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product | undefined>();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const selectedProduct = useSelector(
    (state: RootState) => state.selectedProduct,
  );
  const { products } = useSelector((state: RootState) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopstate = () => {
      const hashValue = location.hash.split('/')[2];

      setProduct(() => {
        if (product && hashValue) {
          const foundProduct = products[product?.category]?.find(
            item => item.id === hashValue,
          );

          if (foundProduct) {
            return foundProduct;
          }
        }

        return product;
      });

      window.removeEventListener('popstate', handlePopstate);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [product, products]);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (product?.category) {
      dispatch(fetchProducts(product.category));
    }
  }, [dispatch, product]);

  const colorMap: { [key: string]: string } = useMemo(
    () => ({
      spaceblack: '#1C1C1E',
      gold: '#FFD700',
      silver: '#C0C0C0',
      purple: '#A020F0',
      yellow: '#FFFF00',
      midnight: '#101820',
      starlight: '#F8E9D2',
      spacegray: '#4B4B4D',
      midnightgreen: '#004B43',
      black: '#000000',
      white: '#FFFFFF',
      red: '#FF0000',
      green: '#008000',
      blue: '#0000FF',
      rosegold: '#B76E79',
      coral: '#FF7F50',
      pink: '#FFC0CB',
      sierrablue: '#A7C6ED',
      graphite: '#4B4B4H',
      // 'space gray': '#4B4B4D',
      'rose gold': '#B76E79',
      // 'starlight gold': '#FFD700',
    }),
    [],
  );

  const handleColor = useCallback(
    (color: string) => {
      let keyColor: string | null = null;

      Object.keys(colorMap).forEach(key => {
        if (colorMap[key] == colorMap[color.toLowerCase()]) {
          keyColor = key;
        }
      });

      setProduct(prevProduct => {
        if (product?.category) {
          const otherVariant = products[product.category].find(item => {
            if (item.namespaceId === prevProduct?.namespaceId) {
              return (
                item.color === keyColor &&
                item.capacity === prevProduct?.capacity
              );
            }
          });

          if (otherVariant) {
            dispatch(setSelectedProduct(otherVariant));
            navigate(`/${product.category}/${otherVariant?.id}`);
          }

          return otherVariant;
        }

        return prevProduct;
      });
    },
    [product, products, colorMap, navigate],
  );

  const handleCapacity = useCallback(
    (capacity: string) => {
      setProduct(prevProduct => {
        if (product?.category) {
          const otherVariant = products[product.category].find(item => {
            if (item.namespaceId === prevProduct?.namespaceId) {
              return (
                item.capacity === capacity && item.color === prevProduct?.color
              );
            }
          });

          if (otherVariant) {
            dispatch(setSelectedProduct(otherVariant));
            navigate(`/${product.category}/${otherVariant?.id}`);
          }

          return otherVariant;
        }

        return prevProduct;
      });
    },
    [product, products, navigate],
  );

  const ImageGalleryItem = React.memo(
    ({
      image,
      index,
      onClick,
      isActive,
    }: {
      image: string;
      index: number;
      onClick: (index: number) => void;
      isActive: boolean;
    }) => (
      <li
        onClick={() => onClick(index)}
        key={index}
        className={`${styles.phone__galleryItem} ${isActive ? styles.phone__galleryItem_active : ''}`}
      >
        <img src={image} alt={`Product ${index}`} loading="lazy" />
      </li>
    ),
  );

  const ColorSelector = React.memo(
    ({
      colors,
      onColorSelect,
    }: {
      colors: string[];
      onColorSelect: (color: string) => void;
    }) => (
      <ul className={styles.phone__colorsList}>
        {colors.map(color => {
          const colorHex = colorMap[color.toLowerCase()] || color;

          return (
            <li
              key={color}
              onClick={() => onColorSelect(color)}
              className={`${styles.phone__colorItem} ${
                product?.color === color ? styles.phone__colorItem_active : ''
              }`}
              style={{ backgroundColor: colorHex }}
            />
          );
        })}
      </ul>
    ),
  );

  const CapacitySelector = React.memo(
    ({
      capacities,
      onCapacitySelect,
    }: {
      capacities: string[];
      onCapacitySelect: (capacity: string) => void;
    }) => (
      <ul className={styles.phone__capacitiesList}>
        {capacities.map(capacity => (
          <li
            key={capacity}
            onClick={() => onCapacitySelect(capacity)}
            className={`${styles.phone__capacityItem} ${
              product?.capacity === capacity
                ? styles.phone__capacityItem_active
                : ''
            }`}
          >
            {capacity}
          </li>
        ))}
      </ul>
    ),
  );

  return (
    <div className={styles.phone}>
      <div className={styles.phone__header}>
        {product?.category && (
          <Breadcrumb type={product.category as BreadcrumbType} />
        )}
        <BackButton />
        {product && (
          <>
            <h1 className={styles.phone__title}>{product.name}</h1>

            <div className={styles.phone__main}>
              <div className={styles.phone__images}>
                <ul className={styles.phone__gallery}>
                  {product.images.map((image, index) => (
                    <ImageGalleryItem
                      key={index}
                      image={image}
                      index={index}
                      onClick={setCurrentImage}
                      isActive={currentImage === index}
                    />
                  ))}
                </ul>
                <div className={styles.phone__image}>
                  <img
                    src={product.images[currentImage]}
                    alt="Selected product"
                  />
                </div>
              </div>

              <div className={styles.phone__info}>
                <div className={styles.phone__infoColors}>
                  <h3>Available Colors:</h3>
                  <ColorSelector
                    colors={product.colorsAvailable}
                    onColorSelect={handleColor}
                  />
                </div>
                <div className={styles.phone__verticalLine}></div>
                <div className={styles.phone__capacities}>
                  <div className={styles.phone__infoCapacaties}>
                    <h3>Select Capacities</h3>
                    <CapacitySelector
                      capacities={product.capacityAvailable}
                      onCapacitySelect={handleCapacity}
                    />
                  </div>
                </div>
                <div className={styles.phone__verticalLine}></div>
                <div className={styles.phone__infoPrices}>
                  <h2 className={styles.phone__infoPrices_original}>
                    {product.priceDiscount}$
                  </h2>
                  <h2 className={styles.phone__infoPrices_discounted}>
                    {product.priceRegular}$
                  </h2>
                </div>
                <ActionButtons
                  product={product}
                  // products={products[product.category]}
                />
                <div className={styles.phone__infoDetails}>
                  <div
                    className={`${styles.phone__detail} ${styles.phone__screen}`}
                  >
                    <div className={styles.phone__label}>Screen</div>
                    <div className={styles.phone__value}>
                      {product.screen.slice(0, 10)}
                    </div>
                  </div>
                  <div
                    className={`${styles.phone__detail} ${styles.phone__resolution}`}
                  >
                    <div className={styles.phone__label}>Resolution</div>
                    <div className={styles.phone__value}>
                      {product.resolution}
                    </div>
                  </div>
                  <div
                    className={`${styles.phone__detail} ${styles.phone__processor}`}
                  >
                    <div className={styles.phone__label}>Processor</div>
                    <div className={styles.phone__value}>
                      {product.processor}
                    </div>
                  </div>
                  <div
                    className={`${styles.phone__detail} ${styles.phone__ram}`}
                  >
                    <div className={styles.phone__label}>RAM</div>
                    <div className={styles.phone__value}>{product.ram}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.phone__descriptions}>
              <div className={styles.phone__description}>
                <h1>About</h1>
                <div className={styles.phone__verticalLine}></div>
                {product.description.map((item, index) => (
                  <div key={index} className={styles.phone__descriptionItem}>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
              <div className={styles.phone__details}>
                <h1>Tech Specs</h1>
                <div className={styles.phone__verticalLine}></div>
                <div
                  className={`${styles.phone__detail} ${styles.phone__resolution}`}
                >
                  <div className={styles.phone__label}>Resolution</div>
                  <div className={styles.phone__value}>
                    {product.resolution}
                  </div>
                </div>
                <div
                  className={`${styles.phone__detail} ${styles.phone__processor}`}
                >
                  <div className={styles.phone__label}>Processor</div>
                  <div className={styles.phone__value}>{product.processor}</div>
                </div>
                <div className={`${styles.phone__detail} ${styles.phone__ram}`}>
                  <div className={styles.phone__label}>RAM</div>
                  <div className={styles.phone__value}>{product.ram}</div>
                </div>
                <div
                  className={`${styles.phone__detail} ${styles.phone__memory}`}
                >
                  <div className={styles.phone__label}>Built-in Memory</div>
                  <div className={styles.phone__value}>{product.capacity}</div>
                </div>
                <div
                  className={`${styles.phone__detail} ${styles.phone__camera}`}
                >
                  <div className={styles.phone__label}>Camera</div>
                  <div className={styles.phone__value}>{product.camera}</div>
                </div>
                <div
                  className={`${styles.phone__detail} ${styles.phone__zoom}`}
                >
                  <div className={styles.phone__label}>Zoom</div>
                  <div className={styles.phone__value}>{product.zoom}</div>
                </div>
                <div
                  className={`${styles.phone__detail} ${styles.phone__cell}`}
                >
                  <div className={styles.phone__label}>Cell</div>
                  <div className={styles.phone__value}>
                    {product.cell?.join(',')}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhonePage;
