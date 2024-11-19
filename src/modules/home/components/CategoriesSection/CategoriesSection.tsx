import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';

import styles from './CategoriesSection.module.scss';
import { CATEGORIES_SETUP } from '../../utils/categoriesSetup';
import { CategoryItem } from '../CategoryItem';

export const CategoriesSection = () => (
  <Box
    variant="section"
    className={cn('container', styles.categoriesContainer)}
  >
    <Text variant="h2" className={styles.title}>
      Shop by category
    </Text>

    <Box className={styles.categories}>
      {CATEGORIES_SETUP.map(({ id, href, title, url }) => (
        <CategoryItem
          key={id}
          category={id}
          href={href}
          title={title}
          url={url}
          className={styles.category}
        />
      ))}
    </Box>
  </Box>
);
