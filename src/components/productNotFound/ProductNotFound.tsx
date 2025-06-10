
import styles from './ProductNotFound.module.scss';
type Props = {
  type: 'tablets' | 'accessories' | 'phones';
}
export const ProductNotFound = ({ type}:Props) => {
  return (
    <div className={styles.product}>
      <img src='/img/product-not-found.png'/>
      There are no {type} yet

    </div>
  )
}
