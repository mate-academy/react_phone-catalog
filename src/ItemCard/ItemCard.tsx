/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import styles from './ItemCard.module.scss';
import { useCart } from '../UseCart/UseCart';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard/ProductCard';

SwiperCore.use([Navigation]);

export const ItemCard: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const goToPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    navigate(-1);
    goToPage();
  };

  const handleHomeClick = () => {
    navigate('/');
    goToPage();
  };

  const handleCategoryClick = (path: string) => {
    navigate(path);
    goToPage();
  };

  const allProducts = [...phones, ...tablets, ...accessories];
  const product = allProducts.find(item => item.id === productId);

  const { state, dispatch } = useCart();

  const isFavorite = state.favorites.some(fav => fav.id === product?.id);
  const isInCart = state.cart.some(cartItem => cartItem.id === product?.id);

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colorsAvailable[0] || '',
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    product?.capacityAvailable[0] || '',
  );
  const [selectedImages, setSelectedImages] = useState<string[]>(
    product?.images || [],
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const updateProductUrl = (color: string, capacity: string) => {
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
    const newProductId = `${product?.namespaceId}-${capacity.toLocaleLowerCase()}-${normalize(color)}`;

    navigate(`/product/${newProductId}`);
  };

  const handleImagesChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    const colorImages = product?.images.map(img =>
      img.replace(product.color, color),
    );

    if (colorImages) {
      setSelectedImages(colorImages);
      setSelectedImageIndex(
        Math.min(selectedImageIndex, colorImages.length - 1),
      );
    }

    updateProductUrl(color, selectedCapacity);
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);

    updateProductUrl(selectedColor, capacity);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const resolvePrices = (p: any) => {
    const regular =
      typeof p?.priceRegular === 'number'
        ? p.priceRegular
        : typeof p?.fullPrice === 'number'
          ? p.fullPrice
          : null;

    const current =
      typeof p?.priceDiscount === 'number'
        ? p.priceDiscount
        : typeof p?.price === 'number'
          ? p.price
          : null;

    return { regular, current };
  };

  const getDiscountedProducts = (products: any[]) => {
    return products.filter(p => {
      const { regular, current } = resolvePrices(p);

      return regular != null && current != null && current < regular;
    });
  };

  const getRandomDiscountProducts = (
    products: any[],
    count: number,
    excludeId?: string,
  ) => {
    const pool = getDiscountedProducts(products)
      .filter(p => p.id !== excludeId)
      .filter(p => Array.isArray(p.images) && p.images.length > 0);

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool.slice(0, Math.max(0, count));
  };

  const [randomDiscountProduct, setRandomDiscountProduct] = useState([]);

  useEffect(() => {
    setRandomDiscountProduct(
      getRandomDiscountProducts(allProducts, 16, product.id),
    );
  }, [productId]);

  const handleAddToCart = (id: string) => {
    const production = allProducts.find(p => p.id === id);

    if (production) {
      dispatch({ type: 'ADD_TO_CART', product: production });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const production = allProducts.find(p => p.id === id);

    if (production) {
      dispatch({ type: 'TOGGLE_FAVORITE', product: production });
    }
  };

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (!a.year) {
      return 1;
    }

    if (!b.year) {
      return -1;
    }

    return b.year - a.year;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + productsPerPage < sortedProducts.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color || product.colorsAvailable[0] || '');
      setSelectedCapacity(
        product.capacity || product.capacityAvailable[0] || '',
      );
      setSelectedImages(product.images || []);
      setSelectedImageIndex(0);
    }
  }, [product, productId]);

  if (!product) {
    return <p>Product not found</p>;
  }

  const colorVariable: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    yellow: '#FFD700',
    purple: '#800080',
    midnight: '#0d1b3a',
    spacegray: '#4A4A4A',
    starlight: '#F5F5DC',
    spaceblack: '#000000',
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.button_back} onClick={handleHomeClick}>
          <img src="img/Home.svg" alt="" />
        </button>
        <img src="img/Arrow-right.svg" alt="" />
        <button
          className={styles.button_back}
          onClick={() => handleCategoryClick(`/${product.category}`)}
        >
          {capitalizeFirstLetter(product.category)}
        </button>
        <img src="img/Arrow-right.svg" alt="" />
        <h2 className={styles.navigation_text}>{product.name}</h2>
      </div>
      <div>
        <button className={styles.button_back} onClick={handleBackClick}>
          <img src="img/Arrow-left.png" alt="" />
          <p className={styles.button_back_text}>Back</p>
        </button>
      </div>
      <h1 className={styles.title}>{product.name}</h1>
      <div className={styles.content}>
        <div className={styles.main_content}>
          <div className={styles.images_block}>
            <div className={styles.side_images}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="imagesForItem"
                  className={`${styles.side_img} ${selectedImageIndex === index ? styles.active_img : ''}`}
                  onClick={() => handleImagesChange(index)}
                />
              ))}
            </div>
            <img
              src={selectedImages[selectedImageIndex]}
              alt="main_img"
              className={styles.main_img}
            />
          </div>
          <div className={styles.product_details}>
            <div className={styles.colors}>
              <p className={styles.colors_title}>Available colors</p>
              <div className={styles.colors_row}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    className={`${styles.color_circle} ${selectedColor === color ? styles.active_color : ''}`}
                    style={{
                      backgroundColor:
                        colorVariable[color.toLowerCase()] || color,
                    }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.capacity}>
              <p className={styles.capacity_title}>Select capacity</p>
              <div className={styles.capacity_row}>
                {product.capacityAvailable.map(capacity => (
                  <button
                    key={capacity}
                    className={`${styles.capacity_button} ${selectedCapacity.toLowerCase() === capacity.toLowerCase() ? styles.active_capacity : ''}`}
                    onClick={() => handleCapacityChange(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.price_section}>
              {product.priceDiscount ? (
                <>
                  <span className={styles.discount_price}>
                    ${product.priceRegular}
                  </span>
                </>
              ) : (
                <span className={styles.price}>${product.priceRegular}</span>
              )}
            </div>
            <div className={styles.checkout}>
              <button
                className={`${styles.add_to_cart_button} ${isInCart ? styles.added_to_cart : ''}`}
                onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
              >
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                className={`${styles.favorite_button} ${isFavorite ? styles.favorite_active : ''}`}
                onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', product })}
              >
                <img
                  src={
                    isFavorite
                      ? 'img/Favourites-filled.svg'
                      : 'img/Favourites.svg'
                  }
                  alt="favorite"
                />
              </button>
            </div>
            <div className={styles.product_info}>
              <div className={styles.product_feature}>
                <span className={styles.feature_label}>Screen</span>
                <span className={styles.feature_value}>{product.screen}</span>
              </div>
              <div className={styles.product_feature}>
                <span className={styles.feature_label}>Capacity</span>
                <span className={styles.feature_value}>{product.capacity}</span>
              </div>
              <div className={styles.product_feature}>
                <span className={styles.feature_label}>Processor</span>
                <span className={styles.feature_value}>
                  {product.processor}
                </span>
              </div>
              <div className={styles.product_feature}>
                <span className={styles.feature_label}>RAM</span>
                <span className={styles.feature_value}>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div className={styles.description}>
          <h2 className={styles.description_title_paragraph}>About</h2>
          {product.description.map((desc, index) => (
            <div key={index} className={styles.description_block}>
              <h3 className={styles.description_title}>{desc.title}</h3>
              {desc.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.description_text}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.tech_specs}>
          <h2 className={styles.tech__title}>Tech specs</h2>
          <div className={styles.spec_row}>
            <span>Screen</span>
            <span>{product.screen}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Resolution</span>
            <span>{product.resolution}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Processor</span>
            <span>{product.processor}</span>
          </div>
          <div className={styles.spec_row}>
            <span>RAM</span>
            <span>{product.ram}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Camera</span>
            <span>{product.camera}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Zoom</span>
            <span>{product.zoom}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Cell</span>
            <span>{product.cell.join(', ')}</span>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.controls}>
          <h1 className={styles.controls_title}>You may also like</h1>
          <div className={styles.buttons_group}>
            <button
              className={`brand-new-slider_prev ${styles.buttons_controls}`}
            >
              <img src="img/Arrow-left.png" alt="Next" />
            </button>
            <button
              className={`brand-new-slider_next  ${styles.buttons_controls}`}
            >
              <img src="img/Arrow-right.png" alt="Next" />
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={16}
          navigation={{
            nextEl: '.brand-new-slider_next',
            prevEl: '.brand-new-slider_prev',
          }}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1200: { slidesPerView: 4, spaceBetween: 16 },
          }}
          className={styles.product_grid}
        >
          {randomDiscountProduct.map(randomProduct => (
            <SwiperSlide
              key={randomProduct.id}
              className={styles.swiper_slide_custom}
            >
              <Link
                to={`/product/${randomProduct.id}`}
                key={randomProduct.id}
                className={styles.link_product}
              >
                <ProductCard
                  key={randomProduct.id}
                  id={randomProduct.id}
                  name={randomProduct.name}
                  price={randomProduct.priceRegular}
                  discountPrice={randomProduct.priceDiscount}
                  screen={randomProduct.screen}
                  capacity={randomProduct.capacity}
                  ram={randomProduct.ram}
                  imageUrl={randomProduct.images[0]}
                  isFavorite={state.favorites.some(
                    fav => fav.id === randomProduct.id,
                  )}
                  isInCart={state.cart.some(
                    cartItem => cartItem.id === randomProduct.id,
                  )}
                  onAddToCart={() => handleAddToCart(randomProduct.id)}
                  onToggleFavorite={() =>
                    handleToggleFavorite(randomProduct.id)
                  }
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
