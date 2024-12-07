import { useEffect, useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { Skeleton } from '@shared/components/Skeleton';
import { getProducts } from '@shared/services/api/api';
import { ProductCategory } from '@shared/types/Product/Product.interfaces';
import { extractBreakPoints, generateImgUrls } from '@shared/utils/helpers';

import styles from './CategoryItem.module.scss';

interface CategoryItemProps {
  category: ProductCategory;
  url: string;
  href: string;
  title: string;
  className?: string;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  href,
  url,
  title,
  category,
  className,
}) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState<number | null>(null);
  const [desktopBreakpoint] = extractBreakPoints();
  const [urlSm, , urlLg] = generateImgUrls(url);

  useEffect(() => {
    getProducts({ category })
      .then(({ meta }) => {
        setTotal(meta.total);
      })
      .catch(() => {
        navigate('/error');
      });
  }, [category, navigate]);

  return (
    <Box className={className}>
      <NavLink to={href} className={styles.link}>
        <Box className={styles.imageWrapper}>
          <picture>
            <source
              srcSet={urlLg}
              media={`(min-width:${desktopBreakpoint}px)`}
            />
            <img src={urlSm} alt={category} />
          </picture>
        </Box>

        <Box className={styles.description}>
          <Text variant="h4" className={styles.title}>
            {title}
          </Text>

          {total !== null ? (
            <Text variant="body" className={styles.total}>
              {total} models
            </Text>
          ) : (
            <Skeleton width={100} height={21} />
          )}
        </Box>
      </NavLink>
    </Box>
  );
};
