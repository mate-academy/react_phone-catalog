import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone, Tablet, Accessories } from '../../Interface';
import { useCart } from '../../Functional/CartContext/CartContext';
import './ProductDetailsPage.scss';
import { YourComponent } from './YourComponent';

import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export const ProductDetailsPage = () => {
  const { productId, category } = useParams();
  const { pathname } = useLocation();

  const { addToCart, toggleFavorite, cart, favorites } = useCart();

  const [product, setProduct] = useState<
    Phone | Tablet | Accessories | null
  >(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [allProducts, setAllProducts] = useState<
    (Phone | Tablet | Accessories)[]
  >([]);

  const [imageError, setImageError] = useState<{
    [key: string]: boolean;
  }>({});

  const [isLoading, setIsLoading] = useState(true);

  const isPhoneOrTablet = (
    item: Phone | Tablet | Accessories,
  ): item is Phone | Tablet => {
    return 'capacityAvailable' in item && !!item.capacityAvailable;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const categoryUrlMap: Record<string, string> = {
        phones: 'api/phones.json',
        tablets: 'api/tablets.json',
        accessories: 'api/accessories.json',
      };

      const urls =
        category && categoryUrlMap[category]
          ? [categoryUrlMap[category]]
          : [
              'api/phones.json',
              'api/tablets.json',
              'api/accessories.json',
            ];

      try {
        const responses = await Promise.all(
          urls.map(url =>
            fetch(`${import.meta.env.BASE_URL}/${url}`),
          ),
        );

        const datasets = await Promise.all(
          responses.map(res => {
            if (!res.ok) {
              throw new Error(`Failed to fetch ${res.url}`);
            }

            return res.json();
          }),
        );

        const allData: (Phone | Tablet | Accessories)[] = datasets.flat();

        console.log('allData: ', allData);
        console.log('urls: ', urls);

        setAllProducts(allData);

        const found = allData.find(
          item => item.id === productId,
        );

        if (found) {
          setProduct(found);

          setSelectedColor(found.color);

          setSelectedImage(
            found.images?.[0] || 'img/page-not-found.png',
          );

          setSelectedCapacity(
            isPhoneOrTablet(found) ? found.capacity : null,
          );
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId, category]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart({
      id: product.itemId,
      name: product.name,
      price: product.priceDiscount,
      image: selectedImage || 'img/page-not-found.png',
      color: selectedColor || product.color,
      capacity: selectedCapacity || undefined,
      quantity: 1,
    });
  };

  const handleToggleFavorite = () => {
    if (!product) {
      return;
    }

    toggleFavorite(product.itemId);
  };

  const isInCart = cart.some(
    item =>
      item.id === product?.itemId &&
      item.color === selectedColor &&
      item.capacity === selectedCapacity,
  );

  const getCategoryLink = () => {
    if (!product) {
      return '#/phones';
    }

    if (product.category === 'phones') {
      return '#/phones';
    }

    if (product.category === 'tablets') {
      return '#/tablets';
    }

    return '#/accessories';
  };

  const relatedProducts = allProducts.filter(
    item =>
      item.category === product?.category &&
      item.itemId !== product?.itemId,
  );

  if (isLoading) {
    return <div className="product-details">Loading...</div>;
  }

  if (!product) {
    return <div className="product-details">Product not found</div>;
  }

  return (
    <section className="product-details section">
      <div className="home--nav">
        <a href="#">
          <img
            src="./icons/home.svg"
            alt="home_nav"
            className="home--nav-icon"
          />
        </a>

        <img
          src="./icons/arrow-right.svg"
          alt="arrow-right"
          className="home--nav-arrow"
        />

        <a href={getCategoryLink()}>
          <YourComponent product={product} />
        </a>

        <img
          src="./icons/arrow-right.svg"
          alt="arrow-right"
          className="home--nav-arrow"
        />

        <span className="product-details__id">
          {product.name}
        </span>
      </div>

      <div className="product-details--back">
        <a href={getCategoryLink()}>
          <p className="home--nav-top">{'<'} Back</p>
        </a>
      </div>

      <h1 className="product-details__title">
        {product.name}
      </h1>

      <div className="product-details__main">
        <div className="product-details__gallery">
          <div className="gallery__main-image">
            <img
              src={
                imageError[selectedImage || '']
                  ? 'img/page-not-found.png'
                  : selectedImage ||
                    'img/page-not-found.png'
              }
              alt={product.name || 'No image available'}
              loading="lazy"
              onError={() =>
                setImageError(prev => ({
                  ...prev,
                  [selectedImage || '']: true,
                }))
              }
            />
          </div>

          <div className="gallery__thumbnails">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={
                  imageError[image]
                    ? 'img/page-not-found.png'
                    : image
                }
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${
                  selectedImage === image
                    ? 'thumbnail--active'
                    : ''
                }`}
                onClick={() => setSelectedImage(image)}
                loading="lazy"
                onError={() =>
                  setImageError(prev => ({
                    ...prev,
                    [image]: true,
                  }))
                }
              />
            ))}
          </div>
        </div>

        <div className="product-details__info">
          <div className="product-details__colors">
            <p className="product-details__label">
              Available colors
            </p>

            <div className="color-options">
              {product.colorsAvailable?.map(color => (
                <button
                  key={color}
                  className={`color-option color-option--${color
                    .toLowerCase()
                    .replace(' ', '-')}`}
                  onClick={() =>
                    setSelectedColor(color)
                  }
                  aria-label={`Select ${color} color`}
                  aria-selected={
                    selectedColor === color
                  }
                />
              ))}
            </div>
          </div>

          {isPhoneOrTablet(product) &&
            product.capacityAvailable && (
              <div className="product-details__capacities">
                <p className="product-details__label">
                  Select capacity
                </p>

                <div className="capacity-options">
                  {product.capacityAvailable.map(
                    option => (
                      <button
                        key={option}
                        className={`capacity-option ${
                          selectedCapacity === option
                            ? 'capacity-option--active'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedCapacity(option)
                        }
                        aria-label={`Select ${option} capacity`}
                        aria-selected={
                          selectedCapacity === option
                        }
                      >
                        {option}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

          <div className="product-details__prices">
            <span className="product-details__price">
              ${product.priceDiscount}
            </span>

            <span className="product-details__price--old">
              ${product.priceRegular}
            </span>
          </div>

          <div className="product-details__actions">
            <button
              className={`product-details__add-to-cart ${
                isInCart ? 'added' : ''
              }`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart
                ? 'Added to cart'
                : 'Add to cart'}
            </button>

            <button
              className={`product-details__favorite ${
                favorites.includes(product.itemId)
                  ? 'favorite--active'
                  : ''
              }`}
              onClick={handleToggleFavorite}
            >
              ❤️
            </button>
          </div>

          {product && isPhoneOrTablet(product) && (
            <div className="product__tech-specs">
              <h2 className="product__section-title">
                Tech specs
              </h2>

              <div className="product__specs-list">
                <div className="product__spec">
                  <span className="product__spec-title">
                    Screen
                  </span>

                  <span className="product__spec-value">
                    {product.screen}
                  </span>
                </div>

                <div className="product__spec">
                  <span className="product__spec-title">
                    Resolution
                  </span>

                  <span className="product__spec-value">
                    {product.resolution}
                  </span>
                </div>

                <div className="product__spec">
                  <span className="product__spec-title">
                    Processor
                  </span>

                  <span className="product__spec-value">
                    {product.processor}
                  </span>
                </div>

                <div className="product__spec">
                  <span className="product__spec-title">
                    RAM
                  </span>

                  <span className="product__spec-value">
                    {product.ram}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="product-details__description">
        <h2>About</h2>

        {product.description?.map((desc, index) => (
          <div key={index}>
            <h3>{desc.title}</h3>

            {desc.text.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="related-products">
        <h2>You may also like</h2>

        <div className="related-products__nav">
          <button className="brand__nav-btn brand__nav-btn--prev swiper-button-p">
            {'<'}
          </button>

          <button className="brand__nav-btn brand__nav-btn--next swiper-button-n">
            {'>'}
          </button>
        </div>

        <div className="related-products__grid">
          {relatedProducts.length === 0 ? (
            <p>No related products found.</p>
          ) : (
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              navigation={{
                nextEl: '.swiper-button-n',
                prevEl: '.swiper-button-p',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 8,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
              }}
              className="brand__swiper"
            >
              {relatedProducts
                .slice(0, 8)
                .map(relatedItem => (
                  <SwiperSlide
                    key={relatedItem.itemId}
                    className="brand__card"
                  >
                    <Link
                      to={`/${relatedItem.category}/${relatedItem.itemId}`}
                    >
                      <img
                        src={
                          imageError[
                            relatedItem.images[0]
                          ]
                            ? 'img/page-not-found.png'
                            : relatedItem.images[0]
                        }
                        alt={relatedItem.name}
                        className="related-products__card-image"
                        onError={() =>
                          setImageError(prev => ({
                            ...prev,
                            [relatedItem.images[0]]:
                              true,
                          }))
                        }
                      />

                      <h3 className="related-products__card-title">
                        {relatedItem.name}
                      </h3>

                      <div className="related-products__card-prices">
                        <span className="related-products__card-price">
                          $
                          {relatedItem.priceDiscount}
                        </span>

                        <span className="related-products__card-price--old">
                          $
                          {relatedItem.priceRegular}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};