import React, { useContext } from 'react';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { ProductsContext } from '../../../../context/ProductsContext';
import { Link } from 'react-router-dom';
import { getNormalizedTitle } from '../../../../helpers/stringHelper';
import { Product } from '../../../../types/Product';
import categoriesStyles from './Categories.module.scss';

type Props = {
  products: Product[];
};

export const Categories: React.FC<Props> = ({ products }) => {
  const { categories } = useContext(ProductsContext);

  return (
    <section className={categoriesStyles.categories}>
      <SectionTitle title="Shop by category" />
      <div className={categoriesStyles.categories__container}>
        {categories.map(category => (
          <article key={category} className={categoriesStyles.categories__item}>
            <Link to={`${category}`}>
              <img
                src={`/public/img/category-${category}.png`}
                alt=""
                className={categoriesStyles.categories__image}
              />
              <h3>{getNormalizedTitle(category)}</h3>
              <p>
                {`${
                  products.filter(product => product.category === category)
                    .length
                } products`}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
