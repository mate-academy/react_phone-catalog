import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { asset } from '../../utils/paths';
import { usePhones } from '../../hooks/usePhones';
import { useAccessories } from '../../hooks/useAccessories';
import { useTablets } from '../../hooks/useTablets';
import styles from './ProductDetails.module.scss';
import { Breadcrumbs } from '../CatalogPage/Breadcrumbs/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { ProductColors } from './ProductOptions/ProductColors';
import { ProductCapacities } from './ProductOptions/ProductCapacities';
import { CardButton } from '../../components/ProductCard/CardButton/CardButton';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { useProducts } from '../../hooks/useProducts';
import { mapProductToCard } from '../../utils/mapProductToCard';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { Loader } from '../../components/Loader/Loader';

export const ProductDetailsPage = () => {
  const { category, productId } = useParams();

  const { phones } = usePhones();
  const { accessories } = useAccessories();
  const { tablets } = useTablets();

  const product = useMemo(() => {
    switch (category) {
      case 'phones':
        return phones.find(p => p.id === productId);

      case 'tablets':
        return tablets.find(p => p.id === productId);

      case 'accessories':
        return accessories.find(p => p.id === productId);

      default:
        return undefined;
    }
  }, [category, productId, phones, tablets, accessories]);

  const [activeImage, setActiveImage] = useState(0);

  // const [isFavorite, setIsFavorite] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  // const [isInCart, setIsInCart] = useState(false);
  // const { toggleCart, isInCart } = useCart();
  const { addToCart, removeFromCart, isInCart } = useCart();

  const { products } = useProducts();
  const recommendedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter(p => p.id !== product.id)
      .sort((a, b) => {
        const aScore =
          Number(a.namespaceId === product.namespaceId) +
          Number(a.category === category);

        const bScore =
          Number(b.namespaceId === product.namespaceId) +
          Number(b.category === category);

        return bScore - aScore;
      })
      .slice(0, 10)
      .map(mapProductToCard);
  }, [products, product, category]);

  const navigate = useNavigate();

  const currentProducts =
    category === 'phones'
      ? phones
      : category === 'tablets'
        ? tablets
        : accessories;

  const catalogProduct = useMemo(() => {
    if (!product) {
      return null;
    }

    return products.find(p => p.itemId === product.id);
  }, [products, product]);

  const itemId = catalogProduct?.itemId;

  const handleColorChange = (selectedColor: string) => {
    if (!product) {
      return;
    }

    const newProduct = currentProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === selectedColor &&
        p.capacity === product.capacity,
    );

    if (newProduct) {
      navigate(`/${category}/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (selectedCapacity: string) => {
    if (!product) {
      return;
    }

    const newProduct = currentProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === product.color &&
        p.capacity === selectedCapacity,
    );

    if (newProduct) {
      navigate(`/${category}/${newProduct.id}`);
    }
  };

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader || !product) {
    return <Loader />;
  }

  return (
    <div className={styles.details}>
      <Breadcrumbs />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.topContent}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((img, index) => (
              <button
                key={img}
                onClick={() => setActiveImage(index)}
                className={index === activeImage ? styles.active : ''}
              >
                {/* <img src={asset(img)} alt={product.name} /> */}
                <img src={img} alt={product.name} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            {/* <img src={asset(product.images[activeImage])} alt={product.name} /> */}
            <img src={product.images[activeImage]} alt={product.name} />
          </div>
        </div>

        <div className={styles.info}>
          {/* <p className={styles.label}>ID: {catalogProduct?.id}</p> */}
          <ProductColors
            colors={product.colorsAvailable}
            selectedColor={product.color}
            onColorSelect={handleColorChange}
            productId={catalogProduct?.id}
          />

          <ProductCapacities
            capacities={product.capacityAvailable}
            selectedCapacity={product.capacity}
            onCapacitySelect={handleCapacityChange}
          />

          <div className={styles.price}>
            <span className={styles.discount}>${product.priceDiscount}</span>

            <span className={styles.regular}>${product.priceRegular}</span>
          </div>

          <CardButton
            isFavorite={itemId ? isFavorite(itemId) : false}
            isInCart={itemId ? isInCart(itemId) : false}
            onToggleFavorite={() => {
              if (itemId) {
                toggleFavorite(itemId);
              }
            }}
            onToggleCart={() => {
              if (!itemId) {
                return;
              }

              if (isInCart(itemId)) {
                removeFromCart(itemId);
              } else {
                addToCart(itemId);
              }
            }}
          />

          <ul className={styles.shortSpecs}>
            <li className={styles.shortSpec}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>

            <li className={styles.shortSpec}>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </li>

            <li className={styles.shortSpec}>
              <span>Capacity</span>
              <span>{product.capacity}</span>
            </li>

            <li className={styles.shortSpec}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <div className={styles.about}>
          <h2>About</h2>

          {product.description.map(section => (
            <article key={section.title}>
              <h3 className={styles.subtitle}>{section.title}</h3>

              {section.text.map(text => (
                <p key={text} className={styles.text}>
                  {text}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2>Tech specs</h2>

          <ul className={styles.techSpecs__list}>
            <li className={styles.techSpec}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>

            {'resolution' in product && (
              <li className={styles.techSpec}>
                <span>Resolution</span>
                <span>{product.resolution}</span>
              </li>
            )}

            {'processor' in product && (
              <li className={styles.techSpec}>
                <span>Processor</span>
                <span>{product.processor}</span>
              </li>
            )}

            <li className={styles.techSpec}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>

            {'camera' in product && (
              <li className={styles.techSpec}>
                <span>Camera</span>
                <span>{product.camera}</span>
              </li>
            )}

            {'zoom' in product && (
              <li className={styles.techSpec}>
                <span>Zoom</span>
                <span>{product.zoom}</span>
              </li>
            )}

            {'cell' in product && (
              <li className={styles.techSpec}>
                <span>Cell</span>
                <span>{product.cell.join(', ')}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <ProductSlider
        name="You may also like"
        items={recommendedProducts}
        showDiscount={true}
      />
    </div>
  );
};
