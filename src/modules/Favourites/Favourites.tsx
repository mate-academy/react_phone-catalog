import classNames from 'classnames';

import { Tree } from '../../components/Tree';
import styles from './Favourites.module.scss';
import { UseHooks } from '../../AppHooks';
import { ProductListBig } from '../../components/ProductListBig';

export const Favourites = () => {
  const { favourites } = UseHooks();

  return (
    <>
      <div className="inlineContainer">
        <Tree currentCategory="Favourites" />
        <h1>Favourites</h1>
        <p className={classNames(styles.quantity, 'body-text')}>
          {`${favourites.length} models`}
        </p>
        <div className={styles.list}>
          <ProductListBig items={favourites} />
        </div>
      </div>
    </>
  );
};
