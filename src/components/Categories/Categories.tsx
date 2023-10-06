import './Categories.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { NamesBySections } from '../../types/NamesBySections';
import { ProductShort } from '../../types/ProductShort';
import { NamesByCategories } from '../../types/NamesByCategories';
import { DEF_SORT } from '../../helpers/consts';

import photoPhones from '../../images/categiries/category-phones.png';
import photoTablets from '../../images/categiries/category-tablets.png';
import photoAccess from '../../images/categiries/category-accessories.png';

type Props = {
  title: string,
  products: ProductShort[],
};

const categories = [
  {
    link: NamesByCategories.Phones,
    name: NamesBySections.Phones,
    photo: photoPhones,
  },
  {
    link: NamesByCategories.Tablets,
    name: NamesBySections.Tablets,
    photo: photoTablets,
  },
  {
    link: NamesByCategories.Accessories,
    name: NamesBySections.Accessories,
    photo: photoAccess,
  },
];

export const Categories: React.FC<Props> = React.memo(({
  title, products,
}) => {
  const quantityOf = (link: string) => {
    return products.filter(p => p.category === link).length;
  };

  return (
    <div className="categories">
      <h1 className="title__biggest">{title}</h1>

      <div
        className="categories__content"
        data-cy="categoryLinksContainer"
      >
        {categories.map(category => {
          const { link, name, photo } = category;

          return (
            <Link
              key={name}
              to={link + DEF_SORT}
              className="categories__category"
            >
              <div className={classNames(
                'categories__img--container',
                `categories__category--${link}`,
              )}
              >
                <img
                  className="categories__img"
                  src={photo}
                  alt={photo}
                />
              </div>

              <h3 className="categories__category--name">
                {name}
              </h3>

              <div className="categories__category--quantity">
                {`${quantityOf(link)} models`}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
});
