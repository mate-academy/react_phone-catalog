import { useAppContext } from "../../context/AppContext";
import ProductPage from "../../UI/ProductPage/ProductPage";

const Phones = () => {
  const { phonesList } = useAppContext();

  return <ProductPage name="Phones" productList={phonesList} />;
};

export default Phones;
