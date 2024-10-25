import classNames from 'classnames';
import { changeFavorites } from '../../redux/favoritesSlice';
import { Categories, Product } from '../../types/Product';
import { useAppDispatch } from '../../utils/hooks';
import './Card.scss';
import { addCart } from '../../redux/cartSlice';
import { Phone } from '../../types/Phone';
import { Accessoirs } from '../../types/Accesories';
import { Tables } from '../../types/Tablets';

interface Props {
  card: Product | Phone | Accessoirs | Tables;
  showSale?: boolean;
  favorite: boolean;
}

export const Card: React.FC<Props> = ({ card, showSale = false, favorite }) => {
  const dispatch = useAppDispatch();

  const handleFavoritesChange = () => {
    dispatch(changeFavorites(card));
  };

  const handleAddToCart = () => {
    dispatch(addCart(card));
  };

  return (
    <div className="card">
      <img
        src={'image' in card ? card.image : card.images[0]}
        alt={card.name}
        className="card__img"
      />
      <span className="card__title">{card.name}</span>
      <div className="card__prices">
        <h3 className="card__price">{`$${'price' in card ? card.price : card.priceDiscount}`}</h3>
        <h3 className="card__fullPrice">
          {showSale === true
            ? `$${'fullPrice' in card ? card.fullPrice : card.priceRegular}`
            : ''}
        </h3>
      </div>
      <hr className="card__line" />
      <div className="card__infoBlock">
        <p className="card__infoTitle">Screen</p>
        <p className="card__infoText">{card.screen}</p>
      </div>
      <div className="card__infoBlock">
        <p className="card__infoTitle">Capacity</p>
        <p className="card__infoText">{card.capacity}</p>
      </div>
      <div className="card__infoBlock">
        <p className="card__infoTitle">RAM</p>
        <p className="card__infoText">{card.ram}</p>
      </div>
      <div className="card__infoBlock">
        <p className="card__infoTitle">RAM</p>
        <p className="card__infoText">{card.ram}</p>
      </div>
      <div className="card__infoBlock">
        <p className="card__infoTitle">RAM</p>
        <p className="card__infoText">{card.ram}</p>
      </div>
      <div className="card__buttons">
        <button className="card__cartButton" onClick={() => handleAddToCart()}>
          Add to cart
        </button>
        <button
          className={classNames('card__favButton', {
            'card__favButton--clicked': favorite,
          })}
          onClick={() => handleFavoritesChange()}
        />
      </div>
    </div>
  );
};
