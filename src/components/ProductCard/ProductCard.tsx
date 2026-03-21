import { Link } from 'react-router-dom';
import { Divider } from '../Divider';
import { Price } from '../Price';
import { AddToCart } from '../Buttons/AddToCart';
import { AddToFavorite } from '../Buttons/AddToFavorite';
import { SpecsList } from '../SpecsList';
import { useFavorite } from '../../hooks/useFavorite';
import { useCart } from '../../hooks/useCart';
import { isItemInCart } from '../../utils/isItemInCart';
import { buildProductPath } from '../../utils/buildProductPath';
import { Product } from '../../types/Product';
import { isItemInFavorite } from '../../utils/isItemInFavorite';
import style from './ProductCard.module.scss';

type Props = {
  product: Product;
  discount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, discount = false }) => {
  const { favoriteProducts, toggleFavorite } = useFavorite();
  const { cartList, addToCart, deleteFromCart } = useCart();
  const {
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
    itemId,
  } = product;

  const isFavorite = isItemInFavorite(favoriteProducts, itemId);
  const isInCart = isItemInCart(cartList, itemId);

  const specs = [
    { label: 'product.screen', value: screen },
    { label: 'product.capacity', value: capacity },
    { label: 'product.ram', value: ram },
  ];

  const handleFavoriteClick = () => toggleFavorite(product);
  const handleAddToCartClick = () =>
    isItemInCart(cartList, itemId)
      ? deleteFromCart(itemId)
      : addToCart(product);

  const productPath = buildProductPath(category, itemId);

  return (
    <article className={style.productCard}>
      <Link to={productPath} className={style.imgContent}>
        <img src={image} alt={name} className={style.productImg} />
      </Link>

      <h3 className={style.productTitle}>
        <Link to={productPath} className={style.productTitleLink}>
          {name}
        </Link>
      </h3>

      <Price price={price} fullPrice={fullPrice} hasDiscount={discount} />

      <Divider />

      <div className={style.productSpecs}>
        <SpecsList specs={specs} fontSize={12} />
      </div>

      <div className={style.productCardButtons}>
        <AddToCart isInCart={isInCart} handleClick={handleAddToCartClick} />

        <AddToFavorite
          size={40}
          handleClick={handleFavoriteClick}
          isFavorite={isFavorite}
        />
      </div>
    </article>
  );
};
