import { useMemo } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import LeftIcon from '@assets/images/icons/chevron-left-icon.svg?react';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { TextButton } from '@shared/base/TextButton';
import { BreadCrumbs } from '@shared/components/BreadCrumbs';
import { Skeleton } from '@shared/components/Skeleton';
import { useMedia } from '@shared/hooks/useMedia';
import { ProductCategory } from '@shared/types/Product/Product.interfaces';

import styles from './ProductHeader.module.scss';

export interface ProductHeaderProps {
  isLoading: boolean;
  productId?: string;
  productName?: string;
  category?: ProductCategory;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  isLoading,
  productId,
  category,
  productName,
}) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isMobile } = useMedia();

  const breadCrumbs = useMemo(() => {
    if (!category || !productId || !productName) {
      return [];
    }

    return [
      {
        id: category,
        href: `/products/?category=${category}`,
        title: `${category[0].toUpperCase()}${category.slice(1, category.length)}`,
      },
      {
        id: productId,
        href: `/products/?category=${category}/${productId}`,
        title: productName,
      },
    ];
  }, [category, productId, productName]);

  const onGoBack = () => {
    if (state?.from) {
      navigate(state.from);
    } else {
      navigate('/');
    }
  };

  return (
    <Box className={styles.header}>
      {isLoading ? (
        <Skeleton height={21} width={140} />
      ) : (
        <BreadCrumbs breadCrumbs={breadCrumbs} />
      )}

      {isLoading ? (
        <Skeleton height={16} width={51} className={styles.backBtn} />
      ) : (
        <TextButton
          className={styles.backBtn}
          startAdornment={LeftIcon}
          onClick={onGoBack}
        >
          Back
        </TextButton>
      )}

      {isLoading ? (
        <Skeleton height={isMobile ? 31 : 41} width={250} />
      ) : (
        <Text variant="h2">{productName}</Text>
      )}
    </Box>
  );
};
