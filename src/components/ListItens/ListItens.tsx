import styles from './ListItens.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { hotPricesData } from '../../data/hotPricesData';

type Props = {
  list?: object[];
};

export const ListItens = ({ list = hotPricesData }: Props) => {
  return (
    <div className={styles.listContainer}>
      {list.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};
