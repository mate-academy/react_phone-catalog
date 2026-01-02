import React from 'react';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { Footer } from '../../shared/Footer';
import { Header } from '../../shared/Header';
import styles from './ProductDetailsPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
// import apiPhones from '../../../../public/api/phones.json';
// import apiTablets from '../../../../public/api/tablets.json';
// import apiAccessories from '../../../../public/api/accessories.json';

// const apiCategoryMap = {
//   phones: apiPhones,
//   tablets: apiTablets,
//   accessories: apiAccessories,
// } as const;

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  //   if (!productId) {
  //     return null;
  //   }

  //   const summary = productsApi.find(
  //     (p: ProductType) => String(p.id) === productId || p.itemId === productId,
  //   );

  //   if (!summary) {
  //     return null;
  //   }

  //   const categoryKey = summary.category as keyof typeof apiCategoryMap;
  //   const categoryList = apiCategoryMap[categoryKey] as unknown as
  //     | ProductType[]
  //     | undefined;

  //   if (!categoryList) {
  //     return summary;
  //   }

  //   const detail = categoryList.find(
  //     (d: ProductType) =>
  //       d.id === +summary.itemId ||
  //       d.itemId === productId ||
  //       d.itemId === summary.itemId,
  //   );

  //   return detail ?? summary;
  // };

  return (
    <>
      <Header />
      <Breadcrumbs category={category || ''} productId={productId || ''} />
      <div className={styles.productdetailspage}>
        <button
          className={styles.productdetailspage__backbutton}
          onClick={() => navigate(-1)}
        >
          <img
            className={styles.productdetailspage__backbutton__icon}
            src="/public/img/icons/icon-chevron-arrow-left.png"
            alt=""
          />
          <p className={styles.productdetailspage__backbutton__text}>Back</p>
        </button>
      </div>
      <Footer />
    </>
  );
};
