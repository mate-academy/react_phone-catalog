import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPhones } from '../../services/phones';
import { getTablets } from '../../services/tablets';
import { getAccessories } from '../../services/accessories';
import { ProductDetailed } from '../../types/types';
import styles from './ProductDetailsPage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { AddToCartButton } from '../shared/components/AddToCartButton';
import { FavouriteButton } from '../shared/components/FavouriteButton';
import { useLoading } from '../../context/LoadingContext';
import { BackButton } from '../shared/components/BackButton';

const colorMap: { [key: string]: string } = {
  'sierra blue': '#a3b4c6',
  sierrablue: '#a3b4c6',
  'sky blue': '#a3b4c6',
  skyblue: '#a3b4c6',
  midnight: '#003366',
  'space gray': '#4a4a4a',
  spacegray: '#4a4a4a',
  'rose gold': '#b76e79',
  rosegold: '#b76e79',
  graphite: '#474747',
  'midnight green': '#004d40',
  midnightgreen: '#004d40',
};

export const ProductDetailsPage: React.FC = () => {
  const { isLoading, setIsLoading } = useLoading();

  const [categoryGoods, setCategoryGoods] = useState<ProductDetailed[]>();
  const [product, setProduct] = useState<ProductDetailed>();
  const [suggestedProducts, setSuggestedProducts] = useState<ProductDetailed[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const category = pathname.split('/')[1];
  const itemId = pathname.split('/')[2];

  useEffect(() => {
    setIsLoading(true);

    const fetchCategoryGoods =
      category === 'phones'
        ? getPhones()
        : category === 'tablets'
          ? getTablets()
          : category === 'accessories'
            ? getAccessories()
            : null;

    if (fetchCategoryGoods) {
      fetchCategoryGoods
        .then((goods: ProductDetailed[]) => {
          setCategoryGoods(goods);
          const item = goods.find(good => good.id === itemId);

          setProduct(item);

          if (item) {
            setSelectedColor(item.color || '');
            setSelectedCapacity(item.capacity || '');
          }
        })
        .catch(() => {
          throw new Error();
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        });
    }
  }, [pathname, category, itemId, setIsLoading]);

  const getSuggestedProducts = (goods: ProductDetailed[], currentProductId: string) => {
    const suggested = goods.filter(good => good.id !== currentProductId);

    return suggested.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  useEffect(() => {
    if (categoryGoods && itemId) {
      const randomProducts = getSuggestedProducts(categoryGoods, itemId);

      setSuggestedProducts(randomProducts);
    }
  }, [categoryGoods, itemId]);

  const getNewProductId = (namespaceId: string, color: string, capacity: string) => {
    const formattedColor = color.replace(/\s+/g, '-').toLowerCase();

    return `${namespaceId}-${capacity.toLowerCase()}-${formattedColor}`;
  };

  const updateProduct = (color: string, capacity: string) => {
    if (!product) {
      return;
    }

    const formattedColor = color.replace(/\s+/g, '-').toLowerCase();
    const newProductId = getNewProductId(product.namespaceId, formattedColor, capacity);

    const newProduct = categoryGoods?.find(good => good.id === newProductId);

    if (newProduct) {
      setProduct(newProduct);
      setSelectedColor(color);
      setSelectedCapacity(capacity);

      navigate(`/${category}/${newProductId}`, { replace: true });
    }
  };

  const handleColorChange = (color: string) => {
    updateProduct(color, selectedCapacity);
  };

  const handleCapacityChange = (capacity: string) => {
    updateProduct(selectedColor, capacity);
  };

  const getColorStyle = (color: string) => {
    return colorMap[color.toLowerCase()] || color;
  };

  return (
    <div className={styles.page}>
      <div className={styles.breadCrumbsContainer}>
        <Breadcrumbs />
      </div>

      <div className={styles.backButtonContainer}>
        <BackButton />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {product ? (
            <>
              <h1 className={styles.title}>{product?.name}</h1>
              <div className={styles.main}>
                <div className={styles.images}>
                  <div className={styles.mainImgContainer}>
                    <img src={`./${product.images[mainImageIndex]}`} alt="Main product image" />
                  </div>

                  <div className={styles.imagePreview}>
                    {product.images.map((img, i) => (
                      <div
                        className={`${styles.smallImage} ${mainImageIndex === i ? styles['smallImage--selected'] : ''}`}
                        key={img}
                        onClick={() => setMainImageIndex(i)}
                      >
                        <img src={`./${img}`} alt={`Product image ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.details}>
                  <div className={styles.colorsContainer}>
                    <div className={styles.colorsTop}>
                      <p className={styles.detailsText}>Available colors</p>
                      <p className={styles.idText}>ID: 123455</p>
                    </div>

                    <div className={styles.colorOptions}>
                      {product.colorsAvailable.map(color => (
                        <div
                          key={color}
                          className={`${styles.colorOption} ${selectedColor === color ? styles['colorOption--selected'] : ''}`}
                          style={{ backgroundColor: getColorStyle(color) }}
                          onClick={() => handleColorChange(color)}
                        >
                          <div className={styles.insideCircle} style={{ backgroundColor: color }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.capacityContainer}>
                    <p className={styles.detailsText}>Select capacity</p>
                    <div className={styles.capacityOptions}>
                      {product.capacityAvailable.map(capacity => (
                        <div
                          key={capacity}
                          className={`${styles.capacityOption} ${selectedCapacity === capacity ? styles['capacityOption--selected'] : ''}`}
                          onClick={() => handleCapacityChange(capacity)}
                        >
                          {capacity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.pricesContainer}>
                    <p className={styles.price}>${product?.priceDiscount}</p>
                    <p className={styles.fullPrice}>${product?.priceRegular}</p>
                  </div>

                  <div className={styles.actions}>
                    <AddToCartButton product={product} />
                    <FavouriteButton product={product} />
                  </div>

                  <div className={styles.description}>
                    <div>
                      <p className={styles.detailsText}>Screen</p>
                      <p className={styles.value}>{product?.screen}</p>
                    </div>
                    <div>
                      <p className={styles.detailsText}>Resolution</p>
                      <p className={styles.value}>{product?.resolution}</p>
                    </div>
                    <div>
                      <p className={styles.detailsText}>Processor</p>
                      <p className={styles.value}>{product?.processor}</p>
                    </div>
                    <div>
                      <p className={styles.detailsText}>RAM</p>
                      <p className={styles.value}>{product?.ram}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.about}>
                  <h3 className={styles.infoTitle}>About</h3>

                  {product?.description.map(item => (
                    <p key={item.title} className={styles.aboutText}>
                      {item.text[0]}
                    </p>
                  ))}
                </div>
                <div className={styles.techSpecs}>
                  <h3 className={styles.infoTitle}>Tech specs</h3>

                  <div className={styles.techContainer}>
                    <div className={styles.techBlock}>
                      <p className={styles.detailsText}>Screen</p>
                      <p className={styles.value}>{product?.screen}</p>
                    </div>
                    <div className={styles.techBlock}>
                      <p className={styles.detailsText}>Resolution</p>
                      <p className={styles.value}>{product?.resolution}</p>
                    </div>
                    <div className={styles.techBlock}>
                      <p className={styles.detailsText}>Processor</p>
                      <p className={styles.value}>{product?.processor}</p>
                    </div>
                    <div className={styles.techBlock}>
                      <p className={styles.detailsText}>RAM</p>
                      <p className={styles.value}>{product?.ram}</p>
                    </div>
                    <div className={styles.techBlock}>
                      <p className={styles.detailsText}>Built in memory</p>
                      <p className={styles.value}>{product?.capacity}</p>
                    </div>
                    {product.camera && (
                      <>
                        <div className={styles.techBlock}>
                          <p className={styles.detailsText}>Camera</p>
                          <p className={styles.value}>{product?.camera}</p>
                        </div>
                        <div className={styles.techBlock}>
                          <p className={styles.detailsText}>Zoom</p>
                          <p className={styles.value}>{product?.zoom}</p>
                        </div>
                      </>
                    )}

                    <div className={styles.techBlock}>
                      <p className={styles.detailsText}>Cell</p>
                      <p className={styles.value}>{product?.cell.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {categoryGoods && categoryGoods.length > 1 && (
                <div className={styles.sliderContainer}>
                  <ProductsSlider title="You may also like" goods={suggestedProducts} />
                </div>
              )}
            </>
          ) : (
            <h1 className={styles.productNotFound}>Product was not found</h1>
          )}
        </>
      )}
    </div>
  );
};
