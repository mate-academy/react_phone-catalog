import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Item } from '../../types/Item';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  products: Item[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="ProductsList">
      <ul data-cy="productList" className="ProductsList__list">
        <TransitionGroup component={null}>
          {products.map((product) => (
            <CSSTransition
              key={product.id}
              timeout={300}
              classNames="ProductsList-animation"
            >
              <li className="ProductsList__item">
                <ProductCard item={product} />
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </div>
  );
};
