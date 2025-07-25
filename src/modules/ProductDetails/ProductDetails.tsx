import styles from './ProductDetails.module.scss';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Accessory, Phone, Tablet } from '../../types/ProductDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import classNames from 'classnames';

type Category = 'phones' | 'tablets' | 'accessories';

type DetailedProduct = Phone | Tablet | Accessory;

export const ProductDetails = () => {
  const {
    favorites,
    setFavorites,
    cart,
    setCart,
    products,
    phones,
    tablets,
    accessories,
  } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState<string>('');

  let selectedProduct: DetailedProduct | null = null;
  const product = products.find(p => p.itemId === id);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct, product]);

  if (product) {
    switch (product.category as Category) {
      case 'phones':
        selectedProduct = phones.find(phone => phone.id === id) || null;
        break;
      case 'tablets':
        selectedProduct = tablets.find(tablet => tablet.id === id) || null;
        break;
      case 'accessories':
        selectedProduct =
          accessories.find(accessory => accessory.id === id) || null;
        break;
      default:
        return null;
    }
  }

  if (!product || !selectedProduct) {
    return <h1 className={styles.notFound}>Product was not found</h1>;
  }

  // --- FAVORITES LOGIC ---
  const isInFavorites = () => {
    return favorites.some(fav => fav.id === product.id);
  };

  const toggleFavoritesItem = () => {
    const newFavorites = isInFavorites()
      ? favorites.filter(fav => fav.id !== product.id)
      : [...favorites, product];

    setFavorites(newFavorites);
  };

  // --- CART LOGIC ---
  const isInCart = () => {
    return cart.some(item => item.id === product.id);
  };

  const toggleCartItem = () => {
    if (isInCart()) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const {
    name,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    ram,
    processor,
    resolution,
    images,
    capacityAvailable,
    camera,
    zoom,
    cell,
    description,
  } = selectedProduct;

  const selectedCategoryArr =
    selectedProduct.category === 'phones'
      ? phones
      : selectedProduct.category === 'tablets'
        ? tablets
        : accessories;

  const handleChangeCapacity = (selectedCapacity: string) => {
    const variant = selectedCategoryArr.find(
      p =>
        p.capacity === selectedCapacity &&
        p.color === selectedProduct.color &&
        p.namespaceId === selectedProduct.namespaceId,
    );

    if (variant) {
      navigate(`/${variant.category}/${variant.id}`);
    }
  };

  const handleChangeColor = (selectedColor: string) => {
    const variant = selectedCategoryArr.find(
      p =>
        p.capacity === selectedProduct.capacity &&
        p.color === selectedColor &&
        p.namespaceId === selectedProduct.namespaceId,
    );

    if (variant) {
      navigate(`/${variant.category}/${variant.id}`);
    }
  };

  const getVisualColor = (visualColor: string) => {
    switch (visualColor) {
      case 'midnight':
        return '#4C4C4C';
      case 'rosegold':
        return 'rosybrown';
      case 'spacegray':
        return '#3b3e4a';
      default:
        return visualColor;
    }
  };

  return (
    <div className={styles.productDetailsPage}>
      <div className="container">
        <Breadcrumbs
          items={[
            {
              label:
                selectedProduct.category.slice(0, 1).toUpperCase() +
                selectedProduct.category.slice(1),
              path: `/${selectedProduct.category}`,
            },
            { label: name },
          ]}
        />

        <section className={styles.productDetails}>
          {/* Назва продукту */}
          <h2 className={`section-title ${styles.productDetails__title}`}>
            {name}
          </h2>

          {/* Головний контент */}
          <div className={styles.productDetails__content}>
            {/* Зображення */}
            <div className={styles.productDetails__gallery}>
              <div className={styles.productDetails__mainImage}>
                <img src={`/${mainImage}`} alt="main" />
              </div>
              <div className={styles.productDetails__galleryList}>
                {/* Превʼю */}
                {images.map((image: string) => (
                  <img
                    key={image}
                    src={`/${image}`}
                    alt="thumb"
                    className={`${styles.productDetails__thumbnail} ${styles.productDetails__thumbnail_selected}`}
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            </div>

            {/* Інфо панель */}
            <div className={styles.productDetails__info}>
              <div className={styles.options}>
                {/* Колір */}
                <div className={styles.colors}>
                  <span>Available colors</span>
                  {/* <span className={styles.id}>ID: 802390</span> */}
                  <div className={styles.colorDots}>
                    {/* кола з кольорами */}
                    {selectedProduct.colorsAvailable.map((color: string) => (
                      <div
                        key={color}
                        className={classNames(styles.colorDots__wrapper, {
                          [styles.active]: color === selectedProduct.color,
                        })}
                        onClick={() => handleChangeColor(color)}
                      >
                        <div
                          className={styles.colorDots__dot}
                          style={{ backgroundColor: getVisualColor(color) }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Памʼять */}
                <div className={styles.capacity}>
                  <span>Select capacity</span>
                  <div className={styles.capacityOptions}>
                    {capacityAvailable.map((item: string) => (
                      <button
                        key={item}
                        onClick={() => handleChangeCapacity(item)}
                        className={item === capacity ? styles.active : ''}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ціна + кнопки */}
              <div className={styles.purchase}>
                <div className={styles.priceBlock}>
                  <span className={styles.price}>${priceDiscount}</span>
                  <span className={styles.oldPrice}>${priceRegular}</span>
                </div>
                <div className={styles.productCard__buttons}>
                  <button
                    className={classNames(
                      styles.productCard__addToCart,
                      isInCart() && styles.productCard__addToCart_active,
                    )}
                    onClick={() => toggleCartItem()}
                  >
                    {isInCart() ? 'Added' : 'Add to cart'}
                  </button>
                  <button
                    className={classNames(
                      styles.productCard__addToFavorites,
                      isInFavorites() &&
                        styles.productCard__addToFavorites_active,
                    )}
                    onClick={() => toggleFavoritesItem()}
                  ></button>
                </div>
              </div>

              {/* Короткі характеристики */}
              <ul className={styles.shortSpecs}>
                <li>
                  <span>Screen</span>
                  <span>{screen}</span>
                </li>
                <li>
                  <span>Resolution</span>
                  <span>{resolution}</span>
                </li>
                <li>
                  <span>Processor</span>
                  <span>{processor}</span>
                </li>
                <li>
                  <span>RAM</span>
                  <span>{ram}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Опис */}
          <div className={styles.description}>
            <div className={styles.about}>
              <h2>About</h2>
              {description.map((item: { title: string; text: string[] }) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  {item.text.map((text: string) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.techSpecs}>
              <h2>Tech specs</h2>
              <ul>
                <li>
                  <span>Screen</span>
                  <span>{screen}</span>
                </li>
                <li>
                  <span>Resolution</span>
                  <span>{resolution}</span>
                </li>
                <li>
                  <span>Processor</span>
                  <span>{processor}</span>
                </li>
                <li>
                  <span>RAM</span>
                  <span>{ram}</span>
                </li>
                <li>
                  <span>Built in memory</span>
                  <span>{capacity}</span>
                </li>
                <li>
                  <span>Camera</span>
                  <span>{camera}</span>
                </li>
                <li>
                  <span>Zoom</span>
                  <span>{zoom}</span>
                </li>
                <li>
                  <span>Cell</span>
                  {cell.map((item: string) => (
                    <span key={item}>{item},</span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
