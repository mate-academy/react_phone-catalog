import { ProductPage } from '../../Components/ProductsPage/ProductsPage';

type Props = {
  isLoader: boolean,
  setIsLoader: (value: boolean) => void,
};

export const Accessories: React.FC<Props> = ({ isLoader, setIsLoader }) => {
  return (
    <>
      <ProductPage
        isLoader={isLoader}
        setIsLoader={setIsLoader}
        category="accessories"
        title="Accessories"
      />
    </>
  );
};
