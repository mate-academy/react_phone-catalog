import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDetailed } from '../../types/types';
import { getPhones } from '../../servises/phones';
import { getTablets } from '../../servises/tablets';
import { getAccessories } from '../../servises/accessories';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components/BradCrumbs';
import { BackButton } from '../../components/BackButton';
import { AddToCartButton } from '../../components/AddToCartButton';
import { FavoriteButton } from '../../components/FavoriteButton';
import { ProductSlider } from '../../components/ProductsSlider';

export const ProductDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryGoods, setCategoryGoods] = useState<ProductDetailed[]>();
  const [product, setProduct] = useState<ProductDetailed>();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const itemId = pathname.split('/')[2];

  useEffect(() => {
    setIsLoading(true);

    const data =
      category === 'phones'
        ? getPhones()
        : category === 'tablets'
          ? getTablets()
          : category === 'accessories'
            ? getAccessories()
            : null;

    if (data) {
      data
        .then((goods: ProductDetailed[]) => {
          setCategoryGoods(goods);
          const product = goods.find(good => good.id === itemId);
          setProduct(product);
        })
        .catch(() => {
          throw new Error();
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    const product = categoryGoods?.find(good => good.id === itemId);
    setProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className={styles.container}>
        <Breadcrumbs details={product?.name} />
        <BackButton />
        {product ? (
          <>
            <h1 className={styles.title}>{product?.name}</h1>
            <div className={styles.main}>
              <div className={styles.images}>
                <div className={styles.mainImageContainer}>
                  <img src={product?.images[mainImageIndex]} alt="product" />
                </div>
                <div className={styles.imagePreview}>
                  {product?.images
                    .filter((_, i) => i !== mainImageIndex)
                    .map((img, i) => (
                      <div
                        className={styles.smallImage}
                        key={img}
                        onClick={() => setMainImageIndex(i)}
                      >
                        <img src={img} alt="product" />
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.colorsBlock}>
                  <div className={styles.colorsTop}>
                    <p className={styles.detailsText}>Available colors</p>
                    <p className={styles.idText}>ID: 802390</p>
                  </div>
                  <div className={styles.colorOptions}>
                    <div className={styles.colorCircle}>
                      <div
                        className={styles.insideCircle}
                        style={{ backgroundColor: `${product?.color}` }}
                      ></div>
                    </div>
                    <div className={styles.colorCircle}>
                      <div className={styles.insideCircle}></div>
                    </div>
                    <div className={styles.colorCircle}>
                      <div className={styles.insideCircle}></div>
                    </div>
                    <div className={styles.colorCircle}>
                      <div className={styles.insideCircle}></div>
                    </div>
                  </div>
                </div>
                <div className={styles.capacityBlock}>
                  <p className={styles.detailsText}>Select capacity</p>
                  <div className={styles.capacityOptions}>
                    {product?.capacityAvailable.map(item => (
                      <p
                        key={item}
                        className={
                          item === product.capacity
                            ? `${styles.capacityText} ${styles.capacityActive}`
                            : styles.capacityText
                        }
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={styles.prices}>
                  <p className={styles.price}>${product?.priceDiscount}</p>
                  <p className={styles.fullPrice}>${product?.priceRegular}</p>
                </div>
                <div className={styles.actions}>
                  <div className={styles.cartButtonContainer}>
                    <AddToCartButton product={product} />
                  </div>
                  <FavoriteButton product={product} />
                </div>
                <div className={styles.description}>
                  <div>
                    <p className={styles.detailsText}>Screen</p>
                    <p className={styles.value}>{product?.screen}</p>
                  </div>
                  <div>
                    <p className={styles.detailsText}>Capacity</p>
                    <p className={styles.value}>{product?.capacity}</p>
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
                  <p key={item.title} className={styles.aboutDescription}>
                    {item.text[0]}
                  </p>
                ))}
              </div>
              <div className={styles.techSpecs}>
                <h3 className={styles.infoTitle}>Tech specs</h3>
                <div className={styles.techBlocks}>
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
                  <div className={styles.techBlock}>
                    <p className={styles.detailsText}>Camera</p>
                    <p className={styles.value}>{product?.camera}</p>
                  </div>
                  <div className={styles.techBlock}>
                    <p className={styles.detailsText}>Zoom</p>
                    <p className={styles.value}>{product?.zoom}</p>
                  </div>
                  <div className={styles.techBlock}>
                    <p className={styles.detailsText}>Cell</p>
                    <p className={styles.value}>{product?.cell}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className={styles.notFound}>Product was not found</p>
        )}
      </div>
      {product && (
        <>
          <div className={styles.alsoLike}>
            <h2 className={styles.alsoLikeTitle}>You may also like</h2>
            {categoryGoods && <ProductSlider goods={categoryGoods} isLoading={isLoading} />}
          </div>
        </>
      )}
    </>
  );
};
