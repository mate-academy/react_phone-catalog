import { Products } from '../../../type/Products';
import { Card } from '../Card/Card';
import './CardList.scss';

type Props = {
  products: Products[];
};

export const CradList: React.FC<Props> = ({ products }) => {
  return (
    <div className="card__list-container">
      {products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};
