import React from "react";

import {Category as CategoryType} from "../../../../types/Category";
import {useAppSelector} from "../../../../app/hooks";

type Props = {
  category: CategoryType;
};

export const Category: React.FC<Props> = ({category}) => {
  const {title, image, id} = category;

  const {phones, tablets} = useAppSelector(state => state.products);

  const productsCounts = {
    phones: phones.length,
    tablets: tablets.length,
    accessories: 0,
  };

  const key = id as keyof typeof productsCounts;

  return (
    <aside className="category">
      <img className="category__img" src={image} alt="" />

      <h3 className="category__title">{title}</h3>

      <p className="category__info">{productsCounts[key]} models</p>
    </aside>
  );
};
