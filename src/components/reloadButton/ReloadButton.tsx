import { useAppDispatch } from '../../app/hooks';
import styles from './ReloadButton.module.scss';

import { detailsProduct } from '../../features/ProductDetailsSlice';
import { init } from '../../features/ProductSlice';
type Props = {
  id?: string;
  category?: string;
};

export const ReloadButton = ({ id, category }: Props) => {
  const dispatch = useAppDispatch();
  const handleReload = () => {
    if (category && id) {
      dispatch(detailsProduct({ category, id }));
    } else {
      dispatch(init());
    }
  };

  return (
    <>
      <div className={styles.reload}>
        <h1 className={styles.reload__title}>Something went wrong!</h1>
        <div className={styles.reload__button} onClick={handleReload}>
          RELOAD
        </div>
      </div>
    </>
  );
};
