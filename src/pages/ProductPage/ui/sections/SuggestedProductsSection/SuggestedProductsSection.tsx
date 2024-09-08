import { memo, useEffect, useState } from 'react';
import { Section } from '../../../../../shared/ui/Section';
import { ProductsSlider } from '../../../../../features/ProductsSlider';
import { Product } from '../../../../../entities/Product';
import { getSuggestedProducts } from '../../../model/services/getSuggestedProducts';
import { CategoriesEnum } from '../../../../../entities/Categories';

export const SuggestedProductsSection = memo(() => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSuggestedProducts('accessories' as CategoriesEnum).then(res =>
      setSuggestedProducts(res),
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Section lastSection>
      {suggestedProducts.length !== 0 && (
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      )}
    </Section>
  );
});
