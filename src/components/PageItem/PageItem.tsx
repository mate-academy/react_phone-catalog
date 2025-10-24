import styles from './PageItem.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import doorIcon from '../../Icons/DoorHome.svg';
import homeIcon from '../../Icons/IconHome.svg';
import leftArrow from '../../Icons/leftArrow.svg';
import rightArrow from '../../Icons/rigthArrowBlack.svg';
import heartIcon from '../../Icons/HeartIcon.svg';
import heartIconRed from '../../Icons/hearRed.svg';
import { allProducts } from '../../data/allProducts';
import { Footer } from '../Footer/Footer';
import { setRaw } from '../utils/storage';
import { setRawCart } from '../utils/storageCart';

export const PageItem = () => {
  const { product } = useLocation().state;
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colorsAvailable[0],
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    product.capacityAvailable[0],
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddCart, setIsAddCart] = useState(false);

  const productIndex = allProducts.findIndex(p => p.itemId === product.id);

  const goHome = () => (window.location.href = '/');
  const selectColor = color => setSelectedColor(color);
  const selectCapacity = capacity => setSelectedCapacity(capacity);

  const renderTechSpecs = () => {
    const specs = [
      { label: 'Screen', value: product.screen },
      { label: 'Resolution', value: product.resolution },
      { label: 'Processor', value: product.processor },
      { label: 'RAM', value: product.ram },
      { label: 'Camera', value: product.camera },
      { label: 'Zoom', value: product.zoom },
      { label: 'Cell', value: product.cell },
    ];

    return specs.map((spec, idx) => (
      <div key={idx} className={styles.techSpecItem}>
        <h3>{spec.label}</h3>
        <h3>{spec.value}</h3>
      </div>
    ));
  };

  const handleFav = prod => {
    const favorites = JSON.parse(localStorage.getItem('favorites_v1')) || [];

    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(item => item.id !== prod.id);
    } else {
      newFavorites = [...favorites, prod];
    }

    setRaw('favorites_v1', JSON.stringify(newFavorites));

    setIsFavorite(!isFavorite);

    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('addCart_v1')) || [];

    let newCart;

    if (isAddCart) {
      newCart = cart.filter(item => item.id !== product.id);
    } else {
      newCart = [...cart, product];
    }

    setRawCart('addCart_v1', JSON.stringify(newCart));
    setIsAddCart(!isAddCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites_v1')) || [];
    const alReadyFavorite = favorites.some(item => item.id === product.id);

    setIsFavorite(alReadyFavorite);
  }, [product.id]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('addCart_v1')) || [];
    const alreadyInCart = cart.some(item => item.id === product.id);

    setIsAddCart(alreadyInCart);
  }, [product.id]);

  return (
    <>
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumb_homeContainer} onClick={goHome}>
          <img
            src={doorIcon}
            alt="Door icon"
            className={styles.breadcrumb_homeContainer_doorIcon}
          />

          <img
            src={homeIcon}
            alt="Home icon"
            className={styles.breadcrumb_homeContainer_homeIcon}
          />
        </div>

        <img src={leftArrow} alt="arrow" />

        <h3 className={styles.breadcrumb_category}>{product.category}</h3>

        <img src={leftArrow} alt="arrow" />

        <h3 className={styles.breadcrumb_productName}>{product.name}</h3>
      </div>

      <div className={styles.backButton} onClick={goHome}>
        <img src={rightArrow} alt="Back arrow" />
        <h3>Back</h3>
      </div>

      <h1 className={styles.productTitle}>{product.name}</h1>

      <div className={styles.containerGeral}>
        <div className={styles.mainInfo}>
          <img
            src={`/${mainImage}`}
            alt="Product"
            className={styles.mainInfo_Image}
          />

          <div className={styles.mainInfo_containerThumbnail629}>
            <div className={styles.mainInfo_thumbnailList}>
              {product.images.map((img, idx) => (
                <div key={idx} className={styles.mainInfo_thumbnailItem}>
                  <img
                    src={`/${img}`}
                    alt={`Thumbnail ${idx}`}
                    className={`${styles.mainInfo_thumbnailImage} ${mainImage === img ? styles.thumbnail_active : ''}`}
                    onClick={() => setMainImage(img)}
                  />
                </div>
              ))}
            </div>

            <img
              src={`/${mainImage}`}
              alt="Product"
              className={styles.mainInfo_ImageFor629}
            />
          </div>
        </div>

        <div className={styles.containerSecondColum629}>
          <div className={styles.idAndColor}>
            <h3 className={styles.idAndColor_text}>Available colors</h3>
            <h3
              className={styles.idAndColor_id}
            >{`ID: ${allProducts[productIndex].id}`}</h3>
          </div>

          <div className={styles.colorSelector}>
            {product.colorsAvailable.map((color, idx) => (
              <div
                key={idx}
                className={`${styles.colorSelector_circle} ${selectedColor === color ? styles.colorSelector_active : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => selectColor(color)}
              />
            ))}
          </div>

          <div className={styles.divider}></div>

          <div>
            <h5 className={styles.selectCapacityText}>Select capacity</h5>
            <div className={styles.capacityContainer}>
              {product.capacityAvailable.map((cap, idx) => (
                <div
                  key={idx}
                  className={`${styles.capacityContainer_option} ${selectedCapacity === cap ? styles.capacityContainer_active : ''}`}
                  onClick={() => selectCapacity(cap)}
                >
                  <h3>{cap}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.priceContainer}>
            <h1
              className={styles.priceContainer_discount}
            >{`$${product.priceDiscount}`}</h1>
            {product.priceRegular && (
              <h1
                className={styles.priceContainer_regular}
              >{`$${product.priceRegular}`}</h1>
            )}
          </div>

          <div className={styles.cartFavoriteContainer}>
            <div
              className={
                isAddCart
                  ? styles.cartFavoriteContainer_cart
                  : styles.cartFavoriteContainer_cart_active
              }
              onClick={() => handleAddToCart()}
            >
              <h3 className={styles.cartFavoriteContainer_text}>Add to cart</h3>
            </div>

            <div
              className={styles.cartFavoriteContainer_favorite}
              onClick={() => handleFav(product)}
            >
              <img
                src={isFavorite ? heartIconRed : heartIcon}
                alt="Favorite icon"
              />
            </div>
          </div>

          <div className={styles.productSpecs}>
            {['Screen', 'Resolution', 'Processor', 'RAM'].map((label, idx) => (
              <div key={idx} className={styles.productSpecs_item}>
                <h3>{label}</h3>
                <h3>{product[label.toLowerCase()]}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionContainer_about}>
          <h1 className={styles.descriptionContainer_about_Title}>About</h1>
          <div className={styles.divider}></div>
          {product.description.map((desc, idx) => (
            <div key={idx}>
              <h1 className={styles.descriptionContainer_about_topicTitle}>
                {desc.title}
              </h1>
              <h3
                className={styles.descriptionContainer_about_topicdescription}
              >
                {desc.text}
              </h3>
            </div>
          ))}
        </div>

        <div className={styles.descriptionContainer_techSpecs}>
          <h1 className={styles.descriptionContainer_techSpecs_title}>
            Tech specs
          </h1>
          <div className={styles.divider}></div>
          {renderTechSpecs()}
        </div>
      </div>

      <Footer />
    </>
  );
};
