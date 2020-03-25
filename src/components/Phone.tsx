import React, { FC, MouseEvent } from 'react';

interface Props {
  phone: Phone;
  handleAdd: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}

export const Phone: FC<Props> = ({ phone, handleAdd }) => {
  const { id, name, imageUrl, snippet } = phone;

  return (
    <div className="phone">
      <img className="phone__img" src={imageUrl} alt="phoneImg" />
      <div className="phone__info">
        <h3 className="phone__name">{name}</h3>
        <p className="phone__description">{snippet}</p>
        <button type="button" onClick={(e) => handleAdd(e, id)}>+</button>
      </div>
    </div>
  );
};
