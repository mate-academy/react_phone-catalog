import { Link } from 'react-router-dom';
import { Product } from '../../../features/types/Product';
import cl from './ProductCard.module.scss';
import { TechSpecs } from '../../ui/TechSpecs';
import { setCartList, setFavoritesList } from '../../../features/productSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

type Props = { product: Product; className?: string };

export const ProductCard: React.FC<Props> = ({ product, className }) => {
  const dispatch = useAppDispatch();
  const { favoritesList, cartList } = useAppSelector(st => st.products);

  const techSpecs = [
    ['Screen', product.screen],
    ['Capacity', product.capacity],
    ['RAM', product.ram],
  ];

  const isProductAddedToFav = favoritesList.some(fav => fav.id === product.id);
  const isProductAddedToCart = cartList.some(car => car.id === product.id);

  function handleAddAndRemoveFromFavList() {
    if (isProductAddedToFav) {
      dispatch(
        setFavoritesList(favoritesList.filter(fav => fav.id !== product.id)),
      );
    } else {
      dispatch(setFavoritesList([...favoritesList, product]));
    }
  }

  function handleAddAndRemoveFromCart() {
    const productWithQuantity = { ...product, quantity: 1 };

    if (isProductAddedToCart) {
      dispatch(setCartList(cartList.filter(car => car.id !== product.id)));
    } else {
      dispatch(setCartList([...cartList, productWithQuantity]));
    }
  }

  return (
    <article className={`${cl.cardContainer} ${className}`}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img src={product.image} alt={product.name} className={cl.img} />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        onClick={() => window.scrollTo(0, 0)}
        style={{ textDecoration: 'none' }}
      >
        <h3 className={cl.title}>{product.name}</h3>
      </Link>

      <div className={cl.priceContainer}>
        <p className={cl.priceContainer__price}>{`$${product.price}`}</p>
        {product.fullPrice !== product.price && (
          <del>
            <p
              className={cl.priceContainer__fullPrice}
            >{`$${product.fullPrice}`}</p>
          </del>
        )}
      </div>

      <div className={cl.divider} />

      <TechSpecs chars={techSpecs} />

      <div className={cl.buttonContainer}>
        <button
          className={`${cl.buttonContainer__cardButton} ${isProductAddedToCart && cl.buttonContainer__cardButtonAdded}`}
          onClick={handleAddAndRemoveFromCart}
        >
          {isProductAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={cl.buttonContainer__favButton}
          onClick={handleAddAndRemoveFromFavList}
        >
          <svg
            className={`${cl.buttonContainer__favButtonIcon} ${isProductAddedToFav && cl.buttonContainer__favButtonIconAdded}`}
          />
        </button>
      </div>
    </article>
  );
};
