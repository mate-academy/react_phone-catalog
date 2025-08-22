import { get } from '@shared/api/';
import { BannerData, CatalogueProduct } from '@shared/types/APIReturnTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Conf, ErrorState, LoadState } from '../types';
import { DATA_LOAD_CONFIGS } from '../config';

export const useHomePage = () => {
  const [loading, setLoading] = useState<LoadState>({
    banners: true,
    newest: true,
    hotPrice: true,
  });
  const [errors, setErrors] = useState<ErrorState>({
    banners: null,
    newest: null,
    hotPrice: null,
  });
  const failCount = {
    banner: useRef<number>(0),
    newest: useRef<number>(0),
    hotPrice: useRef<number>(0),
  };
  const [newest, setNewest] = useState<CatalogueProduct[] | null>(null);
  const [hotPrice, setHotPrice] = useState<CatalogueProduct[] | null>(null);
  const [bannerList, setBannerList] = useState<BannerData[] | null | undefined>(
    null,
  );

  const loadCatalogs = async (conf: Conf) => {
    const { key, getter, setter } = conf;

    try {
      const resp = await getter();

      setter(resp.data);
    } catch (e) {
      setErrors(prev => ({
        ...prev,
        [key]: e instanceof Error ? e.message : `Failed to load ${key}`,
      }));
    } finally {
      setLoading(prev => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  const loadBanners = async () => {
    try {
      const banners = await get.banners();

      setBannerList(banners);
      failCount.banner.current = 0;
    } catch (e) {
      if (failCount.banner.current < 3) {
        failCount.banner.current += 1;
        await new Promise(resolve =>
          setTimeout(resolve, 1000 * failCount.banner.current),
        );

        return loadBanners();
      } else {
        setBannerList(undefined);
      }
    }
  };

  const loadAllData = useCallback(async () => {
    await Promise.all([
      loadCatalogs({ ...DATA_LOAD_CONFIGS.NEWEST, setter: setNewest }),
      loadCatalogs({ ...DATA_LOAD_CONFIGS.HOT_PRICE, setter: setHotPrice }),
      loadBanners(),
    ]);
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return { loading, newest, hotPrice, bannerList, errors };
};
