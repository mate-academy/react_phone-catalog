import { Empty } from '../../components/Empty';
import { checkoutPageImage } from '../../helpers/constants';

export const CheckoutPage = () => {
  return (
    <div>
      <Empty
        title="Thank you for your purchase!"
        buttonText="Back to Home"
        img={checkoutPageImage}
      />
    </div>
  );
};
