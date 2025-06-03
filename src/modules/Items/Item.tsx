import { useSearchParams } from 'react-router-dom';
import s from './Item.module.scss';
import phones from '../../../public/api/phones.json';

export const Item = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const product = phones.find(phone => phone.id === productId);

  return (
    <div className={s.item}>
      <p>{product?.category}</p>
    </div>
  );
};
