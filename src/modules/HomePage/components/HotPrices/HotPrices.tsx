import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { getNewModels, getProducts } from '../../../../utils/api';
import { ProductCarousel } from '../../../shared/components/ProductCarousel';
import { PhoneCard } from '../../../shared/components/PhoneCard/PhoneCard';
import styles from './HotPrices.module.scss';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer => {
      setProducts(getNewModels('phones', productsFromServer));
    });
  }, []);

  const getHottestProducts = () => {
    const phones = products
      .filter(product => product.category === 'phones')
      .sort((phone1: Product, phone2: Product) => {
        const discount1 = Number(phone1.fullPrice) - Number(phone1.price);
        const discount2 = Number(phone2.fullPrice) - Number(phone2.price);

        return discount2 - discount1;
      });

    return phones;
  };

  return (
    <section className={styles.section}>
      <ProductCarousel title="Hot prices">
        {getHottestProducts().map(phone => (
          <PhoneCard key={phone.id} product={phone} isOldPriceVisible={true} />
        ))}
      </ProductCarousel>
    </section>
  );
};
