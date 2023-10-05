import './ProductCardsPrice.scss';

interface Products {
  price: number;
  fullPrice: number;
}

interface ProductsProps {
  product: Products;
}

export const ProductCardsPrice = ({ product }: ProductsProps) => {
  return (
    <>
      <div className="card__price">
        <p className="skid-price">
          $
          {product.price}
        </p>
        <p className="norm-price">
          $
          {product.fullPrice}
        </p>
      </div>
    </>
  );
};
