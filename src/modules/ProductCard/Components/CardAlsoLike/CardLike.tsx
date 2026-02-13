import { getData } from '@Fetch';
import { Carusel } from '@GlobalComponents';

import { useEffect, useState } from 'react';
import { Products } from 'src/types/products';

import { shuffle } from '../../../../utils/shuffleArray';
import { useTranslation } from 'react-i18next';

const CardLike = () => {
  const [shuffledProducts, setShuffledProducts] = useState<Products[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataApi = await getData<Products[]>('/products');
        const resultDataApi = shuffle(dataApi);

        if (!resultDataApi) {
          return;
        }

        setShuffledProducts(resultDataApi);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  return <Carusel data={shuffledProducts} title={t('carusel.alsoLike')} />;
};

export default CardLike;
