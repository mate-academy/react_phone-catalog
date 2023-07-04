import { Link } from 'react-router-dom';

import { memo } from 'react';
import { Categories as PageCategories } from '../utils/types/Categgories';

type Props = {
  itemsLength: number,
};

export const Categories:React.FC<Props> = memo(({ itemsLength }) => {
  return (
    <section className="categories" data-cy="categoryLinksContainer">
      <div className="categories__content">
        <h1 className="categories__title">Shop by category</h1>
        <article className="categories__items">
          {Object.values(PageCategories).map((categorie) => (
            <Link
              to={categorie.toLowerCase()}
              className="categories__item"
              key={categorie}
            >
              <img src={`img/${categorie}.png`} alt={`${categorie} foto`} />
              <div className="categories__item--title">{categorie}</div>
              <div className="categories__item--total-amount">
                {`${categorie === PageCategories.Phones ? itemsLength : 0} models` }
              </div>
            </Link>
          ))}

        </article>
      </div>
    </section>
  );
});
