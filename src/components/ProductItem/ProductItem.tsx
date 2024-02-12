import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../../types/product';
import './ProductItem.scss';
import { MyButton } from '../UI/MyButton';
import { DispatchContext, StateContext } from '../../store/State';

type Props = {
  product: Product;
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const {
    id,
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const [favorite, setFavorite] = useState(false);
  const { favoriteProducts } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setFavorite(favoriteProducts.includes(id));
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [id, favoriteProducts]);

  const preparedImgUrl = useMemo(() => {
    return imageUrl.split('/').slice(-1);
  }, [imageUrl]);

  const priceWithDiscount = useMemo(() => {
    return price - ((price * discount) / 100);
  }, [price, discount]);

  const preparedCapacity = useMemo(() => {
    return `${capacity.slice(0, -2)} ${capacity.slice(-2)}`;
  }, [capacity]);

  const preparedRam = useMemo(() => {
    return `${ram.slice(0, -2)} ${ram.slice(-2)}`;
  }, [ram]);

  function handleSetFavorite() {
    if (!favorite) {
      dispatch({ type: 'addFavorite', payload: id });
    } else {
      dispatch({ type: 'removeFavorite', payload: id });
    }
  }

  return (
    <article
      className="product-item"
      data-cy="cardsContainer"
    >
      <div className="product-item__imgbox">
        <img
          src={`img/products/${preparedImgUrl}`}
          alt={name}
          className="product-item__img"
        />
      </div>

      <p className="product-item__title">{name}</p>

      <div className="product-item__pricebox">
        <h2>{`$${priceWithDiscount}`}</h2>

        <h2 className="product-item__price">{`$${price}`}</h2>
      </div>

      <ul className="product-item__options">
        <li className="product-item__option-item">
          <p className="product-item__option-name">Screen</p>
          <p className="product-item__option-value">{screen}</p>
        </li>
        <li className="product-item__option-item">
          <p className="product-item__option-name">Capacity</p>
          <p className="product-item__option-value">{preparedCapacity}</p>
        </li>
        <li className="product-item__option-item">
          <p className="product-item__option-name">RAM</p>
          <p className="product-item__option-value">{preparedRam}</p>
        </li>
      </ul>

      <div className="product-item__btnbox">
        <MyButton>Add to cart</MyButton>
        <button
          type="button"
          className="product-item__favorite"
          onClick={handleSetFavorite}
        >
          {favorite
            ? <img src="img/icons/heart-red.svg" alt="favorite product" />
            : <img src="img/icons/heart.svg" alt="favorite product" />}
        </button>
      </div>
    </article>
  );
};
