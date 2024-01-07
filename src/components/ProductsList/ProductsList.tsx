/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './products-list.scss';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({ title, products }) => {
  return (
    <section className="promo page__section">
      <div className="promo__top">
        <h1 className="promo__title">{title}</h1>
        <div className="promo__control">
          <button
            className="promo__button prev icon"
            type="button"
          />
          <button
            className="promo__button next icon"
            type="button"
          />
        </div>
      </div>
      <ul className="promo__screen" data-cy="cardsContainer">
        {products.map(product => (
          <li className="product-list__item" key={product.id}>
            <ProductCard
              product={product}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
