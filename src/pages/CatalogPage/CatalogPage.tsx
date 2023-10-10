/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import { useCamelCase } from '../../hooks/useCamelCase';
import { filterByCategory } from '../../utils/filterHelper';
import { useProducts } from '../../Store';

import styles from './CatalogPage.module.scss';

import { Button } from '../../components/Button';
import { ShowLocation } from '../../components/ShowLocation';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const products = useProducts(state => state.products);
  const currProducts = filterByCategory(products, category);

  // eslint-disable-next-line no-console
  console.log(styles);

  return (
    <>
      <ShowLocation />
      {!currProducts.length ? (
        <div className={styles.noProducts}>
          <p>{`${useCamelCase(category)} are out of stock :(`}</p>
          <Button text="Go to Home" onClick={() => navigate('/')} />
        </div>
      ) : (
        <h1>
          {category === 'phones' ? 'Mobile phones' : useCamelCase(category)}
        </h1>
      )}
    </>
  );
};
