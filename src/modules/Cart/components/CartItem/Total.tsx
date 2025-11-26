import { Line } from '../../../shared/components/Line';
import scss from './Total.module.scss';

interface Props {
  totalItems: number;
  totalPrice: number;
}

export const Total: React.FC<Props> = ({ totalItems, totalPrice }) => {
  return (
    <section>
      <h2 className={scss.total__price}>{`$${totalPrice}`}</h2>
      <p className={scss.total__amount}>{`Total for ${totalItems} items`}</p>
      <Line marginTop={1.6} marginBottom={1.6} />
    </section>
  );
};
