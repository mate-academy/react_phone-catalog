import classNames from 'classnames';
import styles from './ProductList.module.scss';
import { Product } from '../../../types/data';
import { ProductItem } from '../ProductItem/ProductItem';

type Props = {
  list: Product[];
};

export const ProductList: React.FC<Props> = ({ list }) => {
  return (
    <div className={classNames(styles.grid)}>
      {list.map(it => (
        <ProductItem key={it.id} item={it} />
      ))}
    </div>
  );
};
