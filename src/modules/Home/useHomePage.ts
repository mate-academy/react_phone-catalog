import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../types/ContextProps';

export const useHomePage = () => {
  const { categories, products } = useOutletContext<ContextProps>();

  const banners = useMemo(
    () =>
      categories.map(c => ({
        img: c.banner,
        link: c.path,
        alt: c.bannerAlt,
      })),
    [categories],
  );

  const newModels = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year).slice(0, 12);
  }, [products]);

  const hotPrices = useMemo(() => {
    return [...products]
      .filter(p => p.fullPrice - p.price > 0)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 12);
  }, [products]);

  return { banners, newModels, hotPrices };
};
