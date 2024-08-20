import classNames from 'classnames';
import React from 'react';
import phonesImg from '../../img/Phones.png';
import tabletsImg from '../../img/Tablets.png';
import accessoriesImg from '../../img/Accesories.png';
import phonesFromServer from '../../api/phones.json';
import tabletsFromServer from '../../api/tablets.json';
import accessoriesFromServer from '../../api/accessories.json';
import { Link } from 'react-router-dom';

type Props = {
  parentClassName?: string;
};

const linksData = [
  {
    id: 1,
    title: 'Mobile phones',
    count: phonesFromServer.length,
    image: phonesImg,
    src: '/phones',
  },
  {
    id: 2,
    title: 'Tablets',
    count: tabletsFromServer.length,
    image: tabletsImg,
    src: '/tablets',
  },
  {
    id: 3,
    title: 'Accessories',
    count: accessoriesFromServer.length,
    image: accessoriesImg,
    src: '/accessories',
  },
];

export const ProductLinks: React.FC<Props> = ({ parentClassName }) => {
  return (
    <div
      className={classNames('product-links', {
        [`${parentClassName}__product-links`]: parentClassName,
      })}
    >
      <h2 className="product-links__title">Shop by category</h2>
      <div className="product-links__links">
        {linksData.map(link => (
          <div className="product-links__item" key={link.id}>
            <Link to={link.src} className="product-links__link">
              <img
                className="product-links__image"
                src={link.image}
                alt="image"
              />
            </Link>
            <div className="product-links__text-block">
              <h4 className="product-links__h4">{link.title}</h4>
              <p className="product-links__text body-text">
                {link.count} models
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
