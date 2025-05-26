
import { useAppSelector } from '../../../../app/hooks';
import { CardPhone, ProductCart } from '../../../../components/cardItem/ProductCart'
import styles from './brandNewMode.module.scss'

export const BrandNewModel = () => {


  const products = useAppSelector(state => state.products.products);
const newestProducts = [...products]
  .sort((a, b) => b.year - a.year)
  .slice(0, 10);



  return (
    <div className={styles.brand__content}>
      <div className={styles.brand__top}>
        <h2>Brand new <br></br>
          models</h2>

        <div className={styles.navigate}>
          <div className={styles.navigate__buttonR}>
          </div>
        <div className={styles.navigate__buttonL}>
          </div>
        </div>
      </div>
<div className={styles.cardList}>
      <ProductCart products={ newestProducts} />
</div>
    </div>)
 }
