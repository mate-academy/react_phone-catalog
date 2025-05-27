import { useAppSelector } from '../../../../app/hooks';
import { ProductCart } from '../../../../components/cardItem/ProductCart';
import styles from './ProductSlider.module.scss'


type Props = {
  type: 'new' | 'hot';
};

export const ProductSlider = (props: Props) => {
  const { type } = props;

  const products = useAppSelector(state => state.products.products);

  const getBaseModelId = (itemId: string) => {
    const parts = itemId.split('-');

    return parts.slice(0, -2).join('-');
  };


  const visibleProducts = Array.from(
    new Map(
      (
        type === 'new'
        ? [...products].sort((a, b) => b.year - a.year)
          :[...products].sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
      ).map(product => [getBaseModelId(product.itemId), product])
    ).values()
  ).slice(0, 4);


  return (
    <div className={styles.brand__content}>
      <div className={styles.brand__top}>
        {type ==='new'? <h2>Brand new
          models</h2>:<h2>Hot prices</h2>}

        <div className={styles.navigate}>
          <div className={styles.navigate__buttonR}></div>
          <div className={styles.navigate__buttonL}>
          </div>
        </div>
      </div>
      <div className={styles.cardList}>
        <ProductCart products={visibleProducts} type={type} />
      </div>
    </div>)
}
