import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';

export const HomePage: React.FC = () => {
  return (
    <>
      <ProductSlider />
      <ProductCard />
      <div className="category">
        <h1 className="category__title">Shop by category</h1>
        <ul className="category__list">
          <li className="category__item">
            <a className="category__link category__phones" href="/phones">
              <img
                className="category__image category__image--phones"
                src="img/category-phones.png"
                alt="Mobile phones"
              />
            </a>
            <h2 className="category__subtitle">Mobile phones</h2>
            <p className="category__paragraph">95 modesl</p>
          </li>
          <li className="category__item">
            <a className="category__link category__tablets" href="/tablets">
              <img
                className="category__image"
                src="img/category-tablets.png"
                alt="Tablets"
              />
            </a>
            <h2 className="category__subtitle">Tablets</h2>
            <p className="category__paragraph">24 modesl</p>
          </li>
          <li className="category__item">
            <a
              className="category__link category__accessories"
              href="/accessories"
            >
              <img
                className="category__image"
                src="img/category-accessories.png"
                alt="Accessories"
              />
            </a>
            <h2 className="category__subtitle">Accessories</h2>
            <p className="category__paragraph">100 modesl</p>
          </li>
        </ul>
      </div>
    </>
  );
};
