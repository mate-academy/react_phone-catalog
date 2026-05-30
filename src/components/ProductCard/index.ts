// Export the component
export { ProductCard } from './ProductCard';

// Export types if needed by other components
export type { Props as ProductCardProps } from './ProductCard';

// Re-export styles (optional - if you want to access them externally)
// This allows: import { ProductCard, ProductCardStyles } from '../ProductCard'
import styles from './ProductCard.module.scss';
export { styles as ProductCardStyles };
