import styles from './ProductCard.module.scss';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { IconButton } from 'components/IconButton';
import { TextButton } from 'components/TextButton';
import { ProductInfoDisplay } from 'components/ProductInfoDisplay';
import { addFavorite, isFavorite, removeFavorite } from 'utils/appLocalStorage';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from 'store/ProductsContext';
import { Product } from 'types/Product';
import { resolveImagePath } from 'utils/appImagePath';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const {
    products,
    setFavouriteAmount,
    setCartProducts,
    cartProducts,
    setCartItemsAmount,
  } = useContext(ProductsContext);

  const [isFavoriteChecked, setIsFavoriteChecked] = useState(false);

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/${product.category}/${product.itemId}`, { replace: true });
  };

  const handleProductCart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const productFound = cartProducts.find(p => p.itemId === product.itemId);

    if (productFound) {
      const cartUpdated = cartProducts.filter(p => p.itemId !== product.itemId);

      setCartProducts(cartUpdated);
      setCartItemsAmount(prev => prev - 1);
    } else {
      if (!products) {
        return;
      }

      const toAdd = products.find(item => item.itemId === product.itemId);

      if (toAdd) {
        setCartProducts([...cartProducts, { ...toAdd, amount: 1 }]);
        setCartItemsAmount(prev => prev + 1);
      }
    }
  };

  const handleFavouritesOnClickButton = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    const idString = product.id.toString();

    if (isFavorite(idString)) {
      removeFavorite(idString);
      setFavouriteAmount(prev => prev - 1);
    } else {
      addFavorite(idString);
      setFavouriteAmount(prev => prev + 1);
    }

    setIsFavoriteChecked(prev => !prev);
  };

  const isItemOnCart = cartProducts.some(p => p.id === product.id);

  useEffect(() => {
    setIsFavoriteChecked(isFavorite(product.id.toString()));
  }, [product.id]);

  return (
    <div className={styles.container} onClick={handleOnClick}>
      <div className={styles.container__content}>
        {product.image && (
          <img src={resolveImagePath(product.image)} alt="Product photo" />
        )}
        <span className={styles.container__content__name}>{product.name}</span>
        <div className={styles.container__content__price}>
          <span className={styles.container__content__price__item}>
            {`$${product.price}`}
          </span>
          {product.fullPrice && (
            <span className={styles['container__content__price__item--full']}>
              {`$${product.fullPrice}`}
            </span>
          )}
        </div>
        <hr className={styles.container__content__separator} />
        <ProductInfoDisplay product={product} />
      </div>
      <div className={styles.container__buttons}>
        <TextButton
          title={isItemOnCart ? 'Added' : 'Add to cart'}
          isActive={isItemOnCart}
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
          useBorder
          height="40px"
          width="40px"
          onClick={handleFavouritesOnClickButton}
        />
      </div>
    </div>
  );
};
