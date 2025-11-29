/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { AccessoriesModel, PhoneModel, TabletModel } from '../../types/model';
import { getAccessories, getPhones, getProducts, getTablets } from '../../api';
import { useParams } from 'react-router-dom';
import { ItemSection } from './Sections/ItemSection';
import { ItemsSlider } from '../../components/ItemsSlider';
import { PageTop } from '../../components/PageTop';
import Loader from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Product } from '../../types/products';
import img from '../../../public/img/product-not-found.png';
import styles from './ItemPage.module.scss';

interface Props {
  kindOfModel: 'phones' | 'tablets' | 'accessories';
  category: 'Phones' | 'Tablets' | 'Accessories';
}

export const ItemPage: React.FC<Props> = ({ kindOfModel, category }) => {
  const { modelId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const loadCards = [0, 0, 0, 0];

  // Список всіх моделей даної категорії
  const [currentModels, setCurrentModels] = useState<PhoneModel[] | TabletModel[] | AccessoriesModel[]>([]);

  // Конкретна вибрана модель
  const [model, setModel] = useState<PhoneModel | TabletModel | AccessoriesModel | null>(null);

  const [youMayLikeModels, setYouMayLikeModels] = useState<PhoneModel[] | TabletModel[] | AccessoriesModel[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shuffleArray = (arr: any[]): any[] => {
    const newArr = [...arr];

    return newArr
      .map(value => [Math.random(), value])
      .sort()
      .map(value => value[1]);
  };

  useEffect(() => {
    const productData = getProducts();

    productData
      .then(product => {
        setProducts(product);
      })
      // eslint-disable-next-line prettier/prettier
      .catch(() => {
        setError('Something went wrong ');
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data: PhoneModel[] | TabletModel[] | AccessoriesModel[] = [];

        switch (category) {
          case 'Phones':
            data = await getPhones();
            break;
          case 'Tablets':
            data = await getTablets();
            break;
          case 'Accessories':
            data = await getAccessories();
            break;
        }

        setCurrentModels(data);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong ');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);
  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'instant',
    });
    if (currentModels.length > 0 && modelId) {
      const found = currentModels.find(p => p.id === modelId);

      if (found) {
        setModel(found);
      } else {
        setModel(null);
      }
    }
  }, [modelId, currentModels]);

  useEffect(() => {
    if (currentModels.length > 0) {
      const youMayLike = shuffleArray(currentModels);

      setYouMayLikeModels(youMayLike);
    }
  }, [currentModels]);

  const titleText = useMemo(() => {
    if (model) {
      return model.name;
    }

    if (modelId) {
      const returned = modelId;

      return returned
        .split('-')
        .map(word => {
          if (/^\d+(gb|tb|mb)$/i.test(word)) {
            return word.toUpperCase();
          }

          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }

    return '';
  }, [modelId, model]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage errorMessage={error} />
      ) : !model ? (
        <div className={styles.notfound__model}>
          <h1>Model not found</h1>
          <img src={img} alt="" width={300} height={200} />
        </div>
      ) : (
        <>
          <PageTop
            back={true}
            titleText={titleText}
            titleLevel="2"
            itemsContent={false}
          />
          <ItemSection
            key={model.id}
            model={model}
            kindOfModel={kindOfModel}
            category={category}
            currentModels={currentModels}
            products={products}
          />

          <ItemsSlider
            kindOfModel={kindOfModel}
            models={youMayLikeModels}
            title="You may also like"
            isLoading={isLoading}
            loaderCards={loadCards}
          />
        </>
      )}
    </>
  );
};
