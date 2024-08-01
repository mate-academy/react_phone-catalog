import style from './CardsContainer.module.scss';
import { Product } from '../../types/ContextType/Product';
import { Card } from './Card/Card';

type Props = {
  gadgets: Product[];
};

export const CardsContainer: React.FC<Props> = ({ gadgets }) => {
  return (
    <ul className={style.cards__list} draggable={false}>
      {gadgets.map(product => (
        <li key={product.itemId}>
          <Card product={product} discount={false} />
        </li>
      ))}
    </ul>
  );
};
