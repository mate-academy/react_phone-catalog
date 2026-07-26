/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';

import styles from './ItemCardShortDetail.module.scss';
import { ProductCatalogAPI } from '../../types';

import FavoritesHurt from '/img/FavoritesHurt.png';
import FavoritesHurtActive from '../../UI/Buttons/Icons/FavoritesHurtActive.svg';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';
import { getColor } from '../../hooks/useColorsMap';

const ItemCardShortDetail = ({
  product,
  allProducts,
  setProduct,
}: {
  product: ProductCatalogAPI;
  allProducts: ProductCatalogAPI[];
  setProduct: React.Dispatch<React.SetStateAction<ProductCatalogAPI | null>>;
}) => {
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacity);
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleColorChange = (color: string) => {
    const capacitySlug = selectedCapacity.toLowerCase();

    // Перетворюємо колір у slug: "space gray" -> "space-gray"
    const colorSlug = color.toLowerCase().replace(/\s+/g, '-');

    navigate(
      `/product/${product.category}/${product.namespaceId}-${capacitySlug}-${colorSlug}`,
      {
        replace: true,
      },
    );

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        p.capacity === selectedCapacity,
    );

    if (newProduct) {
      setProduct(newProduct);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);

    // Використовуємо новий capacity
    const capacitySlug = capacity.toLowerCase();

    navigate(
      `/product/${product.category}/${product.namespaceId}-${capacitySlug}-${product.color}`,
    );

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === product.color &&
        p.capacity === capacity,
    );

    if (newProduct) {
      setProduct(newProduct);
    }
  };

  function stringToNumberId(): number {
    let hash = 0;
    const str = product.id;

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash);
  }

  const handleAddToCart = () => {
    if (cart.find(item => item.itemId === product.id)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(
        addToCart({
          itemId: product.id,
          image: product.images[0],
          category: product.category,
          name: product.name,
          price: product.priceRegular,
          quantity: 1,
        }),
      );
    }
  };

  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault();

    if (favorites.some(item => item.itemId === product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(
        addFavorite({
          itemId: product.id,
          category: product.category,
        }),
      );
    }

    e.stopPropagation();
  };

  return (
    <div className={styles.itemCardShortDetail}>
      <div className={styles.itemCardShortDetail__top}>
        <div className={styles.itemCardShortDetail__colorsBlock}>
          <h2 className={styles.itemCardShortDetail__title}>
            Available colors
          </h2>

          <div className={styles.itemCardShortDetail__color}>
            {product.colorsAvailable.map(color => (
              <div
                key={color}
                className={`${styles.itemCardShortDetail__color_available} ${
                  color === product.color
                    ? styles.itemCardShortDetail__color_available_active
                    : ''
                }`}
              >
                <button
                  onClick={() => handleColorChange(color)}
                  className={styles.itemCardShortDetail__color_available_link}
                  style={{ backgroundColor: getColor(color) }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.itemCardShortDetail__idBlock}>
          <span className={styles.itemCardShortDetail__idLabel}>ID:</span>
          <span className={styles.itemCardShortDetail__idValue}>
            {stringToNumberId()}
          </span>
        </div>
      </div>

      <span className={styles.itemCardShortDetail__line}></span>

      <div className={styles.itemCardShortDetail__capasity}>
        <h2 className={styles.itemCardShortDetail__title}>Selected capacity</h2>
        <div className={styles.itemCardShortDetail__capasity_list}>
          {product.capacityAvailable.map(capacity => (
            <li key={capacity}>
              <button
                className={`${styles.itemCardShortDetail__capasity_list_item} ${
                  selectedCapacity === capacity
                    ? styles.itemCardShortDetail__capasity_list_item_active
                    : ''
                }`}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </button>
            </li>
          ))}
        </div>
      </div>

      <span className={styles.itemCardShortDetail__line}></span>

      <div className={styles.itemCardShortDetail__prices}>
        <div className={styles.itemCardShortDetail__prices_list}>
          <p
            className={
              styles.itemCardShortDetail__prices_value +
              ' ' +
              styles.itemCardShortDetail__prices_value_newPrice
            }
          >
            ${product.priceDiscount}
          </p>
          <p
            className={
              styles.itemCardShortDetail__prices_value +
              ' ' +
              styles.itemCardShortDetail__prices_value_oldPrice
            }
          >
            ${product.priceRegular}
          </p>
        </div>

        <div className={styles.itemCardShortDetail__prices_buttons}>
          <button
            className={`
              ${styles.itemCardShortDetail__prices_button}
              ${styles.itemCardShortDetail__prices_button_add}
              ${cart.find(item => item.itemId === product.id) ? styles.itemCardShortDetail__prices_button_add_included : ''}`}
            onClick={() => handleAddToCart()}
          >
            {cart.find(item => item.itemId === product.id)
              ? 'Added to cart'
              : 'Add to cart'}
          </button>

          <button
            className={`
              ${styles.itemCardShortDetail__prices_button}
              ${styles.itemCardShortDetail__prices_button_favorites}
            `}
            onClick={e => {
              handleAddFavorite(e);
            }}
          >
            {favorites.some(item => item.itemId === product.id) ? (
              <img
                className={styles.itemCardShortDetail__prices_button_img}
                src={FavoritesHurtActive}
                alt="Favorites Hurt"
              />
            ) : (
              <img
                className={styles.itemCardShortDetail__prices_button_img}
                src={FavoritesHurt}
                alt="Favorites Hurt"
              />
            )}
          </button>
        </div>
      </div>

      <div className={styles.itemCardShortDetail__specs}>
        {specs.map(spec => (
          <div
            key={spec.label}
            className={styles.itemCardShortDetail__specs_item}
          >
            <p className={styles.itemCardShortDetail__specs_item_title}>
              {spec.label}
            </p>

            <p className={styles.itemCardShortDetail__specs_item_value}>
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCardShortDetail;
