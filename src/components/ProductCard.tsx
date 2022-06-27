import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import ProductButtons from './ProductButtons';
import TechSpecs from './TechSpecs';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  // const {
  //   getItemQuantity,
  //   removeFromCart,
  //   increaseQuantity,
  // } = useContext(CartContext);

  // const {
  //   favorites,
  //   addInFavorites,
  //   removeFromFavorites,
  // } = useContext(FavoritesContext);

  // const itemQuantity = getItemQuantity(product.id);

  // const handleCart = () => {
  //   if (itemQuantity) {
  //     removeFromCart(product.id);
  //   } else {
  //     increaseQuantity(product.id);
  //   }
  // };

  // const handleFaforites = () => {
  //   if (favorites.includes(product.id)) {
  //     removeFromFavorites(product.id);
  //   } else {
  //     addInFavorites(product.id);
  //   }
  // };

  const techList = [
    { name: 'Screen', spec: product.screen },
    { name: 'Capacity', spec: product.capacity },
    { name: 'RAM', spec: product.ram },
  ];

  return (
    <div className="card">
      <Link
        to={`/${product.type}s/${product.id}`}
        className="card__img-container"
      >
        <img
          src={product.imageUrl}
          alt="img-product"
          className="card__img"
        />
      </Link>
      <h3 className="card__name">
        {product.name}
      </h3>
      <p className="card__price">
        <span
          className="card__price--discount"
        >
          {`$${product.newPrice}`}
        </span>
        {product.discount > 0 && <span className="card__price--oldPrice">{`$${product.price}`}</span>}
      </p>
      <TechSpecs list={techList} />
      <ProductButtons id={product.id} />
      {/* <div className="card__button-container">
        <PrimatyButton
          OnClick={handleCart}
          classModificator={classNames({
            'primary-button--selected': itemQuantity,
          })}
        >
          Add to cart
        </PrimatyButton>
        <SquareButton
          OnClick={handleFaforites}
          classModificator="square-button--m"
        >
          {favorites.includes(product.id) ? <Liked /> : <NotLiked />}
        </SquareButton>
      </div> */}
    </div>
  );
};

export default ProductCard;
