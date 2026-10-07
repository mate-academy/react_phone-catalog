import { useContext, useEffect, useMemo, useState } from 'react';
import { AccessoriesModel, PhoneModel, TabletModel } from '../../types/model';
import { getAccessories, getPhones, getTablets } from '../../api';
import { useParams } from 'react-router-dom';
import { ItemSection } from './Sections/ItemSection';
import { ItemsSlider } from '../../components/ItemsSlider';
import { PageTop } from '../../components/PageTop';
import { ItemDetailsSkeleton } from '../../components/ItemDetailsSkeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ProductsContext } from '../../contexts/ProductsContext';
import styles from './ItemPage.module.scss';

interface Props {
  kindOfModel: 'phones' | 'tablets' | 'accessories';
  category: 'Phones' | 'Tablets' | 'Accessories';
}

type CatalogItem = PhoneModel | TabletModel | AccessoriesModel;

export const ItemPage: React.FC<Props> = ({ kindOfModel, category }) => {
  const { modelId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { products } = useContext(ProductsContext);

  const loadCards = [0, 0, 0, 0];

  const [currentModels, setCurrentModels] = useState<CatalogItem[]>([]);
  const [model, setModel] = useState<CatalogItem | null>(null);
  const [youMayLikeModels, setYouMayLikeModels] = useState<CatalogItem[]>([]);

  const shuffleArray = <T,>(arr: T[]): T[] => {
    const newArr = [...arr];

    return newArr
      .map(value => [Math.random(), value] as const)
      .sort()
      .map(value => value[1]);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
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
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    window.scrollTo({
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
      return modelId
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

  const productNotFoundImg = `${import.meta.env.BASE_URL}img/product-not-found.png`;

  return (
    <>
      {isLoading ? (
        <ItemDetailsSkeleton />
      ) : error ? (
        <ErrorMessage errorMessage={error} />
      ) : !model ? (
        <div className={styles.notfound__model}>
          <h1>Model not found</h1>
          <img
            src={productNotFoundImg}
            alt="Product not found"
            width={300}
            height={200}
          />
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
