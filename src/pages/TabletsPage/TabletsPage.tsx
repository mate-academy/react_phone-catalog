import React, { useContext, useState, useEffect } from 'react';
import styles from './TabletsPage.module.scss';
import { ProductsMain } from '../../components/ProductsMain/ProductsMain';
import { Link } from 'react-router-dom';
import { RoutesPathes } from '../../utils/RoutesPathes';
import { ProductCategories } from '../../utils/ProductCategories';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';
import { ProductType } from '../../api/type/ProductType';
import { useParams } from 'react-router-dom';
import { getTablets, getProducts } from '../../api/api';
import { ProductTypeExtended } from '../../api/type/ProductTypeExtended';
import { ItemDescription } from '../../components/ItemDescription/ItemDescription';
import { Loader } from '../../components/Loader';
import { useTranslation } from 'react-i18next';
import { getRecommendedTablets } from '../../api/function';

export const TabletsPage: React.FC = () => {
  const { theme } = useContext(FavoritesContext);
  const { tabletsId } = useParams<{ tabletsId: string }>();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [tablet, setTablet] = useState<ProductTypeExtended[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const linkClassName = tabletsId ? styles.pageNameActive : styles.pageName;

  useEffect(() => {
    setIsLoading(true);
    getTablets()
      .then((productsFromServer) => {
        const neededProduct = productsFromServer.filter(
          (tablet) => tablet.id === tabletsId,
        );
        neededProduct.map((tablet) => {
          const name = tablet.color;
          setSelectedColor(name);
          const capacity = tablet.capacity;
          setSelectedButton(capacity);
          const img = tablet.images[0];
          setSelectedImg(img);
        });
        setTablet(neededProduct);
      })
      .finally(() => setIsLoading(false));
  }, [tabletsId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data: ProductType[] = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const recommendedTablets = getRecommendedTablets(products);
  const { t } = useTranslation();

  return (
    <>
      {tabletsId ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {tablet.map((tablet) => (
                <main key={tablet.id} className={styles.main}>
                  <div className={styles.main__content}>
                    <ItemDescription
                      phone={tablet}
                      selectedColor={selectedColor}
                      selectedButton={selectedButton}
                      selectedImg={selectedImg}
                      setSelectedColor={setSelectedColor}
                      setSelectedButton={setSelectedButton}
                      setSelectedImg={setSelectedImg}
                      recommendedPhones={recommendedTablets}
                    />
                  </div>
                </main>
              ))}
            </>
          )}
        </>
      ) : (
        <div className={styles.pagesContainer}>
          <div className={styles.route}>
            <Link
              to={RoutesPathes.HOME}
              className={classNames(styles.home, {
                [styles.dark]: theme === 'dark',
              })}
            />

            <i className={styles.arrow}></i>
            <Link to={RoutesPathes.TABLETS} className={linkClassName}>
            {t('tablets')}
            </Link>
          </div>
          <ProductsMain pageLabel="Tablets" productsCategory={ProductCategories.TABLETS} />
        </div>
      )}
    </>
  );
};
