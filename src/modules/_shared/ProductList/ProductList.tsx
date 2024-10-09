import { ProductType } from '../../../types/productsType';
import ProductCard from '../productCard/ProductCard';
import { ProductListStyled } from './styled';

type Props = {
  productLength: number;
  products: ProductType[];
};

const ProductList: React.FC<Props> = ({ productLength, products }) => {
  return (
    <ProductListStyled>
      {productLength !== 0
        ? products.map(item => (
            <ProductCard key={item.id} variant="ListPage" product={item} />
          ))
        : [1, 2, 3, 4].map(item => (
            <ProductCard variant="ListPage" key={item} />
          ))}
    </ProductListStyled>
  );
};

export default ProductList;
