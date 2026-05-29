import React, { useState, useContext } from 'react';
import { ProductsSlider } from '../shared/components';
import styles from './ProductDetailsPage.module.scss';
import { Description, Product, ProductDetails } from '../../types';
import { getData } from '../../utils/api';
import { useAsync } from '../../hooks/useAsync';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const { data, isLoading } = useAsync(
    () => getData<Product[]>('products'),
    [],
  );
  const products = data ?? [];
  const currentProduct = products.find(p => p.itemId === productId);

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { favoritesItems, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const isInCart = cartItems.some(
    item => item.product.id === currentProduct?.id,
  );
  const isInFavorites = favoritesItems.some(
    item => item.id === currentProduct?.id,
  );

  const { data: detailData } = useAsync(
    () => getData<ProductDetails[]>(`${currentProduct?.category}`),
    [currentProduct?.category],
  );

  const productDetail = detailData?.find(p => p.id === productId);

  const filterSimilar = (p: Product) =>
    p.category === currentProduct?.category && p.id !== currentProduct?.id;

  const similarProducts: Product[] = products
    .filter(filterSimilar)
    .slice(0, 10);

  const navigate = useNavigate();

  const handleChange = (color: string, capacity: string) => {
    setActiveImage(null);
    const newItemId = `${productDetail?.namespaceId}-${capacity.toLowerCase()}-${color.replace(' ', '-')}`;

    navigate(`/product/${newItemId}`);
  };

  return (
    <article className={styles.product_details_page}>
      <div className={styles.breadcrumb}>
        <Link to="/">
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Home.svg"
            alt="home"
          />
        </Link>
        <img
          className={styles.breadcrumb_icon}
          src="/img/icons/Chevron_(Arrow_Right).svg"
          alt=" to"
        />
        <Link
          className={styles.breadcrumb_category}
          to={`/${currentProduct?.category}`}
        >
          {currentProduct?.category}
        </Link>
        <img
          className={styles.breadcrumb_icon}
          src="/img/icons/Chevron_(Arrow_Right).svg"
          alt=" to"
        />
        <p className={styles.breadcrumb_title}>{currentProduct?.name}</p>
      </div>
      <Link to="/" className={styles.back}>
        <img
          className={styles.back_icon}
          src="/img/icons/Chevron_(Arrow_Left).svg"
          alt="back"
        />
        <p className={styles.back_page}>Back</p>
      </Link>

      <main className={styles.main}>
        <h1 className={styles.productname}>{productDetail?.name}</h1>
        <section className={styles.mainInfo}>
          <div className={styles.images}>
            <div className={styles.mainImage}>
              <img
                src={activeImage || productDetail?.images[0]}
                alt={productDetail?.name}
              />
            </div>

            <div className={styles.thumbnails}>
              {productDetail?.images.map((img, index) => (
                <img
                  key={index}
                  className={`${styles.thumbnail} ${(activeImage || productDetail?.images[0]) === img ? styles.active : ''}`}
                  src={img}
                  alt={`${productDetail?.name} ${index}`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          </div>
          <div className={styles.description}>
            <div className={styles.colors}>
              <div className={styles.colors_header}>
                <p className={styles.colors_title}>Available colors</p>
                <p className={styles.colors_id}>ID: {currentProduct?.id}</p>
              </div>
              <div className={styles.colors_list}>
                {productDetail?.colorsAvailable.map(color => (
                  <div
                    key={color}
                    className={`${styles.color} ${productDetail?.color === color ? styles.active : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      handleChange(color, productDetail?.capacity || '')
                    }
                  />
                ))}
              </div>
            </div>
            <div className={styles.capacity}>
              <p className={styles.capacity_title}>Select capacity</p>
              <div className={styles.capacity_list}>
                {productDetail?.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    className={`${styles.capacity_item} ${productDetail.capacity === cap ? styles.active : ''}`}
                    onClick={() =>
                      handleChange(productDetail?.color || '', cap)
                    }
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.prices}>
              <p>${productDetail?.priceDiscount}</p>
              <div className={styles.fullPrice}>
                <p>${productDetail?.priceRegular}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              {isInCart ? (
                <button
                  className={styles.addedToCart}
                  onClick={() =>
                    currentProduct && removeFromCart(currentProduct.id)
                  }
                >
                  Added
                </button>
              ) : (
                <button
                  className={styles.addToCart}
                  onClick={() => currentProduct && addToCart(currentProduct)}
                >
                  Add to cart
                </button>
              )}
              {isInFavorites ? (
                <button
                  className={styles.addedToFav}
                  onClick={() =>
                    currentProduct && removeFromFavorites(currentProduct.id)
                  }
                >
                  <img
                    src="/img/icons/Favourites_Filled_(Heart_Like).svg"
                    alt="add to favorites"
                  />
                </button>
              ) : (
                <button
                  className={styles.addToFav}
                  onClick={() =>
                    currentProduct && addToFavorites(currentProduct)
                  }
                >
                  <img src="/img/icons/Favorites.svg" alt="add to favorites" />
                </button>
              )}
            </div>
            <div className={styles.another_info}>
              <div className={styles.info}>
                <p>Screen</p>
                <p>{productDetail?.screen}</p>
              </div>
              <div className={styles.info}>
                <p>Resolution</p>
                <p>{productDetail?.resolution}</p>
              </div>
              <div className={styles.info}>
                <p>Processor</p>
                <p>{productDetail?.processor}</p>
              </div>
              <div className={styles.info}>
                <p>RAM</p>
                <p>{productDetail?.ram}</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.subInfo}>
          <div className={styles.descriptions}>
            <h2 className={styles.title}>About</h2>
            {productDetail?.description.map((desc: Description, index) => (
              <div className={styles.description} key={index}>
                <h4 key={index} className={styles.description_title}>
                  {desc.title}
                </h4>
                <p className={styles.description_text}>{desc.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.specs}>
            <h2 className={styles.title}>Tech specs</h2>
            <div className={styles.specs_info}>
              <div className={styles.info}>
                <p>Screen</p>
                <p>{productDetail?.screen}</p>
              </div>
              <div className={styles.info}>
                <p>Resolution</p>
                <p>{productDetail?.resolution}</p>
              </div>
              <div className={styles.info}>
                <p>Processor</p>
                <p>{productDetail?.processor}</p>
              </div>
              <div className={styles.info}>
                <p>RAM</p>
                <p>{productDetail?.ram}</p>
              </div>
              <div className={styles.info}>
                <p>Built in memory</p>
                <p>{productDetail?.capacity}</p>
              </div>
              <div className={styles.info}>
                <p>Camera</p>
                <p>{productDetail?.camera}</p>
              </div>
              <div className={styles.info}>
                <p>Zoom</p>
                <p>{productDetail?.zoom}</p>
              </div>
              <div className={styles.info}>
                <p>Cell</p>
                <p>{productDetail?.cell.join(', ')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className={styles.slider}>
        <ProductsSlider
          title="You may also like"
          count={4}
          products={similarProducts}
          isLoading={isLoading}
        />
      </div>
    </article>
  );
};
