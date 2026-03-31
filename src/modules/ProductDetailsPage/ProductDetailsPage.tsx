import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../components/types/Product';
import { Loader } from '../../components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import { getProducts, getProductById } from '../../components/api/products';
import { ProductCard } from '../../components/ProductList/ProductCard';
import { useFavourites } from '../../context/FavouriteContext';
import { useCart } from '../../context/CartContext';
import { getCarouselStep } from '../../utils/carouselHelpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [numericId, setNumericId] = useState<number | string>('');
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavourites();

  const isAdded = !!product && isInCart(product.itemId);
  const favorited = !!product && isFavourite(product.itemId);

  const handleAddToCart = () => {
    if (!product) return;

    if (isAdded) {
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product) return;

    if (favorited) {
      removeFromFavourites(product.itemId);
    } else {
      addToFavourites(product);
    }
  };


  const [recommendedOffset, setRecommendedOffset] = useState(0);
  const recommendedRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  console.log(recommendedOffset);

  useEffect(() => {
    if (productId) {
      setRecommendedOffset(0);
      setIsLoading(true);
      setIsError(false);

      getProductById(productId)
        .then(data => {
          if (data) {
            setProduct(data);
            setSelectedPhoto(data.images?.[0] || '');

            getProducts().then(allProducts => {
              const found = allProducts.find(p => p.itemId === productId);
              if (found) setNumericId(String(found.id));

              const random = allProducts
                .filter(
                  p => p.category === data.category && p.itemId !== productId,
                )
                .sort(() => 0.5 - Math.random())
                .slice(0, 10);
              setRecommendedProducts(random);
            });
          } else {
            setIsError(true);
          }
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  useEffect(() => {
    if (product?.category) {
      getProducts().then(allProducts => {
        const random = allProducts
          .filter(p => p.category === product.category && p.id !== product.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);
        setRecommendedProducts(random);
      });
    }
  }, [product?.id]);

  //const getStep = () => {
   // if (!listRef.current) return 288;
   // const card = listRef.current.firstElementChild as HTMLElement;
  //  return card ? card.offsetWidth + 16 : 288;
  //};

  //const step = 272 + 16;

  const handleNext = () => {
    if (!containerRef.current || !listRef.current) return;

    const step = getCarouselStep(listRef);

    const containerWidth = containerRef.current.offsetWidth;
    const scrollWidth = listRef.current.scrollWidth;

    setRecommendedOffset(prev => {
      const maxOffset = scrollWidth - containerWidth;
      const nextOffset = prev + step;
      return nextOffset > maxOffset ? maxOffset : nextOffset;
    });
  };

  const handlePrev = () => {
    if (!listRef.current) return;
    const step = getCarouselStep(listRef);
    setRecommendedOffset(prev => Math.max(0, prev - step));
  };

  const isNextDisabled = () => {
    if (
      !containerRef.current ||
      !listRef.current ||
      recommendedProducts.length === 0
    ) {
      return true;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const scrollWidth = listRef.current.scrollWidth;

    return recommendedOffset >= scrollWidth - containerWidth - 5;
  };

  const renderDescription = () => {
    if (!product?.description) return null;

    return product.description.map((section, idx) => (
      <div key={idx} className={styles.descriptionSection}>
        <h3 className={styles.descriptionTitle}>{section.title}</h3>
        {section.text.map((paragraph, pIdx) => (
          <p key={pIdx} className={styles.descriptionText}>
            {paragraph}
          </p>
        ))}
      </div>
    ));
  };

  const getNewIdByColor = (newColor: string) => {
    if (!product) return '';
    const idParts = product.id.split('-');
    idParts[idParts.length - 1] = newColor.toLowerCase().replace(' ', '-');
    return idParts.join('-');
  };

  const getNewIdByCapacity = (newCapacity: string) => {
    if (!product) return '';
    const idParts = product.id.split('-');
    idParts[idParts.length - 2] = newCapacity.toLowerCase();
    return idParts.join('-');
  };

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

  return (
    <div className={styles.container}>
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
          onClick={() => window.history.back()}
          className={`${styles.backButton} small-text12`}
        >
          <img src="./img/Back.svg" alt="back" /> Back
        </button>

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.mainGrid}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images?.map(img => (
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
            <div className={styles.description}>{renderDescription()}</div>
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
                {product.colorsAvailable.map(colorName => (
                  <Link
                    key={colorName}
                    to={`/${product.category}/${getNewIdByColor(colorName)}`}
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
                {product.capacityAvailable.map(cap => (
                  <Link
                    key={cap}
                    to={`/${product.category}/${getNewIdByCapacity(cap)}`}
                    className={`${styles.capacityItem} ${product.capacity === cap ? styles.activeCapacity : ''}`}
                  >
                    {cap}
                  </Link>
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
                className={`${styles.addToCart} button-text ${isAdded ? styles.selected : ''}`}
                onClick={handleAddToCart}
                disabled={!product}
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
              slidesPerView={'auto'}
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
                <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                  <ProductCard
                    product={item}
                    className={styles.card_home_custom}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    </div>
  );
};
