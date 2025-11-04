import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../shared/api/products';
import type { ProductListItem } from '../../shared/api/types';
import { PictureSlider } from '../../shared/components/PictureSlider';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { ShopByCategory } from '../../shared/components/ShopByCategory';

import img1 from '../../assets/picture-slider-1.webp';
import img2 from '../../assets/picture-slider-2.png';
import img3 from '../../assets/picture-slider-3.png';

const heroImages = [img1, img2, img3];

export const HomePage = () => {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const hot = useMemo(() => {
    return [...items]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 16);
  }, [items]);

  const brandNew = useMemo(() => {
    return [...items]
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, 16);
  }, [items]);

  return (
    <div>
      <h1 style={{ position: 'absolute', left: -9999 }}>Product Catalog</h1>

      <PictureSlider images={heroImages} />

      {loading ? (
        <div>Loading…</div>
      ) : (
        <>
          <ProductsSlider title="Brand new" items={brandNew} priceMode="full" />

          <ShopByCategory />

          <ProductsSlider title="Hot prices" items={hot} priceMode="discount" />
        </>
      )}
    </div>
  );
};
