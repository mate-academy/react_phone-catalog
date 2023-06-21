import './ProductsList.scss';

type ProductsListProps = {
  children: React.ReactNode;
};

export const ProductsList = ({ children }: React.PropsWithChildren<ProductsListProps>) => {
  return (
    <>
      <ul className="products-list" data-cy="productList">
        {children}
      </ul>
    </>
  );
};
