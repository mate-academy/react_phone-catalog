import React, { useContext } from 'react';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
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
            <Link
              to={`${category}`}
              className={categoriesStyles.categories__link}
            >
              <img
                src={`/public/img/category-${category}.png`}
                alt=""
                className={categoriesStyles.categories__image}
              />
              <div className={categoriesStyles.categories__info}>
                <h3 className={categoriesStyles.categories__infoTitle}>
                  {getNormalizedTitle(category)}
                </h3>
                <p className={categoriesStyles.categories__infoText}>
                  {`${
                    products.filter(product => product.category === category)
                      .length
                  } products`}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
