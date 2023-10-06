import { useMemo } from 'react';
import './Category.scss';
import { Link } from 'react-router-dom';

type Props = {
  phonesLength: number;
  tabletsLength: number;
  accessoriesLength: number;
};

const Category: React.FC<Props> = ({
  phonesLength,
  tabletsLength,
  accessoriesLength,
}) => {
  const categories = useMemo(() => ([
    {
      href: '/phones',
      img: './img/categories/category-phones.png',
      title: 'Mobile phones',
      count: phonesLength,
    },
    {
      href: '/tablets',
      img: './img/categories/category-tablets.png',
      title: 'Tablets',
      count: tabletsLength,
    },
    {
      href: '/accessories',
      img: './img/categories/category-accessories.png',
      title: 'Accessories',
      count: accessoriesLength,
    },
  ]), [phonesLength, tabletsLength, accessoriesLength]);

  return (
    <section className="page__section category">
      <div className="container">
        <h2 className="page__title">
          Shop by category
        </h2>
        <ul className="category__list">
          {categories.map(({
            href,
            img,
            title,
            count,
          }) => (
            <li key={href} className="category__item">
              <Link
                className="category__link"
                to={href}
                data-cy="categoryLinksContainer"
              >
                <figure>
                  <div className="category__img-block">
                    <img className="category__img" src={img} alt="category" />
                  </div>
                  <figcaption>
                    <h3 className="category__name">
                      {title}
                    </h3>
                    <span className="category__models">
                      {`${count} models`}
                    </span>
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Category;
