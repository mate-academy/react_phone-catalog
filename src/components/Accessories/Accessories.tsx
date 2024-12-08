import { useAppContext } from "../../context/AppContext";
import ProductPage from "../../UI/ProductPage/ProductPage";

const Accessories = () => {
  const { accessoriesList } = useAppContext();

  return <ProductPage name="Accessories" productList={accessoriesList} />;
};

export default Accessories;
