import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Category.scss';
import { Categories } from '../../types/Categories';
import { getProducts } from '../../services/products';
import { CategoryLink } from '../../types/CategoryLink';

interface Props {
  category: CategoryLink;
}

export const Category: React.FC<Props> = ({
  category: {
    name,
    link,
    img,
    background,
    type,
  },
}) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getProducts()
      .then(items => {
        setQuantity(items.filter(item => item.category === type).length);
      });
  }, [type]);

  return (
    <article className="category">
      <Link to={link} className="category__link">
        <div
          className="category__container-img"
          style={{ backgroundColor: background }}
        >
          <img
            src={img}
            alt={name}
            className={classNames('category__img', {
              'category__img--phones':
                type === Categories.phones,
              'category__img--tablets':
                type === Categories.tablets,
              'category__img--accessories':
                type === Categories.accessories,
            })}
          />
        </div>

        <h3 className="category__category-name">
          {name}
        </h3>
      </Link>

      <span className="category__quantity">
        {`${quantity} modules`}
      </span>
    </article>
  );
};
