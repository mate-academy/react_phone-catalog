import { Link } from 'react-router-dom';
import './Accessories.scss';
import productsJson from '../../../public/api/products.json';
import { useDispatch } from 'react-redux';
import { useProductState } from '../Phones/Phones';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { addToFavorites, removeFromFavorites }
  from '../../redux/favoritesSlice';

export type Accessory = {
  id: string;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export const Accessories: React.FC = () => {
  const products = JSON.parse(JSON.stringify(productsJson));
  const dispatch = useDispatch();
  const { isInCart, isInFavorites } = useProductState();

  return (
    <div>
      <h1>Accessories PAGE</h1>
      {products.filter((access: Accessory) => access.category === 'accessories')
        .sort((a:Accessory, b:Accessory) => b.price - a.price)
        .map((access:Accessory) => (
          <div className="card" key={access.itemId}>
            <img
              src={`../../../public/${access.image}`}
              alt="here should be an image"
              height="300"
            />
            <br/>
            <Link
              to={`/accessories/${access.itemId}`}
            >
              {`${access.name}`}
            </Link>
            <br />
            {`${access.price} $`} &emsp;<s>{`${access.fullPrice} $`}</s>
            <br />
            Screen &emsp;{`${access.screen}`}
            <br />
            Capacity &emsp;{`${access.capacity}`}
            <br />
            RAM &emsp;{`${access.ram}`}
            <br />
            <button className={`add-to-cart-button ${isInCart(access?.id) ? 'in-cart' : ''}`}
              onClick={() => isInCart(access?.id)
                ? dispatch(removeFromCart(access?.id))
                : dispatch(addToCart(access))
              }>add_to_cart</button>
            <button className={`favorite-button ${isInFavorites(access?.id) ? 'in-favorites' : ''}`}
              onClick={() => isInFavorites(access?.id)
                ? dispatch(removeFromFavorites(access?.id))
                : dispatch(addToFavorites(access))
              }>♥️</button>
            <br />
            <br />
          </div>
        ))}
    </div>
  );
};
