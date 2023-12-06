import { useAppSelector } from '../../app/hooks';
import { Box } from '../../UI/Box';
import { selectPhones } from '../../features/cartSlices/cartSlice';
import { CartItem } from './CartItem';

export const Cart = () => {
  const phoneInCart = useAppSelector(selectPhones);

  return (
    <Box>
      <h1>Cart</h1>
      <ul>
        {phoneInCart.map((phone) => (
          <li key={phone.phoneId}>
            <CartItem phone={phone} />
          </li>
        ))}
      </ul>
    </Box>
  );
};
