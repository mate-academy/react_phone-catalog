import styles from './SuggestedProducts.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

interface Props {
  itemId: string;
  currentItems: ProductDetails[];
  category: string;
}

export const SuggestedProducts = ({
  itemId,
  currentItems,
  category,
}: Props) => {
  const filteredItems = currentItems.filter(item => item.id !== itemId);
  const suggestedList = filteredItems.slice(0, 10);
  const suggestedProducts = suggestedList.map(item => ({
    id: item.id,
    image: item.images[0],
    itemId: item.id,
    price: item.priceDiscount,
    fullPrice: item.priceRegular,
    name: item.name,
    category,
    screen: item.screen,
    capacity: item.capacity,
    color: item.color,
    ram: item.ram,
    year: 0,
  }));

  return (
    <ProductsSlider
      title="You may also like"
      products={suggestedProducts}
      className={styles.suggestedItemsBlock}
    />
  );
};
