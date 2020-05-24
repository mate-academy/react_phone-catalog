import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  list: Product[];
};

export const Category: React.FC<Props> = ({ list }) => {
  const phone = list.filter((item: Product) => item.type === 'phone').length;
  const tablet = list.filter((item: Product) => item.type === 'tablet').length;
  const accessories = list.filter((item: Product) => item.type === 'accessories').length;

  return (
    <section className="section-category">
      <div className="section-category__container">
        <h2 className="section-category__heading">Shop by category</h2>
        <div className="section-category__articles">
          <article className="section-category__item">
            <Link to="/phones">
              <div className="section-category__img section-category__img--left">
                <img src="img/left.png" alt="mobile" className="section-category__image" />
              </div>
              <h3 className="section-category__title">Mobile phones</h3>
              <p className="section-category__text">{`${phone} models`}</p>
            </Link>
          </article>
          <article className="section-category__item">
            <Link to="/tablets">
              <div className="section-category__img section-category__img--middle">
                <img src="img/middle.png" alt="tablet" className="section-category__image" />
              </div>
              <h3 className="section-category__title">Tablets</h3>
              <p className="section-category__text">{`${tablet} models`}</p>
            </Link>
          </article>
          <article className="section-category__item">
            <Link to="/accessories">
              <div className="section-category__img section-category__img--right">
                <img src="img/right.png" alt="accessories" className="section-category__image" />
              </div>
              <h3 className="section-category__title">Accessories</h3>
              <p className="section-category__text">{`${accessories} models`}</p>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};
