import React from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Breadcrumbs.module.scss";

type Props = {
  productName?: string;
  pageName?: string;
};

//FIX COMPONENT
export const Breadcrumbs: React.FC<Props> = ({ productName, pageName }) => {
  const { productId } = useParams();
  const { categoryName } = useParams();

  //fix length LinkName
  const normalizeLinkName =
    categoryName &&
    categoryName?.charAt(0).toUpperCase() + categoryName.slice(1);

  const normalizePageName = pageName && pageName?.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className={styles.catalogBreadcrumbs}>
      <Link className={styles.catalogBreadcrumbsLink} to={"/"}>
        <img src="src/assets/icons/icon-home.svg" alt="Icon Home" />
      </Link>
      <div className={styles.catalogBreadcrumbsImage}>
        <img src="src/assets/icons/arrow-right-gray.svg" alt="Arrow Right" />
      </div>
      <Link
        to={`/${pageName ? pageName : categoryName}`}
        className={styles.catalogBreadcrumbsCategoryName}
      >
        {normalizeLinkName ? normalizeLinkName : normalizePageName}
      </Link>
      {productId && (
        <>
          <div className={styles.catalogBreadcrumbsImage}>
            <img
              src="src/assets/icons/arrow-right-gray.svg"
              alt="Arrow Right"
            />
          </div>
          <Link
            to={`/${categoryName}/${productId}`}
            className={styles.catalogBreadcrumbsCategoryName}
          >
            {productName}
          </Link>
        </>
      )}
    </div>
  );
};
