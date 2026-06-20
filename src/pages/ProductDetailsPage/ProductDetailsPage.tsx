import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone, Tablet, Accessories } from '../../Interface';
import { useCart } from '../../Functional/CartContext/CartContext';
import './ProductDetailsPage.scss';
import { YourComponent } from './YourComponent';
import { getBaseUrl } from '../../utils';

import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export const ProductDetailsPage = () => {
  const { productId, category } = useParams();
  const { pathname } = useLocation();

  const { addToCart, toggleFavorite, removeFromCart, cart, favorites } =
    useCart();

  const [product, setProduct] = useState<Phone | Tablet | Accessories | null>(
    null,
  );

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

  const [productNumericId, setProductNumericId] = useState<number | null>(null);

  const isPhoneOrTablet = (
    item: Phone | Tablet | Accessories,
  ): item is Phone | Tablet => {
    return 'capacityAvailable' in item && !!item.capacityAvailable;
  };

  const buildProductId = (
    product: Phone | Tablet | Accessories,
    color?: string | null,
    capacity?: string | null,
  ) => {
    const targetColor = color ?? product.color;
    const targetCapacity =
      capacity ?? (isPhoneOrTablet(product) ? product.capacity : null);

    const found = allProducts.find(item => {
      const sameModel =
        'namespaceId' in item &&
        'namespaceId' in product &&
        item.namespaceId === product.namespaceId;

      const colorMatch = item.color === targetColor;

      const capacityMatch = isPhoneOrTablet(item)
        ? item.capacity === targetCapacity
        : true;

      return sameModel && colorMatch && capacityMatch;
    });

    return found?.id ?? product.id;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category || !productId) {
        setProduct(null);

        return;
      }

      setIsLoading(true);

      const categoryUrlMap: Record<string, string> = {
        phones: 'api/phones.json',
        tablets: 'api/tablets.json',
        accessories: 'api/accessories.json',
      };

      try {
        const productsFile = categoryUrlMap[category];

        if (!productsFile) {
          setProduct(null);

          return;
        }

        const response = await fetch(`${getBaseUrl()}${productsFile}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${productsFile}`);
        }

        const data: (Phone | Tablet | Accessories)[] = await response.json();

        setAllProducts(data);

        const found = data.find(item => item.id === productId);

        if (found) {
          setProduct(found);
          setSelectedColor(found.color);
          setSelectedImage(found.images?.[0] || 'img/page-not-found.png');
          setSelectedCapacity(isPhoneOrTablet(found) ? found.capacity : null);

          try {
            const productsRes = await fetch(`${getBaseUrl()}api/products.json`);

            if (productsRes.ok) {
              const productsData = await productsRes.json();
              const matched = productsData.find(
                (p: { itemId: string; id: number }) => p.itemId === found.id,
              );

              if (matched) {
                setProductNumericId(matched.id);
              } else {
                setProductNumericId(null);
              }
            }
          } catch {
            setProductNumericId(null);
          }
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

  useEffect(() => {
    const [capacity, color] = productId
      ? productId.split('-').slice(-2)
      : [null, null];

    setSelectedColor(color || null);
    setSelectedCapacity(capacity || null);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const itemKey = `${product.id}-${selectedColor || product.color}-${selectedCapacity || ''}`;

    if (isInCart) {
      removeFromCart(itemKey);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.priceDiscount,
        image: selectedImage || 'img/page-not-found.png',
        color: selectedColor || product.color,
        capacity: selectedCapacity || undefined,
        quantity: 1,
        category: product.category,
      });
    }
  };

  const handleToggleFavorite = () => {
    if (!product) {
      return;
    }

    toggleFavorite(product.id);
  };

  const isInCart = cart.some(
    item =>
      item.id === product?.id &&
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
    item => item.category === product?.category && item.id !== product?.id,
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
          src="./icons/arrow-right-small.svg"
          alt="arrow-right"
          className="home--nav-arrow"
        />

        <a href={getCategoryLink()}>
          <YourComponent product={product} />
        </a>

        <img
          src="./icons/arrow-right-small.svg"
          alt="arrow-right"
          className="home--nav-arrow"
        />

        <span className="product-details__id">{product.name}</span>

        <span className="product-details__item-id">ID: {productNumericId}</span>
      </div>

      <div className="product-details--back">
        <a href={getCategoryLink()} className="product-details__back-link">
          <img
            src="./icons/arrow-left-small.svg"
            alt="back"
            className="product-details__back-icon"
          />
          <span className="product-details__back-text">Back</span>
        </a>
      </div>

      <h1 className="product-details__title">{product.name}</h1>

      <div className="product-details__main">
        <div className="product-details__gallery">
          <div className="gallery__thumbnails">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={imageError[image] ? 'img/page-not-found.png' : image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${
                  selectedImage === image ? 'thumbnail--active' : ''
                }`}
                onClick={() => setSelectedImage(image)}
                loading="lazy"
                onError={() =>
                  setImageError(prev => ({ ...prev, [image]: true }))
                }
              />
            ))}
          </div>

          <div className="gallery__main-image">
            <img
              src={
                imageError[selectedImage || '']
                  ? 'img/page-not-found.png'
                  : selectedImage || 'img/page-not-found.png'
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
        </div>

        <div className="product-details__info">
          <div className="product-details__colors">
            <p className="product-details__label">Available colors</p>

            <div className="color-options">
              {product.colorsAvailable?.map(color => (
                <Link
                  key={color}
                  to={`/${category}/${buildProductId(
                    product,
                    color,
                    selectedCapacity,
                  )}`}
                  className={`color-option color-option--${color
                    .toLowerCase()
                    .replace(/ /g, '-')} ${
                    selectedColor === color ? 'color-option--active' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {isPhoneOrTablet(product) && product.capacityAvailable && (
            <div className="product-details__capacities">
              <p className="product-details__label">Select capacity</p>

              <div className="capacity-options">
                {product.capacityAvailable.map(capacity => (
                  <Link
                    key={capacity}
                    to={`/${category}/${buildProductId(
                      product,
                      selectedColor,
                      capacity,
                    )}`}
                    className={`capacity-option ${
                      selectedCapacity === capacity
                        ? 'capacity-option--active'
                        : ''
                    }`}
                  >
                    {capacity}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="product-details__price-block">
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
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <div
                className={`product-details__favorite ${
                  favorites.includes(product.id) ? 'favorite--active' : ''
                }`}
                onClick={handleToggleFavorite}
              >
                <img
                  src={
                    favorites.includes(product.id)
                      ? './icons/heart-active.svg'
                      : './icons/heart.svg'
                  }
                  alt="favorite"
                  className="product-details__favorite-icon"
                />
              </div>
            </div>
          </div>

          <div className="product__tech-specs">
            <div className="product__specs-list">
              {'screen' in product && product.screen && (
                <div className="product__spec">
                  <span className="product__spec-title">Screen</span>
                  <span className="product__spec-value">{product.screen}</span>
                </div>
              )}
              {'resolution' in product && product.resolution && (
                <div className="product__spec">
                  <span className="product__spec-title">Resolution</span>
                  <span className="product__spec-value">
                    {product.resolution}
                  </span>
                </div>
              )}
              {'processor' in product && product.processor && (
                <div className="product__spec">
                  <span className="product__spec-title">Processor</span>
                  <span className="product__spec-value">
                    {product.processor}
                  </span>
                </div>
              )}
              {'ram' in product && product.ram && (
                <div className="product__spec">
                  <span className="product__spec-title">RAM</span>
                  <span className="product__spec-value">{product.ram}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="product-details__bottom">
        {'description' in product && Array.isArray(product.description) && (
          <div className="product-details__description">
            <h2>About</h2>
            {(product.description as { title: string; text: string[] }[]).map(
              (section, i) => (
                <div key={i}>
                  <h3>{section.title}</h3>
                  {section.text.map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
              ),
            )}
          </div>
        )}

        <div className="product-details__tech-specs">
          <h2>Tech specs</h2>
          <div>
            {'screen' in product && product.screen && (
              <p>
                <span>Screen</span>
                <span>{product.screen}</span>
              </p>
            )}
            {'resolution' in product && product.resolution && (
              <p>
                <span>Resolution</span>
                <span>{product.resolution}</span>
              </p>
            )}
            {'processor' in product && product.processor && (
              <p>
                <span>Processor</span>
                <span>{product.processor}</span>
              </p>
            )}
            {'ram' in product && product.ram && (
              <p>
                <span>RAM</span>
                <span>{product.ram}</span>
              </p>
            )}
            {'camera' in product && product.camera && (
              <p>
                <span>Camera</span>
                <span>{product.camera}</span>
              </p>
            )}
            {'zoom' in product && product.zoom && (
              <p>
                <span>Zoom</span>
                <span>{product.zoom}</span>
              </p>
            )}
            {'cell' in product && Array.isArray(product.cell) && (
              <p>
                <span>Cell</span>
                <span>{product.cell.join(', ')}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="related-products">
        <div className="related-products__header">
          <h2>You may also like</h2>

          <div className="related-products__nav">
            <button className="brand__nav-btn swiper-prev-btn">
              <img src="./icons/arrow-left-small-white.svg" alt="prev" />
            </button>

            <button className="brand__nav-btn swiper-next-btn">
              <img src="./icons/arrow-right-small-white.svg" alt="next" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn',
          }}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {relatedProducts.map(item => {
            const itemKey = `${item.id}-${item.color}-${isPhoneOrTablet(item) ? item.capacity : ''}`;
            const itemInCart = cart.some(c => c.id === item.id);
            const itemIsFav = favorites.includes(item.id);

            return (
              <SwiperSlide key={item.id}>
                <div className="related-products__card">
                  <Link
                    to={`/${item.category}/${item.id}`}
                    className="related-products__card-link"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="related-products__card-image"
                    />

                    <p className="related-products__card-title">{item.name}</p>
                  </Link>

                  <div className="related-products__card-prices">
                    <span className="related-products__card-price">
                      ${item.priceDiscount}
                    </span>

                    <span className="related-products__card-price--old">
                      ${item.priceRegular}
                    </span>
                  </div>

                  <div className="related-products__card-specs">
                    {'screen' in item && item.screen && (
                      <p>
                        <span className="related-products__card-spec-label">
                          Screen
                        </span>
                        <span className="related-products__card-spec-value">
                          {item.screen}
                        </span>
                      </p>
                    )}

                    {isPhoneOrTablet(item) && item.capacity && (
                      <p>
                        <span className="related-products__card-spec-label">
                          Capacity
                        </span>
                        <span className="related-products__card-spec-value">
                          {item.capacity}
                        </span>
                      </p>
                    )}

                    {'ram' in item && item.ram && (
                      <p>
                        <span className="related-products__card-spec-label">
                          RAM
                        </span>
                        <span className="related-products__card-spec-value">
                          {item.ram}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="related-products__card-actions">
                    <button
                      className={`related-products__card-btn related-products__card-btn--add ${
                        itemInCart ? 'added' : ''
                      }`}
                      onClick={() => {
                        if (itemInCart) {
                          removeFromCart(itemKey);
                        } else {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.priceDiscount,
                            image: item.images[0],
                            color: item.color,
                            capacity: isPhoneOrTablet(item)
                              ? item.capacity
                              : undefined,
                            quantity: 1,
                            category: item.category,
                          });
                        }
                      }}
                    >
                      {itemInCart ? 'Added to cart' : 'Add to cart'}
                    </button>

                    <div
                      className={`related-products__card-btn related-products__card-btn--favorite ${
                        itemIsFav ? 'favorite--active' : ''
                      }`}
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <img
                        src={
                          itemIsFav
                            ? './icons/heart-active.svg'
                            : './icons/heart.svg'
                        }
                        alt="favorite"
                        className="related-products__card-btn-icon"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
