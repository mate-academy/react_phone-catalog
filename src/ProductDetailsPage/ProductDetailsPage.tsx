import styles from './ProductDetailsPage.module.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FullProduct, Products } from '../types/Alltypes';
import { useEffect, useState } from 'react';
import { getData } from '../fetch/httpClient';
import { UseSwiper } from '../Functional/Swiper/Swiper';
import { useCart } from '../context/CartContext';

export const ProductDetailsPage = () => {
  const { slug: productId, category } = useParams<{
    slug: string;
    category: string;
  }>();

  const [products, setProducts] = useState<FullProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedImages, setSelectedImages] = useState('');

  const { cart, favorites, addToCart, removeFromCart, toggleFavorite } =
    useCart();

  useEffect(() => {
    setLoading(true);
    getData<FullProduct[]>(`./api/${category}.json`)
      .then(data => {
        const product = data.find(item => item.id === productId);

        if (product) {
          setProducts(product || null);
          setSelectedImages(product.images[0] || '');
          setSelectedColor(product.color || '');
          setSelectedCapacity(product.capacity || '');
        } else {
          setProducts(null);
        }
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [category, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error} <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!products) {
    return <div>Product not found</div>;
  }

  const {
    id,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    namespaceId,
    capacity,
    processor,
    ram,
    camera,
    cell,
    zoom,
    name,
    images,
    colorsAvailable,
    capacityAvailable,
  } = products;

  const notFullProduct: Products = {
    itemId: id,
    category: products.category,
    name: name,
    fullPrice: priceRegular,
    price: priceDiscount,
    screen: products.screen,
    capacity: products.capacity,
    color: products.color,
    ram: products.ram,
    image: images[0],
  };

  const isProductInCart = cart.some(item => item.product.itemId === id);
  const isProductFavorite = favorites.some(item => item.itemId === id);

  const handleCartClick = () => {
    if (isProductInCart) {
      removeFromCart(notFullProduct);
    } else {
      addToCart(notFullProduct);
    }
  };

  const productColors: Record<string, string> = {
    black: '#1f2020',
    white: '#f5f5f0',
    yellow: '#f4d06f',
    green: '#5f8f72',
    purple: '#b8afe6',
    red: '#c91c1c',
    gold: '#f3d6a3',
    silver: '#e3e5e8',
    spacegray: '#4c4c4c',
    rosegold: '#f6c7b5',
    midnightgreen: '#4e5f58',
    coral: '#ff7f6e',
    midnight: '#171e27',
    starlight: '#f5f1e6',
    blue: '#4f7cae',
    pink: '#f5b8c8',
    graphite: '#4a4a4d',
    sierrablue: '#9bb5ce',
    skyblue: '#b7d7ee',
  };

  const getColorValue = (color: string) => {
    if (!color) {
      return 'transparent';
    }

    const preparedColor = color.toLowerCase().replace(/[\s-]+/g, '_');

    return productColors[preparedColor] || color;
  };

  console.log(colorsAvailable);

  return (
    <div className={styles.containerPhones}>
      <Link to={`/${category}`} className={styles.home}>
        <button className={styles.homeButton}>
          <img src="./img/home.svg" alt="home" className={styles.homeImg} />
          <img
            src="./img/vectorRight.svg"
            alt="right"
            className={styles.homeGo}
          />
          <span className={styles.homeGoTo}>{category}</span>
          <img
            src="./img/vectorRight.svg"
            alt="right"
            className={styles.homeGo}
          />
        </button>
      </Link>
      <Link to={`/${category}`} className={styles.backButton}>
        <button className={styles.backButton}>
          <img src="./img/left.svg" alt="back" className={styles.backImg} />
          <span className={styles.back}>Back</span>
        </button>
      </Link>

      <h2 className={styles.linkName}>
        <strong>
          <Link to={`/${category}/${productId}`} className={styles.linkIdName}>
            {products.name}
          </Link>
        </strong>
      </h2>

      <section className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.imagesAll}>
            {images.map(img => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImages(img)}
                className={`${styles.imagesByOne} ${selectedImages === img ? styles.activeImg : ''}`}
              >
                <img src={`/${img}`} alt="thumbnail" />
              </button>
            ))}
          </div>

          <div className={styles.mainImageBlock}>
            <img
              src={`/${selectedImages}`}
              alt={name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <aside className={styles.blockDetailsRight}>
          <div className={styles.colors}>
            <div className={styles.colorsBlock}>
              {colorsAvailable.map(color => (
                <Link
                  to={`/${category}/${namespaceId}-${capacity.toLowerCase()}-${color.toLowerCase()}`}
                  key={color}
                  className={`${styles.colorsLink} ${selectedColor === color ? styles.activeColorLink : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className={`${styles.colorCircle} ${selectedColor === color ? styles.activeColor : ''}`}
                    style={{ backgroundColor: getColorValue(color) }}
                  />
                </Link>
              ))}
            </div>
          </div>
          <span className={styles.uderLine}></span>

          <div className={styles.capacity}>
            <div className={styles.capacityBlock}>
              {capacityAvailable.map(cap => (
                <Link
                  to={`/${category}/${namespaceId}-${cap.toLowerCase()}-${selectedColor.toLowerCase()}`}
                  key={cap}
                  onClick={() => setSelectedCapacity(cap)}
                  className={`${styles.capacityLink} ${selectedCapacity === cap ? styles.capacityLinkActive : ''}`}
                >
                  <span>{cap}</span>
                </Link>
              ))}
            </div>
          </div>
          <span className={styles.uderLine}></span>
          <div className={styles.cardPriceGoup}>
            <span className={styles.cardPriceHot}>${priceDiscount}</span>
            <span className={styles.cardfullPriceHot}>${priceRegular}</span>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.cardToAdd} ${isProductInCart ? styles.added : ''}`}
              onClick={handleCartClick}
            >
              {isProductInCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              className={`${styles.buttonToFavorites} ${isProductFavorite ? styles.favoriteActive : ''}`}
              onClick={() => toggleFavorite(notFullProduct)}
            >
              <img
                src={
                  isProductFavorite ? '/img/filled.svg' : '/img/favorites.svg'
                }
                className={styles.iconImgFavorites}
                alt="Favourites"
              />
            </button>
          </div>
          <div className={styles.cardSpes}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <strong className={styles.strong}>{screen}</strong>
            </div>
            <div className={styles.specRow}>
              <span>Resolution</span>
              <strong className={styles.strong}>{resolution}</strong>
            </div>
            <div className={styles.specRow}>
              <span>Processor</span>
              <strong className={styles.strong}>{processor}</strong>
            </div>
            <div className={styles.specRow}>
              <span>Ram</span>
              <strong className={styles.strong}>{ram}</strong>
            </div>
          </div>
        </aside>

        <section className={styles.about}>
          <div className={styles.aboutDiv}>
            <h3 className={styles.aboutTitle}>About</h3>
            <div className={styles.uderLine}></div>
            <div className={styles.aboutDescription}>
              {products.description.map((des, index) => (
                <div key={index} className={styles.aboutSection}>
                  <strong className={styles.aboutTitle}>{des.title}</strong>
                  <p className={styles.aboutText}>{des.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.techSpecs}>
          <div className={styles.techSpecsDiv}>
            <h3 className={styles.techSpecsTitle}>Tech specs</h3>
            <div className={styles.uderLine}></div>
          </div>
          <div className={styles.specRow}>
            <span>Screen</span>
            <strong className={styles.strongTech}>{screen}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Resolution</span>
            <strong className={styles.strongTech}>{resolution}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Processor</span>
            <strong className={styles.strongTech}>{processor}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Ram</span>
            <strong className={styles.strongTech}>{ram}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Camera</span>
            <strong className={styles.strongTech}>{camera}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Zoom</span>
            <strong className={styles.strongTech}>{zoom}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Cell</span>
            <strong className={styles.strongTech}>{cell}</strong>
          </div>
        </section>
      </section>

      <div className={styles.containerYouMayAlso}>
        <h2 className={styles.blockYouMayAlso}>You may also like</h2>
        <UseSwiper />
      </div>
    </div>
  );
};
