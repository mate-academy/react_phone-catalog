import styles from './CustomSelectorsArea.module.scss';
import { FiHeart } from 'react-icons/fi';
import { IconButton } from 'components/IconButton';
import { TextButton } from 'components/TextButton';
import { CapacitySelector } from '../CapacitySelector';
import { ColorSelector } from '../ColorSelector';
import { useContext, useState } from 'react';
import { ProductDetailsContext } from 'store/ProductDetailsContext';
import { ProductDetailsInfoDisplay } from '../ProductDetailsInfoDisplay';
import { addFavorite, isFavorite, removeFavorite } from 'utils/appLocalStorage';
import { FaHeart } from 'react-icons/fa';
import { ProductsContext } from 'store/ProductsContext';
import useCheckMediaQuery from 'hooks/useCheckMediaQuery';
import useIdParams from 'hooks/useIdParams';

export const CustomSelectorsArea = () => {
  const { id } = useIdParams();
  const { isTablet } = useCheckMediaQuery();
  const { product } = useContext(ProductDetailsContext);

  const {
    products,
    setFavouriteAmount,
    cartProducts,
    setCartProducts,
    setCartItemsAmount,
  } = useContext(ProductsContext);

  const [isFavoriteChecked, setIsFavoriteChecked] = useState(
    id ? isFavorite(id!) : false,
  );

  if (!product && !id) {
    return;
  }

  const handleFavouritesOnClickButton = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (!id) {
      return;
    }

    if (isFavoriteChecked) {
      removeFavorite(id);
      setFavouriteAmount(prev => prev - 1);
    } else {
      addFavorite(id);
      setFavouriteAmount(prev => prev + 1);
    }

    setIsFavoriteChecked(prev => !prev);
  };

  const handleProductCart = () => {
    if (!product && !products) {
      return;
    }

    const productId = product!.id;
    const found = cartProducts.find(p => p.itemId === productId);

    if (found) {
      const updatedCart = cartProducts.filter(p => p.itemId !== productId);

      setCartProducts(updatedCart);
      setCartItemsAmount(prev => prev - 1);
    } else {
      const toAdd = products!.find(item => item.itemId === productId);

      if (toAdd) {
        const productWithQuantity = { ...toAdd, amount: 1 };

        setCartProducts([...cartProducts, productWithQuantity]);
        setCartItemsAmount(prev => prev + 1);
      }
    }
  };

  const isItemOnCart = () => {
    return !!cartProducts.find(p => p.itemId === product?.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <ColorSelector />
        <hr />
        <CapacitySelector />
        <hr />
        <div className={styles.container__content__prices}>
          <span className={styles.container__content__prices__current}>
            {`$${product?.priceDiscount}`}
          </span>
          <span className={styles.container__content__prices__full}>
            {`$${product?.priceRegular}`}
          </span>
        </div>
        <div className={styles.container__content__buttons}>
          <TextButton
            title={isItemOnCart() ? 'Added' : 'Add to cart'}
            isActive={isItemOnCart()}
            height={'48px'}
            onClick={handleProductCart}
          />
          <IconButton
            icon={
              isFavoriteChecked ? (
                <FaHeart size={24} color="#EB5757" />
              ) : (
                <FiHeart size={24} />
              )
            }
            useBorder={true}
            height={'48px'}
            width={'48px'}
            onClick={handleFavouritesOnClickButton}
          />
        </div>
        <ProductDetailsInfoDisplay />
      </div>
      {!isTablet && <span className={styles.container__id}>{`ID: ${id}`}</span>}
    </div>
  );
};
