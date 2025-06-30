import { Link } from 'react-router-dom';
import './Category.scss';

const BASE_URL = '/category-images/';

const categoryBlock = [
  {
    img: 'category-img-first.png',
    h3: 'Mobile phones',
    p: '95 models',
  },

  {
    img: 'cetegory-img-third.png',
    h3: 'Tablets',
    p: '24 models',
  },

  {
    img: 'cetegory-img-second.png',
    h3: 'Accessories',
    p: '100 models',
  },
];

export const Category = () => {
  return (
    <section className="category">
      <div className="category__content">
        <h2 className="category__h2">Shop by category</h2>

        <div className="category__blocks">
          {categoryBlock.map(block => {
            let goTo = '';

            switch (block.h3) {
              case 'Tablets':
                goTo = '/tablets';
                break;

              case 'Mobile phones':
                goTo = '/phones';
                break;

              case 'Accessories':
                goTo = '/accessories';
                break;
            }

            return (
              <div key={block.h3} className="category__block">
                <Link to={goTo}>
                  <img
                    className="category__block-image"
                    src={`${BASE_URL}${block.img}`}
                    alt="Tablet Image"
                  />
                </Link>

                <Link to={goTo} className="category__block-h3">
                  {block.h3}
                </Link>

                <p className="category__block-p">{block.p}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
