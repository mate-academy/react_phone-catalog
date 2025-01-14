import { Link } from 'react-router-dom';
import { Product } from '../../../features/types/Product';
import cl from './ProductCard.module.scss';
import { TechSpecs } from '../../ui/TechSpecs';

type Props = { product: Product; className?: string };

export const ProductCard: React.FC<Props> = ({ product, className }) => {
  const techSpecs = [
    ['Screen', product.screen],
    ['Capacity', product.capacity],
    ['RAM', product.ram],
  ];

  return (
    <article className={`${cl.cardContainer} ${className}`}>
      <Link to={`${product.category}/${product.id}`}>
        <img src={product.image} alt={product.name} className={cl.img} />
      </Link>

      <Link
        to={`${product.category}/${product.id}`}
        style={{ textDecoration: 'none' }}
      >
        <h3 className={cl.title}>{product.name}</h3>
      </Link>

      <div className={cl.priceContainer}>
        <p className={cl.priceContainer__price}>{`$${product.price}`}</p>
        {product.fullPrice !== product.price && (
          <del>
            <p
              className={cl.priceContainer__fullPrice}
            >{`$${product.fullPrice}`}</p>
          </del>
        )}
      </div>

      <div className={cl.divider} />

      <TechSpecs chars={techSpecs} />

      <div className={cl.buttonContainer}>
        <button className={cl.buttonContainer__cardButton}>Add to cart</button>
        <button className={cl.buttonContainer__favButton}>
          <svg className={cl.buttonContainer__favButtonIcon} />
        </button>
      </div>
    </article>
  );
};
