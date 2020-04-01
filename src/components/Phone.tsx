import React, { FC, MouseEvent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

interface Props {
  phone: Phone;
  // handleAdd: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  // handleLikes: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  basket: Basket[];
  likes: string[];
  setBasket: (basket: Basket[]) => void;
  setLikes: (likes: string[]) => void;
}

export const PhoneTemplate: FC<Props> = ({
  phone,
  // handleAdd,
  // handleLikes,
  basket,
  likes,
  setBasket,
  setLikes,
}) => {
  const { id, name, imageUrl, snippet } = phone;

  const handleAdd = (e: MouseEvent<HTMLButtonElement>, phoneId: string) => {
    e.preventDefault();

    setBasket([...basket, {
      id: phoneId, quantity: 1, phone: `/phones/${phoneId}`,
    }]);
  };

  const handleLikes = (e: MouseEvent<HTMLButtonElement>, phoneId: string) => {
    e.preventDefault();
    const hasLike = likes.findIndex(item => item === phoneId);

    if (hasLike === -1) {
      setLikes([...likes, phoneId]);
    } else {
      setLikes([...likes.filter(item => item !== phoneId)]);
    }
  };

  return (
    <div className="phone">
      <img className="phone__img" src={imageUrl} alt="phoneImg" />
      <div className="phone__info">
        <h3 className="phone__name">{name}</h3>
        <p className="phone__description">{snippet}</p>

        <div className="phone__buttons">
          {basket.find(item => item.id === id)
            ? (
              <button
                className="phone__added"
                type="button"
                disabled
              >
              Added to cart
              </button>
            )
            : (
              <button
                className="phone__add"
                type="button"
                onClick={(e) => handleAdd(e, id)}
              >
              Add to cart
              </button>
            )}

          {likes.includes(id)
            ? (
              <button
                type="button"
                className="phone__like"
                onClick={(e) => handleLikes(e, id)}
              />
            )
            : (
              <button
                type="button"
                className="phone__dislike"
                onClick={(e) => handleLikes(e, id)}
              />
            )
          }

        </div>

      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setPhones: actions.setPhones,
  setBasket: actions.setBasket,
  setLikes: actions.setLikes,
};

export const Phone = connect(
  null,
  mapDispatchToProps,
)(PhoneTemplate);
