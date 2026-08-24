import styles from './productDetails.module.scss';

import { NavLink } from 'react-router-dom';
import { colorMap } from '../../styles/utils/colorMap';

import { ProductNavigation } from '../../components/ProductNavigation';
import { ProductActions } from '../../components/ProductActions/ProductActions';
import { useProductDetails } from '../../hooks/useProductDetails';
import { ProductDescription } from '../../components/ProductDescription';
import { useEffect, useState } from 'react';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { BackNavigation } from '../../components/BackNavigation/BackNavigation';

export const ProductDetailsPage = () => {
  const { product, products } = useProductDetails();

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p className={styles.notFound__title}>Product not found</p>
        <img
          className={styles.notFound__image}
          src={`${import.meta.env.BASE_URL}/img/no-product-found.png`}
          alt="image product not found"
        />
      </div>
    );
  }

  const recommendedProducts = products
    .filter(
      item =>
        item.namespaceId === product.namespaceId && item.id !== product.id,
    )
    .sort((a, b) => a.priceDiscount - b.priceDiscount)
    .map(item => ({
      id: item.id,
      category: item.category,
      itemId: String(item.id),

      name: item.name,

      price: item.priceDiscount,
      fullPrice: item.priceRegular,

      image: item.images[0],

      screen: item.screen,
      capacity: item.capacity,
      ram: item.ram,
    }));

  const colorVariants = products.filter(
    item =>
      item.namespaceId === product.namespaceId &&
      item.capacity === product.capacity,
  );

  const capacityVariants = products.filter(
    item =>
      item.namespaceId === product.namespaceId && item.color === product.color,
  );

  return (
    <div className={styles.details}>
      <div className={styles.details__content}>
        <ProductNavigation />

        <div>
          <BackNavigation />

          <div className={styles.details__information}>
            <p className={styles.details__information__name}>{product.name}</p>

            <div className={styles.slider}>
              <div className={styles.slider__thumbnails}>
                {product.images.map(img => (
                  <img
                    key={img}
                    src={`${import.meta.env.BASE_URL}/${img.replace(/^\/+/, '')}`}
                    alt={product.name}
                    className={`${styles.slider__thumbnail} ${
                      selectedImage === img ? styles.active__color : ''
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              <div className={styles.slider__main}>
                <img
                  src={`${import.meta.env.BASE_URL}/${selectedImage.replace(/^\/+/, '')}`}
                  alt={product.name}
                  className={styles.slider__image}
                />
              </div>
            </div>

            <div className={styles.information}>
              <div className={styles.information__colors}>
                <div>
                  <p className={styles.information__title}>Available colors</p>
                  <div className={styles.colors}>
                    {colorVariants.map(item => (
                      <NavLink
                        key={item.id}
                        to={`/${item.category}/${item.id}`}
                        className={`${styles.colors__button} ${
                          item.color === product.color
                            ? styles.active__color
                            : ''
                        }`}
                      >
                        <span
                          className={styles.colors__circle}
                          style={{ backgroundColor: colorMap[item.color] }}
                        />
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className={styles.information__id}>
                  ID: {product.namespaceId}
                </div>
              </div>

              <div>
                <div className={styles.information__capacity}>
                  <p className={styles.information__title}>Select capacity</p>
                  <div className={styles.capacity}>
                    {capacityVariants.map(item => (
                      <NavLink
                        key={item.id}
                        to={`/${item.category}/${item.id}`}
                        className={({ isActive }) =>
                          `${styles.capacity__button} ${isActive ? styles.active__button : ''}`
                        }
                      >
                        {item.capacity}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.items}>
                <div className={styles.items__price}>
                  <p className={styles.price__discount}>
                    ${product.priceDiscount}
                  </p>
                  <p className={styles.price__regular}>
                    ${product.priceRegular}
                  </p>
                </div>

                <ProductActions id={product.id} size="details" />

                <div>
                  <div className={styles.items__characteristic}>
                    <p>Screen</p>
                    <p className={styles.characteristic}>{product.screen}</p>
                  </div>
                  <div className={styles.items__characteristic}>
                    <p>Resolution</p>
                    <p className={styles.characteristic}>
                      {product.resolution}
                    </p>
                  </div>
                  <div className={styles.items__characteristic}>
                    <p>Processor</p>
                    <p className={styles.characteristic}>{product.processor}</p>
                  </div>
                  <div className={styles.items__characteristic}>
                    <p>RAM</p>
                    <p className={styles.characteristic}>{product.ram}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.details__id}>ID: {product.namespaceId}</div>
          </div>

          <div className={styles.description}>
            <ProductDescription product={product} />
          </div>

          <ProductsSlider
            title="You may also like"
            products={recommendedProducts}
          />
        </div>
      </div>
    </div>
  );
};
