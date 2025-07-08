import { useAppDispatch } from '../../app/hooks';
import styles from './ReloadButton.module.scss';
import { fetchProducts } from '../../api/fetchProducts';
import { fetchOneProducts } from '../../api/fetchOneTypeProducts';
import { detailsProduct } from '../../features/ProductDetailsSlice';
import { init } from '../../features/ProductSlice';
export const ReloadButton = ({id,category}) => {
  const dispatch = useAppDispatch();
  const handleReload = () => {
    if (category && id) {
      dispatch(detailsProduct({category, id}))
    } else
    dispatch(init())
  }
  return (<>
     <div className={styles.reload}>

      <h1 className={styles.reload__title}>Something went wrong!</h1>
      <div className={styles.reload__button}
      onClick={handleReload}>
         RELOAD
</div>

    </div></>
  )
}
