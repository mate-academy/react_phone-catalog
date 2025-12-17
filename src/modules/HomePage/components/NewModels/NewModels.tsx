import { useEffect, useMemo, useState } from 'react';
import { Carusel } from '@GlobalComponents';
import { getData } from '@Fetch';
import { Products } from 'src/types/products';
import { useTranslation } from 'react-i18next';

type Props = {
  onSetError: (e: boolean) => void;
};

export const NewModels: React.FC<Props> = ({ onSetError }) => {
  const [newModel, setNewModel] = useState<Products[]>([]);
  const [typeProducts, setTypeProducts] = useState<string>('');

  const newModels = useMemo(
    () => [
      'iPhone 14',
      'iPhone 14 pro',
      'Apple iPhone 13',
      'Apple iPhone 13 Pro',
      'Apple iPhone 13 Pro Max',
    ],
    [],
  );

  useEffect(() => {
    onSetError(false);

    getData<Products[]>('/products')
      .then((products: Products[]) => {
        const filtered = products.filter(
          item =>
            item.category === 'phones' &&
            newModels.some(model => item.name.includes(model)),
        );

        const uniqueByColor = filtered.filter((item, index, arr) => {
          return arr.findIndex(el => el.color === item.color) === index;
        });

        setNewModel(
          uniqueByColor.sort(a => (a.name.includes('iPhone 13 Pro') ? -1 : 1)),
        );
        setTypeProducts('phones');
      })
      .catch(error => {
        onSetError(true);

        throw error;
      });
  }, [newModels, onSetError]);

  const { t } = useTranslation();

  const title = t('carusel.newModels');

  return (
    <section className="section">
      <div className="container">
        <Carusel type={typeProducts} data={newModel} title={title} />
      </div>
    </section>
  );
};
