import { Product, ProductInCart } from '@/shared/type';
import styles from './styles.module.scss';
import { Icon } from '../Icon';
import { defaultProduct } from '@/shared/defaultProduct';
import { ButtonSecond } from '../ButtonSecond/ButtonSecond';
import { Link } from 'react-router-dom';
import { useCart } from '@/app/providers/Cart';
import { Skeleton } from '../Skeleton';

export const ProductCardInCart = ({
  product,
  cartProduct,
  ...props
}: {
  product: Product | null;
  cartProduct: ProductInCart | null;
}) => {
  const prepareProduct = product ? product : defaultProduct;
  const { deleteCartProduct, setCountCartProduct } = useCart();

  return (
    <article {...props}>
      <div className={styles.content}>
        <div className={styles.container1}>
          <Skeleton isLoading={!product}>
            <button
              className={styles.buttonClose}
              onClick={() => {
                deleteCartProduct(prepareProduct.itemId);
              }}
            >
              <Icon type="close"></Icon>
            </button>
          </Skeleton>

          <Skeleton isLoading={!product}>
            <Link to={`/${prepareProduct.category}/${prepareProduct.itemId}`}>
              <img className={styles.image} src={prepareProduct.image} alt="Image product" />
            </Link>
          </Skeleton>
          <div className={styles.nameContainer}>
            <Link
              className={styles.nameLink}
              to={`/${prepareProduct.category}/${prepareProduct.itemId}`}
            >
              <Skeleton isLoading={!product}>
                <h4 className={styles.name}>{prepareProduct.name}</h4>
              </Skeleton>
            </Link>
          </div>
        </div>
        <div className={styles.container2}>
          <Skeleton isLoading={!product}>
            <div className={styles.countContainer}>
              <ButtonSecond
                disabled={cartProduct?.count === 1}
                arrowIcon={false}
                className={styles.buttonCount}
                onClick={() => {
                  setCountCartProduct(prepareProduct.itemId, (prev) => prev - 1);
                }}
              >
                <Icon type="minus"></Icon>
              </ButtonSecond>
              <div className={styles.count}>{cartProduct?.count || 1}</div>
              <ButtonSecond
                arrowIcon={false}
                className={styles.buttonCount}
                onClick={() => {
                  setCountCartProduct(prepareProduct.itemId, (prev) => prev + 1);
                }}
              >
                <Icon type="plus"></Icon>
              </ButtonSecond>
            </div>
          </Skeleton>
          <Skeleton isLoading={!product}>
            <h2
              className={styles.price}
            >{`$${prepareProduct.price * (cartProduct?.count || 1)}`}</h2>
          </Skeleton>
        </div>
      </div>
    </article>
  );
};
