import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { AllProduct } from '../../types/UnionType';
import { Phone } from '../../types/Phone';
import { Accessoirs } from '../../types/Accesories';
import { Tables } from '../../types/Tablets';

import styles from './ItemPage.module.scss';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductSlider } from '../../components/ProductsSlider';
import { PhotoSlider } from '../../components/PhotoSlider';
import { OrderProps } from '../../components/OrderProps';
import { About } from '../../components/About';
import { Tech } from '../../components/Tech';

import notFoundImg from '../../../public/img/product-not-found.png';
import { WentWrong } from '../../components/WentWrong';

export const ItemPage: React.FC = () => {
  const [card, setCard] = useState<Phone | Accessoirs | Tables | null>(null);
  const [prods, setProds] = useState<(Phone | Accessoirs | Tables)[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { category, itemName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    fetch(`/react_phone-catalog/api/${category}.json`)
      .then(response => response.json())
      .then(data => {
        setCard(
          data.find(
            (a: AllProduct) =>
              a.name.toLowerCase() === itemName?.replaceAll('_', ' '),
          ),
        );
        setProds(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, [category, itemName]);

  const getRecomandation = () => {
    const shuffled = prods.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, Math.min(20, prods.length));
  };

  const handleColorChange = (color: string) => {
    const newCard = prods.find(
      pr =>
        pr.namespaceId === card?.namespaceId &&
        color === pr.color &&
        card.capacity === pr.capacity,
    );

    navigate(
      `/${newCard?.category}/${newCard?.name.split(' ').join('_').toLowerCase()}`,
    );
  };

  const handleCapacityChange = (capacity: string) => {
    const newCard = prods.find(
      pr =>
        pr.namespaceId === card?.namespaceId &&
        capacity === pr.capacity &&
        card.color === pr.color,
    );

    navigate(
      `/${newCard?.category}/${newCard?.name.split(' ').join('_').toLowerCase()}`,
    );
  };

  return (
    <div className={styles.itemPage}>
      {!error && !loader && card === undefined && (
        <div className={styles.itemPage__notFount}>
          <div className={styles.itemPage__notFountContain}>
            <h1>Item Not Found</h1>
            <Link to={`/${category}`} className={styles.itemPage__notFountLink}>
              <h3 className={styles.itemPage__notFountText}>
                {`Redirect to ${category}`}
              </h3>
            </Link>
          </div>
          <img
            src={notFoundImg}
            alt="Not found"
            className={styles.itemPage__notFountImg}
          />
        </div>
      )}
      {!error && (loader || card) && (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className={styles.itemPage__navBlock}>
            <Breadcrumbs />
            <BackButton />
          </div>
          <h2 className={styles.itemPage__title}>{card?.name}</h2>
          <div className={styles.itemPage__mainSection}>
            {card ? (
              <PhotoSlider photos={card.images} />
            ) : (
              <Skeleton className={styles.itemPage__skeletonImg} />
            )}
            <OrderProps
              card={card}
              handleColorChange={handleColorChange}
              handleCapacityChange={handleCapacityChange}
            />
          </div>
          <div className={styles.itemPage__moreSection}>
            <About card={card} />
            <Tech card={card} />
          </div>
          <ProductSlider
            title="You may also like"
            products={getRecomandation()}
            showSale={true}
          />
        </SkeletonTheme>
      )}
      {error && <WentWrong />}
    </div>
  );
};
