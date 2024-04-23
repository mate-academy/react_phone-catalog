import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './Category.scss';
import { Categories } from '../../types/Categories';
import { getProducts } from '../../services/products';
import { CategoryLink } from '../../types/CategoryLink';
import { BASE_URL } from '../../helpers/constants';

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
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getProducts()
      .then(items => {
        setQuantity(items.filter(item => item.category === type).length);
      });
  }, [type]);

  return (
    <article ref={ref} className="category">
      <Link to={link} className="category__link">
        {inView ? (
          <div
            className="category__container-img"
            style={{ backgroundColor: background }}
          >
            <img
              src={`${BASE_URL}/${img}`}
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
        ) : (
          <div className="skeleton category__skeleton" />
        )}

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
