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
            return (
              <div key={block.h3} className="category__block">
                <img
                  className="category__block-image"
                  src={`${BASE_URL}${block.img}`}
                  alt="Tablet Image"
                />

                <h3 className="category__block-h3">{block.h3}</h3>

                <p className="category__block-p">{block.p}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
