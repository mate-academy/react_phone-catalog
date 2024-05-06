import styles from './productcard.module.scss';
// import heardBuron from './productCard-logo/Favourites.png';
// import heardBuronActive from './productCard-logo/favoriteActive.png';
import { Product } from '../../services/productType';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../services/enums';
import React from 'react';
// import { useLocalStorage } from '../../local/localStorege';
import { ButtonsAddandFavorits } from './ButtonAdd';

type Props = {
  item: Product;
  type: ProductType;
};

export const ProductCard: React.FC<Props> = ({ item, type }) => {
  // const [favorites] = useLocalStorage<Product[]>('favorites', []);
  // const [cart] = useLocalStorage<Product[]>('cart', []);
  // const [isFavorite, setIsFavorite] = useState(false);
  // const [isCart, setIsCart] = useState(false);

  // useEffect(() => {
  //   const isItemInFavorites = favorites.some(favItem => favItem.id === item.id);

  //   setIsFavorite(isItemInFavorites);
  // }, [favorites, item]);

  // useEffect(() => {
  //   const isItemInCart = cart.some(carItem => carItem.id === item.id);

  //   setIsCart(isItemInCart);
  // }, [cart, item]);

  let productPath = '';

  switch (type) {
    case ProductType.phones:
      productPath = '/phones/details';
      break;
    case ProductType.tablets:
      productPath = '/tablets/details';
      break;
    case ProductType.accessories:
      productPath = '/accessories/details';
      break;
    default:
      productPath = '/';
  }

  // const handlerAddFavorites = () => {
  //   if (isFavorite) {
  //     const updatedFavorites = favorites.filter(
  //       favItem => favItem.id !== item.id,
  //     );

  //     setFavorites(updatedFavorites);
  //   } else {
  //     const updatedFavorites = [item, ...favorites];

  //     setFavorites(updatedFavorites);
  //   }
  // };

  // const handlerAddProduct = () => {
  //   if (isCart) {
  //     const updatedCart = cart.filter(carItem => carItem.id !== item.id);

  //     setCart(updatedCart);
  //   } else {
  //     const updatedCart = [item, ...cart];

  //     setCart(updatedCart);
  //   }
  // };

  return (
    <>
      <section className={styles.cardProductSection}>
        <NavLink to={{ pathname: productPath, search: `?id=${item.itemId}` }}>
          <img
            className={styles.productImages}
            src={item.image}
            alt="Product"
          />
        </NavLink>
        <h3 className={styles.productTitles}>{item.name}</h3>
        <div className={styles.productPrices}>
          <span className={styles.priceNow}>{`$${item.fullPrice}`}</span>
          <span className={styles.priceOld}>{`$${item.price}`}</span>
        </div>
        <span className={styles.line}></span>
        <div className={styles.techSpecs}>
          <div className={styles.techSpectName}>
            <span className={styles.screen}>Screen</span>
            <span className={styles.capacity}>Capacity</span>
            <span className={styles.ram}>RAM</span>
          </div>
          <div className={styles.techSpecsSpecs}>
            <span className={styles.screenSpecs}>{item.screen}</span>
            <span className={styles.capacitySpecs}>{item.capacity}</span>
            <span className={styles.ramSpecs}>{item.ram}</span>
          </div>
        </div>
        <ButtonsAddandFavorits item={item} />
      </section>
    </>
  );
};
