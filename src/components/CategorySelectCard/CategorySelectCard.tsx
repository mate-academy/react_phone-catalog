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
      <div className={style.selectCategory_ImgWrapper}>
        <img
          className={style.selectCategory_Img}
          src={image}
          alt="category img"
        />
      </div>
      <div className={style.selectCategory_description}>
        <p className={style.selectCategory_title}>{title}</p>
        <p className={style.selectCategory_models}>{quantity}</p>
      </div>
    </Link>
  );
};
