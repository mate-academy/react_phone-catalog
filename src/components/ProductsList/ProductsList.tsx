import { ProductCard } from '../ProductCard/ProductCard';
import styles from "./ProductsList.module.scss";


interface Product {
  id: number;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  category: string;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  color: string;
  itemId: string;
}

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles['product__list']}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} width='287px'/>
      ))}
    </div>
  )
}
