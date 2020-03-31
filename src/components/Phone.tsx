import React, { FC, MouseEvent } from 'react';

interface Props {
  phone: Phone;
  handleAdd: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  basket: Basket[];
}

export const Phone: FC<Props> = ({ phone, handleAdd, basket }) => {
  const { id, name, imageUrl, snippet } = phone;

  return (
    <div className="phone">
      <img className="phone__img" src={imageUrl} alt="phoneImg" />
      <div className="phone__info">
        <h3 className="phone__name">{name}</h3>
        <p className="phone__description">{snippet}</p>

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

      </div>
    </div>
  );
};
