import { useAppSelector } from "../../app/hooks"
import { ProductCart } from "../cardItem/ProductCart";
import styles from './ProductList.module.scss';
export const ProductList = () => {
  const phones = useAppSelector(store => store.products.products)
  console.log(phones)
  return (<div className={styles.product__list}>
        <ProductCart products={phones} types={ 'grid'} />
</div>)
}
