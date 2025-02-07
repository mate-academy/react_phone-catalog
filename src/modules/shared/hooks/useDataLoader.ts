import { useLanguage } from '../components/Contexts/LanguageContext';
import { wait } from '../functions';
import { LoadingStatus } from '../types/enums';
import { useCallback, useEffect, useState } from 'react';

export const useDataLoader = <Item>(
  filePath?: string,
): [Item[], LoadingStatus, number | undefined, () => void] => {
  const [loadingStatus, setLoadingStatus] = useState(
    filePath ? LoadingStatus.Loading : LoadingStatus.Idle,
  );
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined,
  );
  const [loadedData, setLoadedData] = useState<Item[]>([]);
  const { language } = useLanguage();

  type ItemWithLocales = Item & {
    locales: { [key: string]: Partial<Item> };
  };

  const translateItems = useCallback(
    (items: ItemWithLocales[]): Item[] => {
      return items.map(item => {
        const { locales, ...rest } = item;

        if (locales) {
          const translatedValues = locales[language];
          const originalValues = { ...rest } as Item;

          return {
            ...originalValues,
            ...translatedValues,
          };
        }

        return item;
      });
    },
    [language],
  );

  const loadItems = useCallback(async () => {
    setLoadingStatus(LoadingStatus.Loading);
    setResponseStatus(undefined);

    if (filePath) {
      try {
        await wait(2000);
        const response = await fetch(filePath);

        if (!response.ok) {
          setResponseStatus(response.status);
          throw new Error();
        }

        const loadedItems = await response.json();

        setLoadedData(translateItems(loadedItems));

        if (loadedItems.length) {
          setLoadingStatus(LoadingStatus.Success);
        } else {
          setLoadingStatus(LoadingStatus.NoData);
        }
      } catch {
        setLoadingStatus(LoadingStatus.Error);
      }
    } else {
      setLoadingStatus(LoadingStatus.Idle);
    }
  }, [filePath, translateItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return [loadedData, loadingStatus, responseStatus, loadItems];
};
