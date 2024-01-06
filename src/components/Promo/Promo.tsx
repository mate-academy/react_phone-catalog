/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './promo.scss';

type Props = {
  title: string,
  products: Product[],
};

export const Promo: React.FC<Props> = ({ title, products }) => {
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
      <div className="promo__screen">
        {products.map(product => (
          <ProductCard
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
