import { useContext } from 'react';
import { ProductContext } from '../../helper/ProductContext';
import './CardItem.scss';
import { Product } from '../../helper/Product';

export const CartItem = () => {
  const { card, setCard } = useContext(ProductContext);

  const addQuantity = (c: Product) => {
    const updateQuantity = card.map(item =>
      item.id === c.id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    setCard(updateQuantity);
  };

  const subQuantity = (c: Product) => {
    if (c.quantity > 1) {
      const updateQuantity = card.map(item =>
        item.id === c.id ? { ...item, quantity: item.quantity - 1 } : item,
      );

      setCard(updateQuantity);
    }
  };

  const removeCart = (c: Product) => {
    const updateCard = card.filter(el => el.id !== c.id);

    setCard(updateCard);
  };

  return card.map(c => (
    <div className="cardItem" key={c.id}>
      <div className="cardItem__first-row">
        <button className="cardItem__button" onClick={() => removeCart(c)}>
          <img className="cardItem__button-icon" src="img/Close.png" />
        </button>
        <div className="cardItem__photo-box">
          <img
            className="cardItem__photo"
            src={c.image}
            alt="pictures of product"
          />
        </div>
        <div className="cardItem__name">{c.name}</div>
      </div>
      <div className="cardItem__second-row">
        <div className="cardItem__quantity">
          <button
            className="cardItem__plusminus"
            onClick={() => subQuantity(c)}
            disabled={c.quantity <= 1}
          >
            -
          </button>
          <span className="cardItem__amount">
            {c.quantity > 0 ? c.quantity : 1}
          </span>

          <button
            className="cardItem__plusminus"
            onClick={() => addQuantity(c)}
          >
            +
          </button>
        </div>
        <div className="cardItem__price">
          {c.quantity > 0 ? `$${c.price * c.quantity}` : `$${c.price}`}
        </div>
      </div>
    </div>
  ));
};
