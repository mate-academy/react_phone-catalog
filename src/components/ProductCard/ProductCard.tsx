import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../../types/product';
import './ProductCard.scss';
import { MyButton } from '../UI/MyButton';
import { DispatchContext, StateContext } from '../../store/State';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    image,
    name,
    price,
    fullPrice,
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
      className="product-card"
      data-cy="cardsContainer"
    >
      <div className="product-card__imgbox">
        <img
          src={`_new/${image}`}
          alt={name}
          className="product-card__img"
        />
      </div>

      <p className="product-card__title">{name}</p>

      <div className="product-card__pricebox">
        <h2>{`$${price}`}</h2>

        <h2 className="product-card__price">{`$${fullPrice}`}</h2>
      </div>

      <ul className="product-card__options">
        <li className="product-card__option-item">
          <p className="product-card__option-name">Screen</p>
          <p className="product-card__option-value">{screen}</p>
        </li>
        <li className="product-card__option-item">
          <p className="product-card__option-name">Capacity</p>
          <p className="product-card__option-value">{preparedCapacity}</p>
        </li>
        <li className="product-card__option-item">
          <p className="product-card__option-name">RAM</p>
          <p className="product-card__option-value">{preparedRam}</p>
        </li>
      </ul>

      <div className="product-card__btnbox">
        <MyButton>Add to cart</MyButton>
        <button
          type="button"
          className="product-card__favorite"
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
