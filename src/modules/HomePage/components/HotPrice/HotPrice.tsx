import { getData } from '@Fetch';
import { Carusel } from '@GlobalComponents';
import { useEffect, useState } from 'react';
import { Products } from 'src/types/products';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const HotPrice = () => {
  const [hotPrice, setHotPrice] = useState<Products[]>([]);

  useEffect(() => {
    getData<Products[]>('/products').then((products: Products[]) => {
      const grouped: Record<string, Products[]> = {};
      const result: Products[] = [];

      for (const product of products) {
        if (product.year >= 2019) {
          if (!grouped[product.category]) {
            grouped[product.category] = [];
          }

          grouped[product.category].push(product);
        }
      }

      for (const category in grouped) {
        const items = grouped[category]
          .slice(0, 9)
          .filter((item, index, arr) => {
            return arr.findIndex(el => el.color === item.color) === index;
          });

        result.push(...items);
      }

      result.sort((a, b) => b.fullPrice - a.fullPrice);

      setHotPrice(result);
    });
  }, []);

  const { t } = useTranslation();

  return (
    <div className="section">
      <div className="container">
        <ToastContainer />
        <Carusel data={hotPrice} title={t('carusel.hotPrice')} />
      </div>
    </div>
  );
};
