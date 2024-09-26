import React, { useEffect, useState, useContext } from 'react';

import styles from './PhonesPage.module.scss';
import { ProductsMain } from '../../components/ProductsMain/ProductsMain';
import { Link } from 'react-router-dom';
import { RoutesPathes } from '../../utils/RoutesPathes';
import { useParams } from 'react-router-dom';
import { getPhones, getProducts } from '../../api/api';
import { ProductTypeExtended } from '../../api/type/ProductTypeExtended';
import { ItemDescription } from '../../components/ItemDescription/ItemDescription';
import { Loader } from '../../components/Loader';
import { ProductCategories } from '../../utils/ProductCategories';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';
import { ProductType } from '../../api/type/ProductType';
import { getRecommendedPhones } from '../../api/function';
import { useTranslation } from 'react-i18next';
//import { Skeleton } from '../../components/Skeleton/Skeleton';

export const PhonesPage: React.FC = () => {
  const { theme } = useContext(FavoritesContext);
  const { phonesId } = useParams<{ phonesId: string }>();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [phone, setPhone] = useState<ProductTypeExtended[]>([]);
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPhones, setRecommendedPhones] = useState<ProductType[]>([]);
  const { t } = useTranslation();

  const linkClassName = phonesId ? styles.pageNameActive : styles.pageName;

  

  useEffect(() => {
    setIsLoading(true);
    getPhones()
      .then((productsFromServer) => {
        const neededProduct = productsFromServer.filter((phone) => phone.id === phonesId);
        neededProduct.map((phone) => {
          const name = phone.color;
          setSelectedColor(name);
          const capacity = phone.capacity;
          setSelectedButton(capacity);
          const img = phone.images[0];
          setSelectedImg(img);
        });
        setPhone(neededProduct);
      })
      .finally(() => setIsLoading(false));
  }, [phonesId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data: ProductType[] = await getProducts();
        setPhones(data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = getRecommendedPhones(phones);
    setRecommendedPhones(result);
  }, [phones]);

  return (
    <>
      {phonesId ? (
        <>
          {isLoading && !phonesId ? (
            <Loader />
          ) : (
            <>
              {phone.map((phone) => (
                <main key={phone.id} className={styles.main}>
                  <div className={styles.main__content}>
                    <ItemDescription
                      phone={phone}
                      selectedColor={selectedColor}
                      selectedButton={selectedButton}
                      selectedImg={selectedImg}
                      setSelectedColor={setSelectedColor}
                      setSelectedButton={setSelectedButton}
                      setSelectedImg={setSelectedImg}
                      recommendedPhones={recommendedPhones}
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
            <Link to={RoutesPathes.PHONES} className={linkClassName}>
              {t('phones')}
            </Link>
            {phonesId && (
              <>
                <i className={styles.arrow}></i>
                <p className={styles.pageName}>{phonesId}</p>
              </>
            )}
          </div>
          <ProductsMain pageLabel="Phones" productsCategory={ProductCategories.PHONES} />
        </div>
      )}
      {/* <Skeleton /> */}
    </>
  );
};
