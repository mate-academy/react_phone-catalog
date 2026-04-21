import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../components/types/Product';
import { Loader } from '../../components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import { getProducts, getProductById } from '../../components/api/products';
import { ProductCard } from '../../components/ProductList/ProductCard';
import { useFavourites } from '../../context/FavouriteContext';
import { useCart } from '../../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { getItemId, getUniqueId } from '../../utils/getItemId';
import 'swiper/css';
import 'swiper/css/navigation';




export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [numericId, setNumericId] = useState<number | string>('');
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavourites();

  const [isFading, setIsFading] = useState(false);

  const handleNavigate = (url: string) => {
    setIsFading(true);
    setTimeout(() => {
      navigate(url);
    }, 300);
  };


  const handleAddToCart = () => {
    if (!product) return;

    if (isAdded) {
      removeFromCart(uniqueId);
    } else {
      addToCart(product);
    }
  };

  const normalize = (str: string) => str?.toLowerCase();


  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product) return;

    if (favorited) {
      removeFromFavourites(product.itemId);
    } else {
      addToFavourites(product);
    }
  };

  const uniqueId = product ? getUniqueId(product) : '';
  
  const isAdded = !!product && isInCart(uniqueId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedPhoto(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    setIsError(false);

    console.log('useEffect → productId from URL:', productId);


    getProducts()
      .then(all => {
        console.log('All products count:', all.length);
        setAllProducts(all);

        const baseProduct = all.find(p => getItemId(p) === productId);
        console.log('Found baseProduct:', baseProduct);

        if (!baseProduct) {
          setIsError(true);
          return;
        }

         const recommended = all
           .filter(
             p =>
               p.category === baseProduct.category &&
               getItemId(p) !== getItemId(baseProduct),
           )
           .sort(() => 0.5 - Math.random())
           .slice(0, 8);

         setRecommendedProducts(recommended);

        return getProductById(getItemId(baseProduct));
      })
      .then(fullProduct => {
        if (!fullProduct) {
          setIsError(true);
          return;
        }

        setProduct(fullProduct);
        setSelectedPhoto(fullProduct.images?.[0] || '');
        setNumericId(String(fullProduct.id));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const favorited = !!product && isFavourite(product.itemId);


  if (isLoading) return <Loader />;

  if (isError || !product) {
    return (
      <div className={styles.container}>
        <h1 className={styles.error_msg}>Product was not found</h1>
      </div>
    );
  }

  const colorMap: Record<string, string> = {
    black: '#212121',
    white: '#F0F0F0',
    purple: '#B8AFE6',
    red: '#A5282C',
    yellow: '#FFE681',
    green: '#ABE7D2',
    midnightgreen: '#4E5851',
    spacegray: '#535150',
    silver: '#EBEBE3',
    gold: '#F9E5C9',
    rosegold: '#E6C7C2',
    coral: '#FF6F61',
  };

  console.log('colorsAvailable:', product.colorsAvailable);
  console.log('capacityAvailable:', product.capacityAvailable);
  console.log('images:', product.images);
  console.log('description:', product.description);
  console.log(productId);


  return (
    <div className={`${styles.container} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <nav className={styles.breadcrumbs}>
          <Link to="/">
            <img src="./img/HomeIcon.svg" alt="home" />
          </Link>
          <img
            src="./img/ArrowRight.png"
            alt="arrow"
            className={styles.arrowIcon}
          />
          <Link to={`/${product.category}`}>{product.category}</Link>
          <img
            src="./img/ArrowRight.png"
            alt="arrow"
            className={styles.arrowIcon}
          />
          <span>{product.name}</span>
        </nav>

        <button
          onClick={() => handleNavigate(`/${product.category}`)}
          className={`${styles.backButton} small-text12`}
        >
          <img src="./img/Back.svg" alt="back" /> Back
        </button>

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.mainGrid}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {Array.isArray(product.images) &&
                product.images.map(img => (
                  <div
                    key={img}
                    className={`${styles.thumbWrapper} ${selectedPhoto === img ? styles.activeThumb : ''}`}
                    onClick={() => setSelectedPhoto(img)}
                  >
                    <img src={img} alt="thumbnail" className={styles.thumb} />
                  </div>
                ))}
            </div>

            <div className={styles.mainImageWrapper}>
              <img
                src={selectedPhoto}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
          </div>

          <div className={styles.about}>
            <h2 className={styles.subtitle}>About</h2>
            <div className={styles.description}>
              {Array.isArray(product.description) &&
                product.description.map((section, idx) => (
                  <div key={idx} className={styles.descriptionSection}>
                    <h3 className={styles.descriptionTitle}>{section.title}</h3>
                    {section.text.map((paragraph, pIdx) => (
                      <p key={pIdx} className={styles.descriptionText}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.productActions}>
            <div className={styles.selection}>
              <div className={styles.actionsHeader}>
                <p className="label-text">Available colors</p>
                <span className={`${styles.productId} small-text12`}>
                  ID: 800{numericId}
                </span>
              </div>

              <div className={styles.colors}>
                {Array.isArray(product.colorsAvailable) &&
                  product.colorsAvailable.map(colorName => (
                    <button
                      key={`color-${colorName}`}
                      onClick={() => {
                        console.log('👉 CLICK COLOR:', colorName);

                        const target = allProducts.find(
                          p =>
                            (p.namespaceId === product.namespaceId ||
                              getItemId(p)?.includes(product.namespaceId)) &&
                            p.color === colorName &&
                            p.capacity === product.capacity,
                        );

                          console.log('👉 FOUND TARGET:', target);


                        if (target) {
                          navigate(`/${target.category}/${getItemId(target)}`);
                        } else {
                          console.log('❌ TARGET NOT FOUND');
                        }
                      }}
                      className={`${styles.colorCircle} ${product.color === colorName ? styles.activeColor : ''}`}
                      style={{
                        backgroundColor: colorMap[colorName] || colorName,
                      }}
                      title={colorName}
                    />
                  ))}
              </div>
            </div>
            <div className={styles.capacity}>
              <p className={`${styles.label} label-text`}>Select capacity</p>
              <div className={styles.capacityList}>
                {Array.isArray(product.capacityAvailable) &&
                  product.capacityAvailable.map(cap => (
                    <button
                      key={`capacity-${cap}`}
                      onClick={() => {
                          console.log('👉 CLICK CAP:', cap);

                        const normalize = (str: string) =>
                          str.toLowerCase().replace(/\s/g, '');

                        console.log('🔎 product:', product);
                        console.log('🔎 product.itemId:', product?.itemId);

                        const baseId = getItemId(product)
                          .split('-')
                          .slice(0, 3)
                          .join('-');

                        console.log('🔎 baseId:', baseId);
                        console.log(
                          '🔎 product.capacityAvailable:',
                          product.capacityAvailable,
                        );
                        console.log(
                          '🔎 allProducts capacities:',
                          allProducts.map(p => p.capacity),
                        );
                        console.log('🔎 normalized cap:', normalize(cap));

                        const target = allProducts.find(
                          p =>
                            p.itemId.startsWith(baseId) &&
                            normalize(p.capacity) === normalize(cap) &&
                            p.color === product.color,
                        );

                        console.log('👉 FOUND TARGET:', target);
                        

                        if (target) {
                          console.log('👉 NAVIGATE TO:', target.itemId);
                          navigate(`/${target.category}/${target.itemId}`);
                        } else {
                          console.log('❌ TARGET NOT FOUND');
                        }
                      }}
                      className={`${styles.capacityItem} ${product.capacity === cap ? styles.activeCapacity : ''}`}
                    >
                      {cap}
                    </button>
                  ))}
              </div>
            </div>

            <div className={styles.separator} />

            <div className={styles.priceBlock}>
              <span className={styles.priceCurrent}>
                ${product.priceDiscount || product.priceRegular || 0}
              </span>
              {(product.priceRegular || 0) > (product.priceDiscount || 0) && (
                <span className={styles.priceOld}>
                  ${product.priceRegular ?? 0}
                </span>
              )}
            </div>

            <div className={styles.buttons}>
              <button
                //key={uniqueId}
                className={`${styles.addToCart} button-text ${isAdded ? styles.selected : ''}`}
                onClick={handleAddToCart}
                //disabled={isAdded}
              >
                {isAdded ? 'Added' : 'Add to cart'}
              </button>

              <button className={styles.favorite} onClick={handleFavoriteClick}>
                <img
                  src={
                    favorited
                      ? './img/FavouritesFilled.png'
                      : './img/Favourites.png'
                  }
                  alt="fav"
                />
              </button>
            </div>

            <div className={styles.mainSpecs}>
              <div className={styles.specsTable}>
                <div className={styles.specRow}>
                  <span className={styles.mainSpecLabel}>Screen</span>
                  <span className={styles.mainSpecValue}>{product.screen}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.mainSpecLabel}>Resolution</span>
                  <span className={styles.mainSpecValue}>
                    {product.resolution}
                  </span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.mainSpecLabel}>Capacity</span>
                  <span className={styles.mainSpecValue}>
                    {product.capacity}
                  </span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.mainSpecLabel}>RAM</span>
                  <span className={styles.mainSpecValue}>{product.ram}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.techSpecs}>
            <h2 className={styles.subtitle}>Tech specs</h2>
            <div className={styles.specsTable}>
              {[
                { label: 'Screen', value: product.screen },
                { label: 'Resolution', value: product.resolution },
                { label: 'Processor', value: product.processor },
                { label: 'RAM', value: product.ram },
                { label: 'Camera', value: product.camera },
                { label: 'Zoom', value: product.zoom },
                { label: 'Cell', value: product.cell },
              ].map(spec => (
                <div key={spec.label} className={styles.specRow}>
                  <span className={styles.techSpecLabel}>{spec.label}</span>
                  <span className={styles.techSpecValue}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.section__header}>
            <h2 className={`${styles.section__title} h2`}>You may also like</h2>

            <div className={styles.arrows}>
              <button className={`${styles.arrow_btn} js-prev-recommended`}>
                {'<'}
              </button>

              <button className={`${styles.arrow_btn} js-next-recommended`}>
                {'>'}
              </button>
            </div>
          </div>

          <div className={styles.swiper_container}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={4}
              navigation={{
                prevEl: '.js-prev-recommended',
                nextEl: '.js-next-recommended',
              }}
              breakpoints={{
                320: { slidesPerView: 1.3, spaceBetween: 10 },
                640: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 16 },
              }}
            >
              {recommendedProducts.map(item => (
                <SwiperSlide key={item.itemId}>
                  <div
                    onClick={e => {
                      const target = e.target as HTMLElement;

                      if (target.closest('button')) {
                        return;
                      }

                      navigate(`/${item.category}/${item.itemId}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <ProductCard
                      product={item}
                      className={styles.card_home_custom}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    </div>
  );
};
