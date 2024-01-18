import { Empty } from '../../components/Empty';
import { checkoutPageImage } from '../../helpers/constants';

export const CheckoutPage = () => {
  return (
    <div>
      <Empty
        title="Thanks for shopping with us!"
        buttnText="Go back Home"
        img={checkoutPageImage}
      />
    </div>
  );
};
