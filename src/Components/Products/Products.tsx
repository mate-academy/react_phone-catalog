import { Products } from '../../types/Products';
import './Products.scss';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  currentProducts: Products[];
};

export const Product: React.FC<Props> = ({ currentProducts }) => {
  return (
    <div className="products-phones">
      {currentProducts.map(product => (
        <article key={product.id} className="products-phone">
          <div className="products-container">
            <div className="products-img">
              <img src={product.image} alt="" className="products-image" />
            </div>
            <p className="products-title">{product.name} (MQ0G3)</p>
            <span className="products-price">{product.fullPrice}$</span>
            <div className="products-string"></div>
            <div className="products-info">
              <p className="products-text products-text__first">
                Screen <span className="products-span">{product.screen}</span>
              </p>
              <p className="products-text">
                Capacity{' '}
                <span className="products-span">{product.capacity}</span>
              </p>
              <p className="products-text">
                RAM <span className="products-span">{product.ram}</span>
              </p>
            </div>
            <ProductCard product={product} />
          </div>
        </article>
      ))}
    </div>
  );
};
