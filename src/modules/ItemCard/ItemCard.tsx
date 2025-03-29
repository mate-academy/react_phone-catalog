import s from './ItemCard.module.scss';
import { CardHeader } from './CardHeader';

export const ItemCard = () => {
  return (
    <div className={s.card}>
      <CardHeader />
    </div>
  );
};
