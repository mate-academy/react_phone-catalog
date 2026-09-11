import { type Product, ProductCardSale } from '../ProductCardSale';

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <>
      {products.map(product => (
        <ProductCardSale key={product.id} product={product} />
      ))}
    </>
  );
};
