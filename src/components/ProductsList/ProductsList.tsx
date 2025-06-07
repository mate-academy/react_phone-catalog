import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks"

import { ProductCart } from "../cardItem/ProductCart";
import { Loader } from "../Loader";
import styles from './ProductList.module.scss';
import { ControlPagination } from "../paginationControl/ControlPagination";


export const ProductList = () => {
  const AllProducts = useAppSelector(store => store.products.products)
  const loading = useAppSelector(store => store.products.loading)
  const filterStatus = useAppSelector(state => state.filter.status);
  const location = useLocation();
   const category = location.pathname.split('/')[1];
const CategoryProducts = AllProducts.filter(product => product.category === category)


  const perPages = useAppSelector(state => state.pagination.status);
const currentPage = useAppSelector(state=>state.pagination.currentPage)

  const visibleGoods = [...CategoryProducts].sort((a, b) => {
    if (filterStatus === 'newest') { return b.year - a.year }
    if (filterStatus === 'alphabetically') {
      return a.name.localeCompare(b.name)
    }
    if(filterStatus ==='cheapest'){return b.price-a.price}
    return 0;
  })

  const paginationGoods = perPages === 'all' ?
    visibleGoods:
visibleGoods.slice((currentPage - 1) * perPages, currentPage * perPages)

  return (<> {loading && <Loader />}
  {visibleGoods.length === 0 && (
        <p className="notification is-warning">
          There are no products matching current filter criteria
        </p>
      )}

    <div className={styles.product__list}>
      {<ProductCart products={ paginationGoods} types={'grid'} />}
    </div>
   {perPages!=='all'&& <ControlPagination
      allGoods={visibleGoods}
      perPages={perPages}
    />}</>)
}
