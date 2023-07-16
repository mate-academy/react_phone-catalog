import { useDispatch } from 'react-redux';

import { addCart } from '../../Reducer/cartReducer';

import { Phone } from '../../type/Phone';

import './button.scss';

type Props = {
  phone: Phone;
};

export const AddCartButton: React.FC<Props> = ({ phone }) => {
  const dispatch = useDispatch();

  return (
    <button
      className="button button__add"
      type="button"
      onClick={() => dispatch(addCart(phone))}
    >
      Add to cart
    </button>
  );
};
