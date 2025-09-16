import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/ProductTypes';
import { useCart } from '../BoughtCart/CartContext';
import liked from '../../assets/icons/heartRed.svg';
import heart from '../../assets/icons/heart.svg';
import { useFavourites } from '../Favourites/FavouritesContext';

interface Props {
  product: Product;
  AdditionalPrice?: boolean;
  onClick?: () => void;
}

export const ProductItem: React.FC<Props> = ({
  product,
  AdditionalPrice: additionalPrice = false,
}) => {
  const { favourites, toggleFavourite } = useFavourites();
  const { cart, toggleCart } = useCart();
  const isFavourite = favourites.some(f => f.itemId === product.itemId);
  const isInCart = cart.some(item => item.id === product.id);
  const productPath = `/${product.category}/${product.itemId}`;
  const navigate = useNavigate();

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCart(product);
  };

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavourite(product);
  };

  return (
    <div className="product__elements" onClick={() => navigate(productPath)}>
      <div className="product__container">
        <img
          src={product.image}
          alt={`${product.category} image`}
          className="product__image"
        />
      </div>

      <h3 className="product__name">{product.name}</h3>
      <div className="product__discount">
        <h3 className="product__price">{`${product.price}`}</h3>
        {additionalPrice && (
          <h3 className="product__fullprice">{`${product.fullPrice}`}</h3>
        )}
      </div>

      <div className="product__row"></div>

      <div className="product__information">
        <div className="product__informationFull">
          <h3 className="product__screenTitle">Screen</h3>
          <h3 className="product__screenDescription">{product.screen}</h3>
        </div>
        <div className="product__informationFull">
          <h3 className="product__screenTitle">Capacity</h3>
          <h3 className="product__screenDescription">{product.capacity}</h3>
        </div>
        <div className="product__informationFull">
          <h3 className="product__screenTitle">RAM</h3>
          <h3 className="product__screenDescription">{product.ram}</h3>
        </div>
      </div>

      <div className="buttons">
        <button className="button__add" onClick={handleToggleCart}>
          {isInCart ? 'Remove' : 'Add to cart'}
        </button>
        <button className="button__like" onClick={handleToggleFavourite}>
          <img src={isFavourite ? liked : heart} alt="like" />
        </button>
      </div>
    </div>
  );
};
