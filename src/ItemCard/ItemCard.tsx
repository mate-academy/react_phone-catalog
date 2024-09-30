/* eslint-disable max-len */
import React, { useState } from 'react';
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

  const allProducts = [...phones, ...tablets, ...accessories];
  const productFind = allProducts.find(item => item.id === productId);

  const { state, dispatch } = useCart();

  const isFavorite = state.favorites.some(fav => fav.id === productFind?.id);
  const isInCart = state.cart.some(cartItem => cartItem.id === productFind?.id);

  const [selectedColor, setSelectedColor] = useState<string>(
    productFind?.colorsAvailable[0] || '',
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    productFind?.capacityAvailable[0] || '',
  );
  const [selectedImages, setSelectedImages] = useState<string[]>(
    productFind?.images || [],
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const updateProductUrl = (color: string, capacity: string) => {
    const newProductId = `${productFind?.namespaceId}-${capacity.toLocaleLowerCase()}-${color}`;

    navigate(`/product/${newProductId}`);
  };

  const handleImagesChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    const colorImages = productFind?.images.map(img =>
      img.replace(productFind.color, color),
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
      product =>
        product.priceDiscount && product.priceDiscount < product.priceRegular,
    );
  };

  const getRandomDiscountProducts = (products, count) => {
    const discountedProducts = getDiscountedProducts(products);
    const shuffled = [...discountedProducts].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
  };

  const randomDiscountProduct = getRandomDiscountProducts(allProducts, 4);

  const handleAddToCart = (id: string) => {
    const product = phones.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const product = phones.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  if (!productFind) {
    return <p>Product not found</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.button_back} onClick={handleHomeClick}>
          <img src="img/Home.svg" alt="" />
        </button>
        <img src="img/Arrow-right.svg" alt="" />
        <h2 className={styles.navigation_text}>
          {capitalizeFirstLetter(productFind.category)}
        </h2>
        <img src="img/Arrow-right.svg" alt="" />
        <h2 className={styles.navigation_text}>{productFind.name}</h2>
      </div>
      <div>
        <button className={styles.button_back} onClick={handleBackClick}>
          <img src="img/Arrow-left.png" alt="" />
          Back
        </button>
      </div>
      <h1 className={styles.title}>{productFind.name}</h1>
      <div className={styles.content}>
        <div className={styles.side_images}>
          {productFind.images.map((img, index) => (
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
              {productFind.colorsAvailable.map(color => (
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
              {productFind.capacityAvailable.map(capacity => (
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
              {productFind.priceDiscount ? (
                <>
                  <span className={styles.discountPrice}>
                    ${productFind.priceDiscount}
                  </span>
                  <span className={styles.originalPrice}>
                    ${productFind.priceRegular}
                  </span>
                </>
              ) : (
                <span className={styles.price}>
                  ${productFind.priceRegular}
                </span>
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
                <span className={styles.featureValue}>{productFind.screen}</span>
              </div>
              <div className={styles.productFeature}>
                <span className={styles.featureLabel}>Capacity</span>
                <span className={styles.featureValue}>{productFind.capacity}</span>
              </div>
              <div className={styles.productFeature}>
                <span className={styles.featureLabel}>Processor</span>
                <span className={styles.featureValue}>{productFind.processor}</span>
              </div>
              <div className={styles.productFeature}>
                <span className={styles.featureLabel}>RAM</span>
                <span className={styles.featureValue}>{productFind.ram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div className={styles.description}>
          <h2 className={styles.descTitle}>About</h2>
          {productFind.description.map((desc, index) => (
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
            <span>{productFind.screen}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Resolution</span>
            <span>{productFind.resolution}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Processor</span>
            <span>{productFind.processor}</span>
          </div>
          <div className={styles.spec_row}>
            <span>RAM</span>
            <span>{productFind.ram}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Camera</span>
            <span>{productFind.camera}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Zoom</span>
            <span>{productFind.zoom}</span>
          </div>
          <div className={styles.spec_row}>
            <span>Cell</span>
            <span>{productFind.cell.join(', ')}</span>
          </div>
        </div>
      </div>
      <div>
        <h1>You may also like</h1>
        <div className={styles.container_also_like}>
          {randomDiscountProduct.map(randomProduct => (
            <Link
              to={`/product/${productFind.id}`}
              key={productFind.id}
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
