import style from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { ProductInfo } from '../ProductInfo';
import { Product } from '@/shared/types/Product';

type Props = { product: Product; showRegularPriceOnly?: boolean };

export const ProductCard: React.FC<Props> = ({
  product,
  showRegularPriceOnly,
}) => {
  const { name, screen, capacity, ram, image, itemId, fullPrice, price } =
    product;

  return (
    <div className={style.card}>
      <div className={style.card__content}>
        <div className={style.picture}>
          <Link to={`/product/${itemId}`}>
            <img className={style.image} src={`${image}`} alt={itemId} />
          </Link>
        </div>
        <div className={style.title}>
          <Link to={`/product/${itemId}`}>{name}</Link>
        </div>

        <ProductInfo
          product={product}
          price={price}
          fullPrice={fullPrice}
          showRegularPriceOnly={showRegularPriceOnly}
          specs={[
            { key: 'Screen', value: screen },
            { key: 'Capacity', value: `${capacity} GB` },
            { key: 'RAM', value: `${ram} GB` },
          ]}
        />
      </div>
    </div>
  );
};
