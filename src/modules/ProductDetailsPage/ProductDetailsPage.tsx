import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/product';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getRandomProducts } from '../../utils/getRandomProducts';
import { BackButton } from '../../components/BackButton';
import { AddToCartButton } from '../../components/AddToCartButton';
import { AddToFavsButton } from '../../components/AddToFavsButton';
// eslint-disable-next-line max-len
import { ThumbnailGallery } from './components/ThumbnailGallery/ThumbnailGallery';
import { TechList } from '../../components/TechList';
import { LoaderErrorWrapper } from '../../components/LoaderErrorWrapper';
import { ColorPicker } from './components/ColorPicker';
import { CapacityPicker } from './components/CapacityPicker';
import { useTheme } from '../../hooks/useTheme';
import { Description } from './components/Description';
import { ProductType } from '../../types/ProductType';
import { LoadingStatus } from '../../types/LoadingStatus';

export const ProductDetailsPage = () => {
  const { cart } = useAppSelector(state => state.cart);
  const { favourites } = useAppSelector(state => state.favourites);
  const { products } = useAppSelector(state => state.products);
  const { category, productId } = useParams();
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const dispatch = useAppDispatch();

  const reload = () => {
    setUpdatedAt(new Date());
  };

  type ProductState = {
    product: null | ProductType;
    loading: LoadingStatus;
    error: null | string;
  };

  const [productStats, setProductStats] = useState<ProductState>({
    product: null,
    loading: 'pending',
    error: null,
  });
  const { product, loading, error } = productStats;

  const randomProducts = useMemo(() => {
    const preparedItems = products.filter(item => item.itemId !== product?.id);

    return getRandomProducts(preparedItems);
  }, [product?.id, products]);

  const parameters = [
    'screen',
    'resolution',
    'processor',
    'RAM',
    'capacity',
    'camera',
    'zoom',
    'cell',
  ];

  const isSelected = cart.some(item => item.id === product?.id);
  const isLiked = favourites.some(itemId => itemId === product?.id);
  const isDark = useTheme();

  useEffect(() => {
    setProductStats({
      product: null,
      loading: 'pending',
      error: null,
    });

    const fetchProduct = async () => {
      if (category && productId) {
        try {
          await getProduct(category, productId).then(targetItem => {
            setProductStats({
              product: targetItem,
              loading: 'fulfilled',
              error: null,
            });
          });
        } catch (err) {
          setProductStats({
            product: null,
            loading: 'rejected',
            error: 'Something went wrong!',
          });
        }
      }
    };

    fetchProduct();
  }, [category, dispatch, productId, updatedAt]);

  return (
    <main className={styles['product-details-page']}>
      <LoaderErrorWrapper error={error} loading={loading} reload={reload}>
        {product ? (
          <React.Fragment key={product.id}>
            <div className={styles['product-details-page__navigation']}>
              <div className={styles['product-details-page__breadcrumbs']}>
                <Breadcrumbs />
              </div>

              <div className={styles['product-details-page__back-btn']}>
                <BackButton />
              </div>
            </div>

            <div className={styles['product-details-page__content']}>
              <section className={styles['product-details-page__hero']}>
                <h2 className={styles['product-details-page__title']}>
                  {product.name}
                </h2>

                <div className={styles['product-details-page__overview']}>
                  <div className={styles['product-details-page__images']}>
                    <ThumbnailGallery
                      imageUrls={product.images}
                      name={product.name}
                    />
                  </div>

                  <article className={styles['product-details-page__features']}>
                    <div className={styles['product-details-page__pickers']}>
                      <div className={styles['product-details-page__picker']}>
                        <p className={styles['product-details-page__label']}>
                          Available colors
                        </p>
                        <ColorPicker
                          product={product}
                          colors={product.colorsAvailable}
                        />
                      </div>

                      <div
                        className={styles['product-details-page__divider']}
                      />

                      <div className={styles['product-details-page__picker']}>
                        <p className={styles['product-details-page__label']}>
                          Select capacity
                        </p>
                        <CapacityPicker
                          product={product}
                          options={product.capacityAvailable}
                        />
                      </div>

                      <div
                        className={styles['product-details-page__divider']}
                      />
                    </div>

                    <div
                      className={styles['product-details-page__interactions']}
                    >
                      <div className={styles['product-details-page__price']}>
                        <h2
                          className={styles['product-details-page__sale-price']}
                        >
                          {product.priceDiscount}
                        </h2>
                        <p
                          className={`crossed-price ${isDark ? 'crossed-price--dark' : ''}`}
                        >
                          {product.priceRegular}
                        </p>
                      </div>

                      <div className={styles['product-details-page__btns']}>
                        <AddToCartButton
                          isBig
                          isSelected={isSelected}
                          itemId={product.id}
                        />

                        <AddToFavsButton
                          itemId={product.id}
                          isBig={true}
                          isLiked={isLiked}
                        />
                      </div>
                    </div>

                    <TechList
                      parameters={parameters.slice(0, 4)}
                      product={product}
                    />
                  </article>
                </div>
              </section>

              <section className={styles['product-details-page__about']}>
                <div>
                  <h3 className={styles['product-details-page__heading']}>
                    About
                  </h3>
                  <div className={styles['product-details-page__divider']} />
                </div>

                {product.description.map(({ title, text }) => (
                  <Description title={title} texts={text} key={title} />
                ))}
              </section>

              <section className={styles['product-details-page__tech-specs']}>
                <h3 className={styles['product-details-page__heading']}>
                  Tech specs
                </h3>
                <div className={styles['product-details-page__divider']} />
                <div className={styles['product-details-page__tech-list']}>
                  <TechList parameters={parameters} product={product} isBig />
                </div>
              </section>

              <section
                className={styles['product-details-page__recommendations']}
              >
                <ProductsSlider
                  products={randomProducts}
                  heading="You also may like"
                />
              </section>
            </div>
          </React.Fragment>
        ) : (
          <div className={styles['product-details-page__not-found']}>
            <div className={styles['product-details-page__not-found-back']}>
              <BackButton />
            </div>
            <h2>Product not found</h2>
            <div className={styles['product-details-page__not-found-bg']} />
          </div>
        )}
      </LoaderErrorWrapper>
    </main>
  );
};
