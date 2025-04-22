/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone, Tablet, Accessories } from '../../Interface';
import { useCart } from '../../Functional/CartContext/CartContext';
import './ProductDetailsPage.scss';
import { YourComponent } from './YourComponent';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { addToCart, toggleFavorite, cart, favorites } = useCart();

  const [product, setProduct] = useState<Phone | Tablet | Accessories | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<
    (Phone | Tablet | Accessories)[]
  >([]);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const isPhoneOrTablet = (
    item: Phone | Tablet | Accessories,
  ): item is Phone | Tablet => {
    return 'capacityAvailable' in item && !!item.capacityAvailable;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const urls = [
        '/api/phones.json',
        '/api/tablets.json',
        '/api/accessories.json',
      ];
      const allData: (Phone | Tablet | Accessories)[] = [];

      try {
        for (const url of urls) {
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`Failed to fetch ${url}`);
          }

          const data = await res.json();

          allData.push(...data);
        }

        setAllProducts(allData);

        const found = allData.find(item => item.id === productId);

        if (found) {
          const params = new URLSearchParams(search);
          const urlColor =
            params.get('color')?.replace('-', ' ') || found.color;
          const urlCapacity =
            params.get('capacity') ||
            (isPhoneOrTablet(found) ? found.capacityAvailable[0] : null);

          const newProduct =
            allData.find(
              p =>
                p.id === productId &&
                p.color === urlColor &&
                ('capacity' in p ? p.capacity === urlCapacity : true),
            ) || found;

          setProduct(newProduct);
          setSelectedColor(urlColor);
          setSelectedImage(
            newProduct.images?.[0]
              ? `/${newProduct.images[0]}`
              : '/img/page-not-found.png',
          );
          setSelectedCapacity(urlCapacity);

          const newParams = new URLSearchParams();

          newParams.set('color', urlColor.toLowerCase().replace(' ', '-'));
          if (isPhoneOrTablet(newProduct) && urlCapacity) {
            newParams.set('capacity', urlCapacity);
          }

          const newUrl = `${pathname}?${newParams.toString()}`;

          if (newUrl !== `${pathname}${search}`) {
            navigate(newUrl, { replace: true });
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        setProduct(null);
      }
    };

    fetchProducts();
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        ('capacity' in p ? p.capacity === selectedCapacity : true),
    );

    if (newProduct) {
      setProduct(newProduct);
      setSelectedColor(color);
      setSelectedImage(
        newProduct.images?.[0]
          ? `/${newProduct.images[0]}`
          : '/img/page-not-found.png',
      );
      navigate(
        `/products/${newProduct.id}?color=${color.toLowerCase().replace(' ', '-')}&capacity=${selectedCapacity || ''}`,
      );
    }
  };

  const handleMemoryChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === selectedColor &&
        ('capacity' in p ? p.capacity === capacity : true),
    );

    if (newProduct) {
      setSelectedCapacity(capacity);
      setProduct(newProduct);
      setSelectedImage(
        newProduct.images?.[0]
          ? `/${newProduct.images[0]}`
          : '/img/page-not-found.png',
      );
      navigate(
        `/products/${newProduct.id}?color=${selectedColor?.toLowerCase().replace(' ', '-') || ''}&capacity=${capacity}`,
      );
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceDiscount,
      image: selectedImage || '/img/page-not-found.png',
      color: selectedColor || product.color,
      capacity: selectedCapacity || undefined,
      quantity: 1,
    });
  };

  const handleToggleFavorite = () => {
    if (!product) {
      return;
    }

    toggleFavorite(product.id);
  };

  const handleImageError = (imageSrc: string) => {
    setImageError(prev => ({ ...prev, [imageSrc]: true }));
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

  const relatedProducts = allProducts
    .filter(
      item => item.category === product?.category && item.id !== product?.id,
    )
    .slice(0, 4);

  if (!product) {
    return <div className="product-details">Loading...</div>;
  }

  return (
    <section className="product-details section">
      <div className="home--nav">
        <a href="#">
          <img src="/public/figmaLogo/Home.svg" alt="home_nav" />
        </a>
        <p className="home--nav-top">{'>'}</p>
        <a href={getCategoryLink()}>
          <YourComponent product={product} />
        </a>
        <p className="home--nav-top">{'>'}</p>
        <span className="product-details__id">ID: {product.id}</span>
      </div>
      <div className="product-details--back">
        <a href={getCategoryLink()}>
          <p className="home--nav-top">{'<'} Back</p>
        </a>
      </div>

      <h1 className="product-details__title">{product.name}</h1>

      <div className="product-details__main">
        <div className="product-details__gallery">
          <div className="gallery__main-image">
            <img
              src={
                imageError[selectedImage || '']
                  ? '/img/page-not-found.png'
                  : selectedImage || '/img/page-not-found.png'
              }
              alt={product.name || 'No image available'}
              loading="lazy"
              onError={() => handleImageError(selectedImage || '')}
            />
          </div>
          <div className="gallery__thumbnails">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={
                  imageError[`/${image}`]
                    ? '/img/page-not-found.png'
                    : `/${image}`
                }
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === `/${image}` ? 'thumbnail--active' : ''}`}
                onClick={() => setSelectedImage(`/${image}`)}
                loading="lazy"
                onError={() => handleImageError(`/${image}`)}
              />
            ))}
          </div>
        </div>

        <div className="product-details__info">
          <div className="product-details__colors">
            <p className="product-details__label">Available colors</p>
            <div className="color-options">
              {product.colorsAvailable?.map(color => (
                <button
                  key={color}
                  className={`color-option color-option--${color.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleColorChange(color)}
                  aria-label={`Select ${color} color`}
                  aria-selected={selectedColor === color}
                />
              ))}
            </div>
          </div>

          {isPhoneOrTablet(product) && product.capacityAvailable && (
            <div className="product-details__capacities">
              <p className="product-details__label">Select capacity</p>
              <div className="capacity-options">
                {product.capacityAvailable.map(option => (
                  <button
                    key={option}
                    className={`capacity-option ${selectedCapacity === option ? 'capacity-option--active' : ''}`}
                    onClick={() => handleMemoryChange(option)}
                    aria-label={`Select ${option} capacity`}
                    aria-selected={selectedCapacity === option}
                  >
                    {option}
                  </button>
                ))}
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
              className={`product-details__add-to-cart ${isInCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className={`product-details__favorite ${favorites.includes(product.id) ? 'favorite--active' : ''}`}
              onClick={handleToggleFavorite}
              aria-label={
                favorites.includes(product.id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
            >
              <img
                src={
                  favorites.includes(product.id)
                    ? '/figmaLogo/ActiveHeart.svg'
                    : '/figmaLogo/HeartLove.svg'
                }
                alt="Favorite"
                className="product-details__favorite-icon"
              />
            </button>
          </div>
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

      <div className="product-details__tech-specs">
        <h2>Tech specs</h2>
        {'screen' in product && <p>Screen: {product.screen}</p>}
        {'resolution' in product && <p>Resolution: {product.resolution}</p>}
        {'processor' in product && <p>Processor: {product.processor}</p>}
        {'ram' in product && <p>RAM: {product.ram}</p>}
        {'capacity' in product && <p>Capacity: {product.capacity}</p>}
        {'camera' in product && <p>Camera: {product.camera}</p>}
        {'zoom' in product && <p>Zoom: {product.zoom}</p>}
        {'cell' in product && product.cell && (
          <p>Cell: {product.cell.join(', ')}</p>
        )}
      </div>

      <div className="related-products">
        <h2>You may also like</h2>
        <div className="related-products__grid">
          {relatedProducts.length === 0 ? (
            <p>No related products found.</p>
          ) : (
            relatedProducts.map(item => (
              <div key={item.id} className="related-products__card">
                <Link to={`/products/${item.id}`} key={item.id}>
                  <img
                    src={
                      imageError[`/${item.images[0]}`]
                        ? '/public/img/page-not-found.png'
                        : `/${item.images[0]}`
                    }
                    alt={item.name}
                    className="related-products__card-image"
                    onError={() => handleImageError(`/${item.images[0]}`)}
                  />
                  <h3 className="related-products__card-title">{item.name}</h3>
                  <div className="related-products__card-prices">
                    <span className="related-products__card-price">
                      ${item.priceDiscount}
                    </span>
                    <span className="related-products__card-price--old">
                      ${item.priceRegular}
                    </span>
                  </div>
                  <div className="related-products__card-specs">
                    {'screen' in item && (
                      <p>
                        <span className="related-products__card-spec-label">
                          Screen:
                        </span>
                        <span className="related-products__card-spec-value">
                          {item.screen}
                        </span>
                      </p>
                    )}
                    {'ram' in item && (
                      <p>
                        <span className="related-products__card-spec-label">
                          RAM:
                        </span>
                        <span className="related-products__card-spec-value">
                          {item.ram}
                        </span>
                      </p>
                    )}
                    {'capacity' in item && (
                      <p>
                        <span className="related-products__card-spec-label">
                          Capacity:
                        </span>
                        <span className="related-products__card-spec-value">
                          {item.capacity}
                        </span>
                      </p>
                    )}
                  </div>
                </Link>
                <div className="related-products__card-actions">
                  <button
                    className={`related-products__card-btn related-products__card-btn--add ${
                      cart.some(
                        cartItem =>
                          cartItem.id === item.id &&
                          cartItem.color === item.color &&
                          ('capacity' in item
                            ? cartItem.capacity === item.capacity
                            : true),
                      )
                        ? 'added'
                        : ''
                    }`}
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.priceDiscount,
                        image: `/${item.images[0]}`,
                        color: item.color,
                        capacity:
                          'capacity' in item ? item.capacity : undefined,
                        quantity: 1,
                      })
                    }
                    disabled={cart.some(
                      cartItem =>
                        cartItem.id === item.id &&
                        cartItem.color === item.color &&
                        ('capacity' in item
                          ? cartItem.capacity === item.capacity
                          : true),
                    )}
                  >
                    {cart.some(
                      cartItem =>
                        cartItem.id === item.id &&
                        cartItem.color === item.color &&
                        ('capacity' in item
                          ? cartItem.capacity === item.capacity
                          : true),
                    )
                      ? 'Added to cart'
                      : 'Add to cart'}
                  </button>
                  <button
                    className={`related-products__card-btn related-products__card-btn--favorite ${
                      favorites.includes(item.id) ? 'favorite--active' : ''
                    }`}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <img
                      src={
                        favorites.includes(item.id)
                          ? '/figmaLogo/ActiveHeart.svg'
                          : '/figmaLogo/HeartLove.svg'
                      }
                      alt="Favorite"
                      className="related-products__card-btn-icon"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
