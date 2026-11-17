import './ProductList.scss';
import { Product } from '../../../types/Product';
import { ProductItem } from '../ProductItem/ProductItem';
import { Grid } from '../../PageGrid/Grid';

type Props = {
  products: Product[];
  column: boolean;
  hotPrices?: boolean;
};

export const ProductList = ({ products, column, hotPrices = false }: Props) => {
  const getHotPrices = () => {
    if (hotPrices) {
      return products
        .filter(product => product.fullPrice > product.price)
        .sort(
          (product1, product2) =>
            product2.fullPrice -
            product2.price -
            (product1.fullPrice - product1.price),
        );
    }

    return products;
  };

  const visibleProducts = hotPrices ? getHotPrices() : products;

  return (
    <Grid>
      <div className="products">
        <div className={`products__list ${column ? 'column' : ''}`}>
          {visibleProducts.map(product => (
            <ProductItem
              id={product.itemId}
              key={product.id}
              link={`/${product.category}/${product.itemId}`}
              productName={product.name}
              price={product.price}
              fullPrice={product.fullPrice}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </Grid>
  );
};
