import { useTranslation } from 'react-i18next';

import { useProductRating } from '@/entities/product/model/product-ratings.queries';

type Props = {
  namespaceId: string;
};

export const ProductRating = ({ namespaceId }: Props) => {
  const { t } = useTranslation();

  const { data } = useProductRating(namespaceId);

  if (!data) {
    return <span>{t('productNoReviews')}</span>;
  }

  return (
    <div>
      <strong>{data.rating.toFixed(1)} / 5</strong>
      <span> ({t('productReviews', { count: data.reviewsCount })})</span>
    </div>
  );
};
