import { useEffect, useState } from 'react';
import styles from './SuggestedProducts.module.scss';
import { ProductInfo } from '../../../../types/ProductInfo';
import { DataTypes, getData } from '../../../../utils/ApiClient';
// eslint-disable-next-line max-len
import { ProductsCarousel } from '../../../../shared/components/ProductsCarousel/ProductsCarousel';
import { Product } from '../../../../types/Product';
import { Loader } from '../../../../shared/components/Loader/Loader';

type Props = {
  product: ProductInfo;
};

function prepareSuggestedProducts(list: Product[]) {
  const readyList: Product[] = [];
  let operatingList = [...list];

  while (readyList.length < 10) {
    const randomIndex = Math.floor(Math.random() * operatingList.length);

    readyList.push(operatingList[randomIndex]);
    operatingList = operatingList.filter(item => !readyList.includes(item));
  }

  return readyList;
}

export const SuggestedProducts: React.FC<Props> = ({ product }) => {
  const { id, category } = product;
  const [isLoading, setIsloading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  if (!suggestedProducts.length && !!products.length) {
    setSuggestedProducts(prepareSuggestedProducts(products));
  }

  useEffect(() => {
    setIsloading(true);

    getData(DataTypes.products)
      .then(items =>
        setProducts(
          items.filter(
            (item: Product) => item.itemId !== id && item.category === category,
          ),
        ),
      )
      .finally(() => setIsloading(false));
  }, [category, id]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductsCarousel
          products={suggestedProducts}
          isDiscountRequired={true}
          sectionTitle="You may also like"
        />
      )}
    </div>
  );
};
