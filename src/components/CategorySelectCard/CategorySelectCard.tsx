import React from 'react';
import style from './CategorySelectCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  quantity: number;
  image: string;
  path: string;
};

export const CategorySelectCard: React.FC<Props> = ({
  title,
  quantity,
  image,
  path,
}) => {
  return (
    <Link to={path} className={style.selectCategory}>
      <div className={style.selectCategory__imageWrapper}>
        <img
          className={style.selectCategory__image}
          src={image}
          alt="category image"
        />
      </div>
      <div className={style.selectCategory__description}>
        <p className={style.selectCategory__title}>{title}</p>
        <p className={style.selectCategory__models}>{quantity} models</p>
      </div>
    </Link>
  );
};
