import { useAppContext } from "../../context/AppContext";
import ProductPage from "../../UI/ProductPage/ProductPage";

const Tablets = () => {
  const { tabletsList } = useAppContext();

  return <ProductPage name="Tablets" productList={tabletsList} />;
};

export default Tablets;
