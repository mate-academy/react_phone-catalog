import { BackLink } from '../../modules/BackLink';
import { Container } from '../../modules/Container';
import styles from './CartPage.module.scss';
import { Checkout } from './Checkout/Checkout';

export const CartPage = () => {
  return (
    <>
      <Container>
        <BackLink />
        <h2 className={styles.heading}>Cart</h2>
        <Checkout />
      </Container>
    </>
  );
};
