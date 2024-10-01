/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import styles from './ItemCard.module.scss';
import { useCart } from '../UseCart/UseCart';
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';

export const ItemCard: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCategoClick = () => {
    navigate('/phones');
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
    const newProductId = `${product?.namespaceId}-${capacity.toLocaleLowerCase()}-${color}`;

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

  const getDiscountedProducts = products => {
    return products.filter(
      production =>
        production.priceDiscount &&
        production.priceDiscount < production.priceRegular,
    );
  };

  const getRandomDiscountProducts = (products, count) => {
    const discountedProducts = getDiscountedProducts(products);
    const shuffled = [...discountedProducts].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
  };

  const randomDiscountProduct = getRandomDiscountProducts(allProducts, 4);

  const handleAddToCart = (id: string) => {
    const production = phones.find(p => p.id === id);

    if (production) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const production = phones.find(p => p.id === id);

    if (production) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colorsAvailable[0] || '');
      setSelectedCapacity(product.capacityAvailable[0] || '');
      setSelectedImages(product.images || []);
      setSelectedImageIndex(0);
    }
  }, [product, productId]);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.button_back} onClick={handleHomeClick}>
          <img src="img/Home.svg" alt="" />
        </button>
        <img src="img/Arrow-right.svg" alt="" />
        <button className={styles.button_back} onClick={handleCategoClick}>
          {capitalizeFirstLetter(product.category)}
        </button>
        <img src="img/Arrow-right.svg" alt="" />
        <h2 className={styles.navigation_text}>{product.name}</h2>
      </div>
      <div>
        <button className={styles.button_back} onClick={handleBackClick}>
          <img src="img/Arrow-left.png" alt="" />
          <p>Back</p>
        </button>
      </div>
      <h1 className={styles.title}>{product.name}</h1>
      <div className={styles.content}>
        <div className={styles.side_images}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="imagesForItem"
              className={styles.side_img}
              onClick={() => handleImagesChange(index)}
            />
          ))}
        </div>
        <div className={styles.main_content}>
          <img
            src={selectedImages[selectedImageIndex]}
            alt="main_img"
            className={styles.main_img}
          />
          <div className={styles.product_details}>
            <div className={styles.colors}>
              <p>Available colors</p>
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  className={`${styles.color_circle} ${
                    selectedColor === color ? styles.active_color : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>

            <div className={styles.capacity}>
              <p>Select capacity</p>
              {product.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  className={`${styles.capacity_button} ${
                    selectedCapacity == capacity ? styles.active_capacity : ''
                  }`}
                  onClick={() => handleCapacityChange(capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
            <div className={styles.priceSection}>
              {product.priceDiscount ? (
                <>
                  <span className={styles.discountPrice}>
                    ${product.priceDiscount}
                  </span>
                  <span className={styles.originalPrice}>
                    ${product.priceRegular}
                  </span>
                </>
              ) : (
                <span className={styles.price}>${product.priceRegular}</span>
              )}
            </div>
            <div>
              <button
                className={`${styles.addToCartButton} ${isInCart ? styles.addedToCart : ''}`}
                onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
              >
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
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
            <div className={styles.productInfo}>
              <div className={styles.productFeature}>
                <span className={styles.featureLabel}>Screen</span>
                <span className={styles.featureValue}>{product.screen}</span>
              </div>
              <div className={styles.productFeature}>
                <span className={styles.featureLabel}>Capacity</span>
                <span className={styles.featureValue}>{product.capacity}</span>
              </div>
              <div className={styles.productFeature}>
                <span className={styles.featureLabel}>Processor</span>
                <span className={styles.featureValue}>{product.processor}</span>
              </div>
              <div className={styles.productFeature}>
                <span className={styles.featureLabel}>RAM</span>
                <span className={styles.featureValue}>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div className={styles.description}>
          <h2 className={styles.descTitle}>About</h2>
          {product.description.map((desc, index) => (
            <div key={index} className={styles.descBlock}>
              <h3 className={styles.descTitle}>{desc.title}</h3>
              {desc.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.descText}>
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
        <h1>You may also like</h1>
        <div className={styles.container_also_like}>
          {randomDiscountProduct.map(randomProduct => (
            <Link
              to={`/product/${randomProduct.id}`}
              key={randomProduct.id}
              className={styles.linkProduct}
            >
              <DiscountProductCard
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
                onAddToCart={() => handleAddToCart(randomProduct.id)}
                onToggleFavorite={() => handleToggleFavorite(randomProduct.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
