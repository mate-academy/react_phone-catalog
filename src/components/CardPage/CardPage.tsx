import { Link, useNavigate } from 'react-router-dom';
import arrowLeft from '../../imgs/ArrowLeft.svg';
import './CardPage.scss';
import { utils } from '../../utils/generalFunctions';
import { useContext, useState } from 'react';
import { LikedIdContext } from '../../utils/context';

export const CardPage: React.FC = () => {
  const navigate = useNavigate();
  const { removeCardId, addCardId, cardIds, setCardIds } =
    useContext(LikedIdContext);
  const items = utils.findById(cardIds);
  const [product, setProduct] = useState(items);

  const handleButtonRemove = (id: string) => {
    removeCardId(id);
    const getIds = utils.getFromStorage('card');

    setProduct(utils.findById(getIds));
  };

  const counter = (id: string) => {
    return items.filter(item => item.itemId === id).length;
  };

  const handleButtonPlus = (id: string) => {
    addCardId(id);
    const newItems = utils.findById(cardIds);

    setProduct(newItems);
  };

  const handleButtonMinus = (id: string) => {
    const currentIds = [...cardIds];
    const index = currentIds.findIndex((itemId: string) => itemId === id);

    if (index !== -1) {
      currentIds.splice(index, 1);
    }

    setCardIds(currentIds);
    setProduct(utils.findById(currentIds));
  };

  const renderedItems = product.filter(
    (item, index) => product.indexOf(item) === index,
  );

  const price = product.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <section className="card">
      <div className="container">
        <div className="grid">
          <Link
            to="#"
            onClick={e => {
              e.preventDefault();
              navigate(-1);
            }}
            className="buttonBack buttonBack--card"
          >
            <img src={arrowLeft} alt="arrowLeft" className="buttonBack_arrow" />
            <p className="buttonBack_text">Back</p>
          </Link>
          <p className="card_title">Card</p>

          <div className="card_items">
            {renderedItems.map((item, index) => (
              <div className="card_items_container" key={index}>
                <div className="card_items_container_top">
                  <button
                    className="card_items_container_buttonRemove"
                    onClick={() => handleButtonRemove(item.itemId)}
                  ></button>
                  <img
                    src={item.image}
                    alt="item-image"
                    className="card_items_container_img"
                  />
                  <p className="card_items_container_title">{item.name}</p>
                </div>
                <div className="card_items_container_bottom">
                  <div className="card_items_container_box">
                    <button
                      className="card_items_container_box_button"
                      onClick={() => handleButtonMinus(item.itemId)}
                      disabled={counter(item.itemId) === 1}
                      style={{
                        border: `2px solid ${counter(item.itemId) === 1 ? '#E2E6E9' : '#B4BDC3'}`,
                      }}
                    >
                      -
                    </button>
                    <p className="card_items_container_box_count">
                      {counter(item.itemId)}
                    </p>
                    <button
                      className="card_items_container_box_button"
                      onClick={() => handleButtonPlus(item.itemId)}
                    >
                      +
                    </button>
                  </div>
                  <p className="card_items_container_price">{`$${item.price * counter(item.itemId)}`}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card_total">
            <div className="card_total_box">
              <p className="card_total_box_price">{`$${price}`}</p>
              <p className="card_total_box_text">{`Total for ${product.length} items`}</p>
            </div>
            <button className="card_total_button" onClick={
              () => {
                alert('Thank you for visiting my Website!')
              }
            }>Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
};
