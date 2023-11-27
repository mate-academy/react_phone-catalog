import { Product } from '../types/Product';
import { Card } from './ProductCard';

type Props = {
  catalog: Product[],
  start: number,
  end: number,
};

export const Catalog:React.FC<Props> = ({
  catalog,
  start,
  end,
}) => {
  return (
    <div className="catalog">
      <div className="catalog__items">
        {catalog.slice(start, end).map(item => (
          <Card
            item={item}
            key={item.id}
            hasDiscont={item.fullPrice !== item.price}
          />
        ))}
      </div>
    </div>
  );
};
