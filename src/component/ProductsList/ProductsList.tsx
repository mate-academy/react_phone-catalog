import { GridFavourites } from '../modules/GridFavourites/GridFavourites';
import { ProductCard } from '../modules/ProductCard';
import { Products } from './../../types/Products';
import style from './ProductsList.module.scss';

type Props = {
  products: Products[];
  title: string;
  loading: boolean;
  error: string;
};

export const ProductList: React.FC<Props> = ({ title, products }) => {
  return (
    <div>
      <h1 className={style['product-list__title']}>{title}</h1>
      <div className={style['product-list__select']}>
        {products.map(product => (
          <ProductCard key={product.id} products={product} />
        ))}

        <GridFavourites products={products} />
      </div>
    </div>
  );
};
