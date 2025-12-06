import { AccessoriesModel, PhoneModel, TabletModel } from '../../types/model';
import favoritesNonActive from '../../Icons/Favourites(HeartLike).svg';

import styles from './ModelCard.module.scss';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/products';
import { useContext, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line max-len
import { FavoritesContext } from '../../contexts/FavoritesContext/FavoritesContext';
import { getProducts } from '../../api';
import favoritesActive from '../../Icons/FavouritesFilled(HeartLike).svg';
import { CartContext } from '../../contexts/CartContext';
import { convertToCartItem } from '../../utils/convertToCartItem';
import { PrimaryButton } from '../PrimaryButton';
interface ModelCardProps {
  model: PhoneModel | AccessoriesModel | Product;
  hotPrice: boolean;
  kindOfModel: string;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  hotPrice,
  kindOfModel,
}) => {
  const id =
    (model as Product).itemId ||
    (model as PhoneModel | AccessoriesModel | TabletModel).id;

  const [toLinkCategory, setToLinkCategory] = useState<string>(kindOfModel);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productData = getProducts();

    productData.then(product => {
      setProducts(product);
    });
  }, []);

  const product = products.find(p => p.itemId === id);
  const isFavorite = useMemo(() => {
    return favorites.some(fav => fav.itemId === product?.itemId);
  }, [favorites, product?.itemId]);

  const handleToggleFavorite = () => {
    if (product) {
      if (isFavorite) {
        const newFavorites = favorites.filter(
          fav => fav.itemId !== product.itemId,
        );

        setFavorites(newFavorites);
      } else {
        const newFavorites = [...favorites, product];

        setFavorites(newFavorites);
      }
    }
  };

  const isInCart = useMemo(() => {
    return cartProducts.some(cart => cart.itemId === product?.itemId);
  }, [cartProducts, product?.itemId]);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = convertToCartItem(product);
      const newCartProducts = [...cartProducts, cartProduct];

      setCartProducts(newCartProducts);
    }
  };

  useEffect(() => {
    if (kindOfModel === 'products') {
      setToLinkCategory((model as Product).category);
    } else {
      setToLinkCategory(kindOfModel);
    }
  }, [model, kindOfModel]);

  const image = (model as PhoneModel).images?.[0] || (model as Product).image;

  const priceRegular =
    (model as PhoneModel).priceRegular || (model as Product).fullPrice;

  const priceDiscount =
    (model as PhoneModel).priceDiscount || (model as Product).price;

  const screen = (model as PhoneModel | Product).screen;
  const ram = (model as PhoneModel | Product).ram;
  const name = (model as PhoneModel | Product).name;

  const modelCapacity = (model as PhoneModel | Product).capacity;
  const namespaceId =
    (model as PhoneModel).namespaceId || (model as Product).name;
  const location = useLocation();

  return (
    <div className={styles.card__item}>
      <Link
        className={styles.card__link}
        to={`/${toLinkCategory}/${id}`}
        state={{ from: location.pathname }}
      >
        <img className={styles.model__img} src={image} alt={namespaceId} />
        <h4 className={styles.card__item__title}>{name}</h4>
      </Link>
      <span className={styles.card__item__price}>
        {hotPrice && (
          <span className={styles.card__item__hotPrice}>${priceDiscount} </span>
        )}
        <span
          className={cn({
            [styles['cross__regular-price']]: hotPrice,
          })}
        >
          ${priceRegular}
        </span>
      </span>
      <div className={styles.card__line}></div>
      <ul className={styles['characteristics__list-short']}>
        <li className={styles['characteristics__item-short']}>
          <span className={styles['characteristic-key']}>Screen</span>
          <span className={styles['characteristic-value']}>{screen}</span>
        </li>
        <li className={styles['characteristics__item-short']}>
          <span className={styles['characteristic-key']}>Capacity</span>
          <span className={styles['characteristic-value']}>
            {modelCapacity}
          </span>
        </li>
        <li className={styles['characteristics__item-short']}>
          <span className={styles['characteristic-key']}>RAM</span>
          <span className={styles['characteristic-value']}>{ram}</span>
        </li>
      </ul>
      <div className={styles.card__buttons}>
        <PrimaryButton
          isSelected={isInCart}
          action={handleAddToCart}
          text="Add to cart"
          height="40"
        ></PrimaryButton>
        <button
          className={`${styles['add--to__fovourites']} ${styles['model-button']}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <img
              src={favoritesActive}
              alt="favoritesActive"
              className={styles.favorite__img}
            />
          ) : (
            <img
              src={favoritesNonActive}
              alt="favoritesNonActive"
              className={styles.favorite__img}
            />
          )}
        </button>
      </div>
    </div>
  );
};
