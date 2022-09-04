import './Category.scss';

// src="/img/Vector (Stroke).svg"

export const Category: React.FC = () => {
  return (
    <section className="category">
      <h2 className="category__title">
        Shop by category
      </h2>

      <ul className="category__list">
        <li className="category__item">
          <img
            src="/img/Category/phones.jpg"
            alt="Phones"
            className="category__photo"
          />
          <h2 className="category__name">Mobile phones</h2>
          <p className="category__amount">amount</p>
        </li>
        <li className="category__item">
          <img
            src="/img/Category/tablets.jpg"
            alt="Phones"
            className="category__photo"
          />
          <h2 className="category__name">Tabets</h2>
          <p className="category__amount">amount</p>
        </li>
        <li className="category__item">
          <img
            src="/img/Category/accessories.jpg"
            alt="Phones"
            className="category__photo"
          />
          <h2 className="category__name">Accessories</h2>
          <p className="category__amount">amount</p>
        </li>
      </ul>
    </section>
  );
};
