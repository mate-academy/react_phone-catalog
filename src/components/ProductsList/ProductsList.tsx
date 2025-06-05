import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks"

import { ProductCart } from "../cardItem/ProductCart";
import { Loader } from "../Loader";
import styles from './ProductList.module.scss';


export const ProductList = () => {
  const AllProducts = useAppSelector(store => store.products.products)
  const loading = useAppSelector(store => store.products.loading)
  const status = useAppSelector(state => state.filter.status);
  const location = useLocation();
   const category = location.pathname.split('/')[1];

const CategoryProducts = AllProducts.filter(product=>product.category===category)

  const visibleGoods = [...CategoryProducts].sort((a, b) => {
    if (status === 'newest') { return b.year - a.year }
    if (status === 'alphabetically') {
      return a.name.localeCompare(b.name)
    }
    if(status ==='cheapest'){return b.price-a.price}
    return 0;
  })



  return (<> {loading && <Loader />}
  {visibleGoods.length === 0 && (
        <p className="notification is-warning">
          There are no products matching current filter criteria
        </p>
      )}

    <div className={styles.product__list}>
     {<ProductCart products={visibleGoods} types={'grid'}  />}
</div></>)
}
