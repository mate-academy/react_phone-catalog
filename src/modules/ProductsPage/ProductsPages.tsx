import styles from './ProductsPages.module.scss';
import { BreadCrumbs } from '../shared/componets/Breadcrumbs/Breadcrumbs';
import { useProducts } from '../shared/Utills/ProductContext/ProductContext';
import { ProductList } from '../shared/componets/ProductList/ProductList';
import { useParams, useSearchParams } from 'react-router-dom';
import { Sort } from './Sort/Sort';
import { Pagination } from './Pagination/Pagination';
import { useMemo } from 'react';

export const ProductsPages = () => {
  const [searchParams] = useSearchParams();

  const { category } = useParams();
  const { products } = useProducts();

  const getTitle = () => {
    if (category === 'phones') {
      return 'Mobile phones';
    }

    if (category === 'tablets') {
      return 'Tablets';
    }

    if (category === 'accessories') {
      return 'Accesories';
    }
  };

  const sortParams = String(searchParams.get('sort')) || null;

  const productsToRender = useMemo(() => {
    const selectedCategory =
      products.products?.filter(prod => prod.category === category) ?? [];

    if (!sortParams) {
      return selectedCategory;
    }

    switch (sortParams) {
      case 'Newest':
        return [...selectedCategory].sort(
          (prod1, prod2) => prod2.year - prod1.year,
        );

      case 'Cheapest':
        return [...selectedCategory].sort((prod1, prod2) => {
          const discount1 = prod1.fullPrice - prod1.price;
          const discount2 = prod2.fullPrice - prod2.price;

          return discount2 - discount1;
        });

      case 'Alfabetical':
        return [...selectedCategory].sort((prod1, prod2) =>
          prod1.name.localeCompare(prod2.name),
        );

      default:
        return selectedCategory;
    }
  }, [category, sortParams, products.products]);

  const currentPage = Number(searchParams.get('page')) || 1;
  const elementOnPage =
    Number(searchParams.get('perPage')) || productsToRender.length;

  const lastProductIndex = currentPage * elementOnPage;
  const firstProductIndex = lastProductIndex - elementOnPage;
  const current = productsToRender?.slice(firstProductIndex, lastProductIndex);

  return (
    <div className={styles.phones__page}>
      <BreadCrumbs />

      <div className={styles.info}>
        <h1>{getTitle()}</h1>
        <p>{(productsToRender?.length ?? 0) - 1} models</p>
      </div>

      <Sort />

      <ProductList products={current} hasDiscount={true} />

      <Pagination
        elementOnPage={elementOnPage}
        total={productsToRender?.length}
      />
    </div>
  );
};
