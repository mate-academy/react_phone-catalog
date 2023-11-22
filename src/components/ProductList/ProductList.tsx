import './ProductList.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../../types/productType';
import { Card } from '../Card/Card';
import { CartItem } from '../../types/cartType';

type Props = {
  products: Product[]
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export const ProductList: React.FC<Props> = ({
  products,
  setFavorites,
  favorites,
  cartItems,
  setCartItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChangeDetailsId = (id: string) => (
    navigate(`${location.pathname.slice(0, location.pathname.lastIndexOf('/'))}/${id}`)
  );

  return (
    <div className="product-list" data-cy="cardsContainer">
      {products.map(product => {
        return (
          <Card
            key={product.id}
            itemId={product.itemId}
            image={product.image}
            title={product.name}
            price={product.price}
            screen={product.screen}
            capacity={product.capacity}
            ram={product.ram}
            fullPrice={product.fullPrice}
            setFavorites={setFavorites}
            product={product}
            favorites={favorites}
            cartItems={cartItems}
            setCartItems={setCartItems}
            handleChangeDetailsId={handleChangeDetailsId}
          />
        );
      })}
    </div>
  );
};
