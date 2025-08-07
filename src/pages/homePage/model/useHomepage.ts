import { BannerData } from '@entities/bannerSlide/types/bannerSlide';
import { get } from '@shared/api/';
import { BaseProduct } from '@shared/types/APIReturnTypes';
import { useCallback, useEffect, useState } from 'react';
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
  const [newest, setNewest] = useState<BaseProduct[] | null>(null);
  const [hotPrice, setHotPrice] = useState<BaseProduct[] | null>(null);
  const [bannerList, setBannerList] = useState<BannerData[] | null>(null);

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
    } catch (e) {
      setErrors(prev => ({
        ...prev,
        banners: e instanceof Error ? e.message : 'Failed to load banners',
      }));
    } finally {
      setLoading(prev => ({
        ...prev,
        banners: false,
      }));
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
