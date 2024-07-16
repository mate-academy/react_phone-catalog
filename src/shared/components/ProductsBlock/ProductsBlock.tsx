import { useEffect, useState } from 'react';
import styles from './ProductsBlock.module.scss';
import { Product } from '../../../types/Product';
import { useSearchParams } from 'react-router-dom';
import { SortBy, SortingSettings } from '../SortingSettings/SortingSettings';
import { DataTypes, getData } from '../../../utils/ApiClient';
import { Loader } from '../Loader/Loader';
import { ProductsTitleBlock } from '../ProductsTitleBlock/ProductsTitleBlock';
import { ProductsTable } from '../ProductsTable/ProductsTable';
import { PagesPanel } from '../PagesPanel/PagesPanel';
import { ProductsCategories } from '../../../types/ProductsCategories';
import { ReloadButton } from '../ReloadButton/ReloadButton';

type Props = {
  title: string;
  categoryName: string;
  productCategory: ProductsCategories;
};

export const ProductsBlock: React.FC<Props> = ({
  title,
  categoryName,
  productCategory,
}) => {
  const [isLoading, setIsloading] = useState(true);
  const [isLoadingError, setIsloadingError] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || '';
  const perPage = searchParams.get('perPage') || '';
  const page = searchParams.get('page') || '';

  const preparedList = () => {
    const list = [...productsList];

    if (sortBy) {
      switch (sortBy) {
        case SortBy.age:
          list.sort((item1, item2) => item2.year - item1.year);
          break;
        case SortBy.title:
          list.sort((item1, item2) => item1.name.localeCompare(item2.name));
          break;
        case SortBy.price:
          list.sort((item1, item2) => item1.price - item2.price);
          break;
      }
    }

    if (perPage) {
      let endIndex = +perPage;

      if (page) {
        if (+page > 1) {
          endIndex *= +page;
        }

        if (endIndex > list.length - 1) {
          endIndex = list.length - 1;
        }

        return list.slice((+page - 1) * +perPage, endIndex);
      } else {
        return list.slice(0, endIndex);
      }
    }

    return list;
  };

  const isPagesRequired = productsList.length !== preparedList().length;

  useEffect(() => {
    setIsloading(true);

    getData(DataTypes.products)
      .then(items =>
        setProductsList(
          items.filter((item: Product) => item.category === productCategory),
        ),
      )
      .catch(() => setIsloadingError(true))
      .finally(() => setTimeout(() => setIsloading(false), 600));
  }, [productCategory]);

  return (
    <section className={styles.mainContainer}>
      {isLoading && <Loader />}

      {isLoadingError && <ReloadButton />}

      {!productsList.length && !isLoadingError && !isLoading && (
        <ProductsTitleBlock
          category={categoryName}
          title={`There are no ${productCategory} yet`}
          quantity={productsList.length}
        />
      )}

      {!isLoading && !isLoadingError && !!productsList.length && (
        <>
          <ProductsTitleBlock
            category={categoryName}
            title={title}
            quantity={productsList.length}
          />

          <SortingSettings />

          <ProductsTable products={preparedList()} />

          {isPagesRequired && (
            <PagesPanel
              pages={Math.ceil(productsList.length / Number(perPage))}
            />
          )}
        </>
      )}
    </section>
  );
};
