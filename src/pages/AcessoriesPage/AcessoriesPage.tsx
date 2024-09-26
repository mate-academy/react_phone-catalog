import React, { useEffect, useState, useContext } from 'react';
import styles from './AcessoriesPage.module.scss';
import { ProductsMain } from '../../components/ProductsMain/ProductsMain';
import { Link } from 'react-router-dom';
import { RoutesPathes } from '../../utils/RoutesPathes';
import { ProductCategories } from '../../utils/ProductCategories';
import classNames from 'classnames';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductType } from '../../api/type/ProductType';
import { getRecommendedAccessories } from '../../api/function';
import { useParams } from 'react-router-dom';
import { getAccessories, getProducts } from '../../api/api';
import { ProductTypeExtended } from '../../api/type/ProductTypeExtended';
import { ItemDescription } from '../../components/ItemDescription/ItemDescription';
import { Loader } from '../../components/Loader';
import { useTranslation } from 'react-i18next';

export const AccessoriesPage: React.FC = () => {
  const { theme } = useContext(FavoritesContext);
  const { accessoriesId } = useParams<{ accessoriesId: string }>();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [accessory, setAccessory] = useState<ProductTypeExtended[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const linkClassName = accessoriesId ? styles.pageNameActive : styles.pageName;

  useEffect(() => {
    setIsLoading(true);
    getAccessories()
      .then((productsFromServer) => {
        const neededProduct = productsFromServer.filter(
          (accessory) => accessory.id === accessoriesId,
        );
        neededProduct.map((accessory) => {
          const name = accessory.color;
          setSelectedColor(name);
          const capacity = accessory.capacity;
          setSelectedButton(capacity);
          const img = accessory.images[0];
          setSelectedImg(img);
        });
        setAccessory(neededProduct);
      })
      .finally(() => setIsLoading(false));
  }, [accessoriesId]);

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

  const recommendedAccessories = getRecommendedAccessories(products);
  const { t } = useTranslation();

  console.log(recommendedAccessories);
  

  return (
    <>
      {accessoriesId ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {accessory.map((accessory) => (
                <main key={accessory.id} className={styles.main}>
                  <div className={styles.main__content}>
                    <ItemDescription
                      phone={accessory}
                      selectedColor={selectedColor}
                      selectedButton={selectedButton}
                      selectedImg={selectedImg}
                      setSelectedColor={setSelectedColor}
                      setSelectedButton={setSelectedButton}
                      setSelectedImg={setSelectedImg}
                      recommendedPhones={recommendedAccessories}
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
            <Link to={RoutesPathes.ACCESSORIES} className={linkClassName}>
              {t('accessories')}
            </Link>
            {accessoriesId && (
              <>
                <i className={styles.arrow}></i>
                <p className={styles.pageName}>{accessoriesId}</p>
              </>
            )}
          </div>
          <ProductsMain pageLabel="Accessories" productsCategory={ProductCategories.ACCESSORIES} />
        </div>
      )}
    </>
  );
};
