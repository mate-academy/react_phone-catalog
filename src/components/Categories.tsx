import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { categories } from '../utils/listsNames';

type Props = {
  itemsLength: number,
};

export const Categories:React.FC<Props> = memo(({ itemsLength }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="categories" data-cy="categoryLinksContainer" ref={ref}>
      <div className="categories__content">
        <h1 className="categories__title">Shop by category</h1>
        <article className="categories__items">
          {inView && categories.map((categorie) => (
            <Link
              to={categorie.toLowerCase()}
              className="categories__item"
              key={categorie}
            >
              <img src={`img/${categorie}.png`} alt={`${categorie} foto`} />
              <div className="categories__item--title">
                {categorie[0].toUpperCase() + categorie.slice(1)}
              </div>
              <div className="categories__item--total-amount">
                {`${categorie === categories[0] ? itemsLength : 0} models` }
              </div>
            </Link>
          ))}

        </article>
      </div>
    </section>
  );
});
