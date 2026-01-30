import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { ProductsCards } from '../../components/ProductsCards/ProductsCards';
import likeImg from './../../img/icons/like.svg';
import likeFilled from './../../img/icons/Favourites Filled (Heart Like).svg';
import { COLOR_MAP } from '../../utils/colorMap';
import homeImg from './../../img/icons/Home.svg';
import arrowRightDisabled from './../../img/icons/Chevron Arrow Right dis.svg';
import { FavoriteProduct, useFavorites } from '../../FavoriteContext';
import { useCart } from '../../CartContext';
import phonesData from '../../../public/api/phones.json';
import tabletsData from '../../../public/api/tablets.json';
import accessoriesData from '../../../public/api/accessories.json';

type Phone = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  year?: number;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const allProducts = [
  ...phonesData,
  ...tabletsData,
  ...accessoriesData,
] as Phone[];

export const ProductPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();

  const product = allProducts.find(item => item.id === itemId);

  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [selectCapacity, setSelectCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { addToCart, items } = useCart();

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectCapacity(product.capacity);
    setSelectedColor(product.color);
    setActiveImg(product.images[0]);
  }, [product, itemId]);

  if (!product) {
    return <h1>Page not found</h1>;
  }

  const isInCart = items.some(item => item.id === product.id);

  const capacityValue: string = product.capacity ?? '';
  const ramValue: string = product.ram ?? '';
  const screenValue: string = product.screen ?? '';
  const yearValue: number = product.year ?? 0;
  const imageValue: string = product.images[0] ?? '';

  const favoriteItem: FavoriteProduct = {
    id: `${product.id}-discount`,
    itemId: product.id,
    category: product.category,
    name: product.name,
    price: product.priceDiscount,
    fullPrice: product.priceRegular,
    screen: screenValue,
    capacity: capacityValue,
    ram: ramValue,
    year: yearValue,
    image: imageValue,
  };

  const isFavorite = favorites.some(f => f.itemId === product.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(favoriteItem.id);
    } else {
      addFavorite(favoriteItem);
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.priceDiscount,
      image: product.images[0] ?? '',
      quantity: 1,
    };

    addToCart(cartItem);
  };

  const handleCapacityChange = (cap: string) => {
    setSelectCapacity(cap);
    const foundProduct = allProducts.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === cap &&
        item.color === selectedColor,
    );

    if (foundProduct) {
      navigate(`/product/${foundProduct.id}`);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const foundProduct = allProducts.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === selectCapacity &&
        item.color === color,
    );

    if (foundProduct) {
      navigate(`/product/${foundProduct.id}`);
    }
  };

  const currentImage = activeImg ?? product.images[0];

  const getCategoryPath = () => {
    switch (product.category) {
      case 'phones':
        return '/phones';
      case 'tablets':
        return '/tablets';
      case 'accessories':
        return '/accessories';
      default:
        return '/';
    }
  };

  const getCategoryName = () => {
    switch (product.category) {
      case 'phones':
        return 'Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return '';
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.titleWrapper}>
          <Link to="/">
            <img src={homeImg} alt="home img" />
          </Link>
          <img
            src={arrowRightDisabled}
            alt="arrow"
            className={styles.arrowWrapper}
          />
          <Link to={getCategoryPath()}>
            <span className={styles.pageName}>{getCategoryName()}</span>
          </Link>
          <img
            src={arrowRightDisabled}
            alt="arrow"
            className={styles.arrowWrapper}
          />
          <span className={styles.pageName}>{product.name}</span>
        </div>

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.main}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map(img => (
                <div
                  key={img}
                  className={`${styles.thumbnail} ${img === activeImg ? styles.thumbnailActive : ''}`}
                  onClick={() => setActiveImg(img)}
                >
                  <img
                    src={import.meta.env.BASE_URL + img}
                    alt={product.name}
                  />
                </div>
              ))}
            </div>
            <div className={styles.preview}>
              <img
                src={import.meta.env.BASE_URL + currentImage}
                alt={product.name}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <section className={styles.first}>
              <p className={styles.label}>Available colors</p>
              <div className={styles.colors}>
                {product.colorsAvailable.map(color => (
                  <div
                    key={color}
                    className={`${styles.colorWrapper} ${color === selectedColor ? styles.activeBorder : ''}`}
                    onClick={() => handleColorChange(color)}
                  >
                    <span
                      className={`${styles.color} ${color === selectedColor ? styles.activeColor : ''}`}
                      style={{ backgroundColor: COLOR_MAP[color] }}
                    />
                  </div>
                ))}
              </div>
              <span className={styles.line}></span>
            </section>

            <section className={styles.second}>
              <p className={styles.label}>Select capacity</p>
              <div className={styles.capacity}>
                {product.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    className={`${styles.capBtn} ${cap === selectCapacity ? styles.active : ''}`}
                    onClick={() => handleCapacityChange(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
              <span className={styles.line}></span>
            </section>

            <div className={styles.price}>
              <span className={styles.current}>${product.priceDiscount}</span>
              <span className={styles.old}>${product.priceRegular}</span>
            </div>

            <div className={styles.addBlock}>
              <button
                className={`${styles.add} ${isInCart ? styles.added : ''}`}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={`${styles.likeBtn} ${isFavorite ? styles.likeBtnActive : ''}`}
                onClick={handleToggleFavorite}
              >
                <img src={isFavorite ? likeFilled : likeImg} alt="Like" />
              </button>
            </div>

            <div className={styles.shortSpecs}>
              <div>
                <span>Screen</span>
                <p className={styles.shortSpecsInfo}>{product.screen}</p>
              </div>
              <div>
                <span>Resolution</span>
                <p className={styles.shortSpecsInfo}>{product.resolution}</p>
              </div>
              <div>
                <span>Processor</span>
                <p className={styles.shortSpecsInfo}>{product.processor}</p>
              </div>
              <div>
                <span>RAM</span>
                <p className={styles.shortSpecsInfo}>{product.ram}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className={styles.about}>
          <h2 className={styles.subTitle}>About</h2>
          <span className={styles.line}></span>
          {product.description.map(block => (
            <div key={block.title}>
              <h3>{block.title}</h3>
              {block.text.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          ))}
        </section>

        {/* Tech Specs */}
        <section className={styles.tech}>
          <h2 className={styles.subTitle}>Tech specs</h2>
          <span className={styles.line}></span>
          <div className={styles.specs}>
            <h3>Screen</h3>
            <div>{product.screen}</div>
            <h3>Resolution</h3>
            <div>{product.resolution}</div>
            <h3>Processor</h3>
            <div>{product.processor}</div>
            <h3>RAM</h3>
            <div>{product.ram}</div>
            <h3>Built in memory</h3>
            <div>{selectCapacity}</div>
            <h3>Camera</h3>
            <div>{product.camera}</div>
            <h3>Zoom</h3>
            <div>{product.zoom}</div>
            <h3>Cell</h3>
            <div>{product.cell.join(', ')}</div>
          </div>
        </section>
      </div>
      <ProductsCards
        title="You may also like"
        priceMode="discount"
        filter={p => p.fullPrice !== p.price}
      />
    </div>
  );
};
