import React, { useEffect, useState } from 'react';
import styles from './CategoryPage.module.scss';
import { Link } from 'react-router-dom';
import { Phone } from '../../../../types/phone';
import { Loader } from '../Loader';
import ProductsList from '../ProductsList';
import { Tablet } from '../../../../types/tablet';
import { Accessorie } from '../../../../types/accessorie';

type Props = {
  type: string;
  getProducts: () => Promise<Tablet[] | Accessorie[] | Phone[]>;
};

export const CategoryPage: React.FC<Props> = ({ type, getProducts }) => {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<Tablet[] | Accessorie[] | Phone[]>(
    [],
  );
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    async function loadProducts() {
      setLoader(true);

      try {
        const result = await getProducts();

        setProducts(result);
      } catch (err) {
        throw err;
      } finally {
        setLoader(false);
      }
    }

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loader ? (
        <span className="container">
          <div className={styles.icons}>
            <Link to="/">
              <img
                className={styles.icon}
                src="public/img/icons/Home.svg"
                alt="Home Icon"
              />
            </Link>
            <img
              className={styles.icon}
              src="public/img/icons/Chevron (Arrow Right).svg"
              alt="arrow"
            />
            <p className="small--text" style={{ color: '#89939A' }}>
              {capitalize(type)}
            </p>
          </div>
          <h1 style={{ marginBottom: '8px' }}>{capitalize(type)}</h1>
          <p className={styles.modelsNumber}>{products.length} models</p>
          {products.length > 0 ? (
            <ProductsList type={type} />
          ) : (
            <h2>There are no {type} yet...</h2>
          )}
        </span>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CategoryPage;
