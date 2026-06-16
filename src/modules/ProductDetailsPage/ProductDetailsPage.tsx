import { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Loader } from '../shared/components/Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '../../utils/api';
import { Product } from '../../types/Product';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { toggleArrayIds } from '../../utils/toggleArrayIds';
import { useAppContext } from '../../context/AppContext';
import cn from 'classnames';
import { DetailedProduct } from '../../types/DetailProduct';
import { ProductCarousel } from '../shared/components/ProductCarousel';
import { ProductCard } from '../shared/components/ProductCard';
import { COLOR_MAP } from '../../utils/colors';
import { Accessory } from '../../types/Accessory';
import { NUMBER_OF_VISIBLE_PRODUCTS } from '../../types/Constants';

type TargetProductsType = Phone[] | Tablet[] | Accessory[];

export const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [targetProducts, setTargetProducts] = useState<TargetProductsType>([]);
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [currentImgId, setCurrentImgId] = useState<number>(0);
  const navigate = useNavigate();
  const { productId, category } = useParams();
  const { favoritesIds, cartIds, setFavoritesIds, setCartIds } =
    useAppContext();
  const [isImgLoad, setIsImgLoad] = useState(false);

  const currentItemId = useMemo(() => {
    const currentProduct = products.find(prod => prod.id === Number(productId));

    return currentProduct ? currentProduct.itemId : null;
  }, [products, productId]);

  useEffect(() => {
    setIsLoading(true);

    getProducts().then(productsFromServer => setProducts(productsFromServer));
  }, []);

  useEffect(() => {
    const fetchData = () => {
      switch (category) {
        case 'phones':
          return getPhones();
        case 'tablets':
          return getTablets();
        case 'accessories':
          return getAccessories();
        default:
          return Promise.resolve([]);
      }
    };

    fetchData()
      .then(data => {
        const currentProduct = data.find(prod => prod.id === currentItemId);

        setProduct(currentProduct || null);
        setTargetProducts(data);
      })
      .catch(() => setProduct(null))
      .finally(() => setIsLoading(false));
  }, [category, currentItemId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsImgLoad(true);
    setCurrentImgId(0);
  }, [productId]);

  const toggleFavorites = (id: number) => {
    setFavoritesIds(toggleArrayIds(favoritesIds, id));
  };

  const toggleAddButton = (id: number) => {
    setCartIds(toggleArrayIds(cartIds, id));
  };

  const imgList = useMemo(() => {
    return (product?.images ?? []).map((src, index) => ({
      id: index,
      src,
      alt: src,
    }));
  }, [product?.images]);

  const allSpecs = [
    { label: 'Screen', value: product?.screen },
    { label: 'Resolution', value: product?.resolution },
    { label: 'Processor', value: product?.processor },
    { label: 'RAM', value: product?.ram },
    { label: 'Camera', value: (product as Phone | Tablet)?.camera },
    { label: 'Zoom', value: (product as Phone | Tablet)?.zoom },
    { label: 'Cell', value: product?.cell },
  ];

  const navigateToColor = (color: string) => {
    const newProduct = targetProducts.find(targetProduct => {
      return (
        targetProduct.namespaceId === product?.namespaceId &&
        targetProduct.color === color &&
        targetProduct.capacity === product?.capacity
      );
    });

    if (!newProduct) {
      return;
    }

    const foundProduct = products.find(prod => prod.itemId === newProduct?.id);

    navigate(`/product/${category}/${foundProduct?.id}`);
  };

  const navigateToCapacity = (capacity: string) => {
    const newProduct = targetProducts.find(targetProduct => {
      return (
        targetProduct.namespaceId === product?.namespaceId &&
        targetProduct.capacity === capacity &&
        targetProduct.color === product?.color
      );
    });

    if (!newProduct) {
      return;
    }

    const foundProduct = products.find(prod => prod.itemId === newProduct?.id);

    navigate(`/product/${category}/${foundProduct?.id}`);
  };

  const suggestedProducts = useMemo(() => {
    const productsByCategory = products.filter(
      prod => prod.category === category,
    );

    for (let i = productsByCategory.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [productsByCategory[i], productsByCategory[j]] = [
        productsByCategory[j],
        productsByCategory[i],
      ];
    }

    return productsByCategory.slice(0, NUMBER_OF_VISIBLE_PRODUCTS);
  }, [category, products, productId]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          {product ? (
            <div className={styles.container}>
              <div className={styles.header}>
                <div className={styles.nav}>
                  <div className={styles.historyNav}>
                    <Link className={styles.historyLink} to={'/'}>
                      <img src="icons/home.svg" alt="home" />
                    </Link>
                    <img
                      src="icons/chevron-arrow-right.svg"
                      alt="arrow-right"
                    />
                    <Link
                      className={`${styles.historyLink} ${styles.pathname}`}
                      to={`/${category}`}
                    >
                      {category}
                    </Link>
                    <img
                      src="icons/chevron-arrow-right.svg"
                      alt="arrow-right"
                    />
                    <span className={styles.currentPathname}>
                      {product?.name}
                    </span>
                  </div>

                  <Link className={styles.backBtnContainer} to={`/${category}`}>
                    <img
                      className={styles.arrow}
                      src="icons/chevron-arrow-left.svg"
                      alt="arrow-left"
                    />
                    <span className={styles.backBtn}>Back</span>
                  </Link>
                </div>

                <h2
                  className={`${styles.productTitle} ${styles.productTitleMod}`}
                >
                  {product?.name}
                </h2>

                <div className={styles.productInfo}>
                  <div className={styles.photos}>
                    <div className={styles.mainPhotoContainer}>
                      {isImgLoad && <Loader />}
                      {imgList
                        .filter(img => img.id === currentImgId)
                        .map(img => (
                          <img
                            key={`${productId}-${img.id}`}
                            className={cn(styles.mainImg, {
                              [styles.hidden]: isImgLoad,
                            })}
                            src={`${img.src}`}
                            alt={img.alt}
                            onLoad={() => setIsImgLoad(false)}
                          />
                        ))}
                    </div>

                    <div className={styles.photoPreviews}>
                      {imgList.map(img => (
                        <button
                          className={styles.previewBtn}
                          key={img.id}
                          onClick={() => setCurrentImgId(img.id)}
                        >
                          <img
                            className={styles.previewImg}
                            src={`${img.src}`}
                            alt={img.alt}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.mainControls}>
                    <div className={styles.colors}>
                      <div className={styles.colorsSelect}>
                        <p className={styles.colorsTitle}>Available colors</p>
                        <div className={styles.colorsBtns}>
                          {product?.colorsAvailable.map(colorItem => (
                            <button
                              onClick={() => {
                                navigateToColor(colorItem);
                              }}
                              style={{
                                backgroundColor:
                                  COLOR_MAP[`${colorItem.toLowerCase()}`] ||
                                  'transparent',
                              }}
                              className={`${styles.colorBtn} ${colorItem === product.color ? styles.isActive : ''}`}
                              key={colorItem}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className={styles.colorsProductId}>ID: {productId}</p>

                    <div className={styles.selectCapacity}>
                      <p className={styles.capacityTitle}>Select capacity</p>
                      <div className={styles.capacityBtnsContainer}>
                        {product?.capacityAvailable.map(capacityItem => (
                          <button
                            onClick={() => navigateToCapacity(capacityItem)}
                            className={cn(styles.capacityBtn, {
                              [styles.isActive]:
                                capacityItem === product.capacity,
                            })}
                            key={capacityItem}
                          >
                            {capacityItem}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.priceContainer}>
                      <div className={styles.priceTitles}>
                        <h2 className={styles.currentPrice}>
                          ${product?.priceDiscount}
                        </h2>
                        <p className={styles.regularPrice}>
                          ${product?.priceRegular}
                        </p>
                      </div>
                      <div className={styles.mainButtons}>
                        <button
                          onClick={() => toggleAddButton(Number(productId))}
                          className={cn(styles.addBtn, {
                            [styles.isActive]: cartIds.includes(
                              Number(productId),
                            ),
                          })}
                        >
                          {cartIds.includes(Number(productId))
                            ? 'Added to cart'
                            : 'Add to cart'}
                        </button>
                        <button
                          onClick={() => toggleFavorites(Number(productId))}
                          className={styles.favoritesBtn}
                        >
                          <img
                            className={styles.favorites}
                            src={
                              favoritesIds.includes(Number(productId))
                                ? 'icons/favorites-filled.svg'
                                : 'icons/favorites.svg'
                            }
                            alt="favorites"
                          />
                        </button>
                      </div>
                    </div>

                    <dl className={styles.shortSpecs}>
                      <div className={styles.specRow}>
                        <dt
                          className={`${styles.specItem} ${styles.specItemTitle}`}
                        >
                          Screen
                        </dt>
                        <dd
                          className={`${styles.specItem} ${styles.specItemValue}`}
                        >
                          {product?.screen}
                        </dd>
                      </div>
                      <div className={styles.specRow}>
                        <dt
                          className={`${styles.specItem} ${styles.specItemTitle}`}
                        >
                          Resolution
                        </dt>
                        <dd
                          className={`${styles.specItem} ${styles.specItemValue}`}
                        >
                          {product?.resolution}
                        </dd>
                      </div>
                      <div className={styles.specRow}>
                        <dt
                          className={`${styles.specItem} ${styles.specItemTitle}`}
                        >
                          Processor
                        </dt>
                        <dd
                          className={`${styles.specItem} ${styles.specItemValue}`}
                        >
                          {product?.processor}
                        </dd>
                      </div>
                      <div className={styles.specRow}>
                        <dt
                          className={`${styles.specItem} ${styles.specItemTitle}`}
                        >
                          RAM
                        </dt>
                        <dd
                          className={`${styles.specItem} ${styles.specItemValue}`}
                        >
                          {product?.ram}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <div className={styles.productDetailInfo}>
                <div className={styles.about}>
                  <h3
                    className={`${styles.aboutTitle} ${styles.aboutTitleMod}`}
                  >
                    About
                  </h3>

                  {product?.description.map((item, index) => (
                    <section key={index} className={styles.aboutSection}>
                      <h4 className={styles.aboutSectionTitle}>{item.title}</h4>

                      {item.text.map((paragraph, paragraphIndex) => (
                        <p
                          className={styles.aboutSectionParagraph}
                          key={paragraphIndex}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </section>
                  ))}
                </div>

                <div className={styles.techSpecs}>
                  <h3 className={`${styles.techTitle} ${styles.techTitleMod}`}>
                    Tech specs
                  </h3>

                  <dl className={styles.techSpecContainer}>
                    {allSpecs.map((spec, index) => (
                      <div key={index} className={styles.techSpecRow}>
                        <dt className={styles.techSpecLabel}>{spec.label}</dt>
                        <dd className={styles.techSpecValue}>
                          {Array.isArray(spec.value)
                            ? spec.value.join(', ')
                            : spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <ProductCarousel title="You may also like">
                {suggestedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </ProductCarousel>
            </div>
          ) : (
            <div className={styles.loaderContainer}>Product was not found</div>
          )}
        </>
      )}
    </>
  );
};
