import { useAppSelector } from "../../app/hooks"
import { ProductCart } from "../cardItem/ProductCart";
import { Loader } from "../Loader";
import styles from './ProductList.module.scss';
export const ProductList = () => {
  const phones = useAppSelector(store => store.products.products)
  const loading = useAppSelector(store=>store.products.loading)
  console.log(phones)
  return (<> {loading && <Loader/>}
  <div className={styles.product__list}>

        <ProductCart products={phones} types={ 'grid'} />
</div></>)
}
