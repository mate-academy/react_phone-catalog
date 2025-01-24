import { Link } from 'react-router-dom';
import { Product } from '../../../features/types/Product';
import cl from './ProductCard.module.scss';
import { TechSpecs } from '../../ui/TechSpecs';
import { AddToFavCartButton } from '../../ui/AddToFavCartButton';
import { useAppSelector } from '../../../app/hooks';

type Props = { product: Product; className?: string };

const textContent = {
  screen: {
    en: 'Screen',
    ua: 'Екран',
  },
  capacity: {
    en: 'Capacity',
    ua: 'Сховище',
  },
  ram: {
    en: 'RAM',
    ua: 'Оперативна пам`ять',
  },
};

export const ProductCard: React.FC<Props> = ({ product, className }) => {
  const { language } = useAppSelector(st => st.global);

  const techSpecs = [
    [textContent.screen[language], product.screen],
    [textContent.capacity[language], product.capacity],
    [textContent.ram[language], product.ram],
  ];

  return (
    <article className={`${cl.cardContainer} ${className}`}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img src={product.image} alt={product.name} className={cl.img} />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        onClick={() => window.scrollTo(0, 0)}
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

      <AddToFavCartButton product={product} height="40px" />
    </article>
  );
};
