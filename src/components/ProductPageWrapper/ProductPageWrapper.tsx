import type { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { parseProductUrl } from '../../utils/productUrlParser';

export const ProductPageWrapper: FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [searchParams] = useSearchParams();
  const { effectiveNamespaceId } = parseProductUrl(itemId, searchParams);

  return <ProductPage key={effectiveNamespaceId} />;
};
