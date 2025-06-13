import { useEffect } from "react";
import { Container } from "../../components/container/Container";
import { PageNav } from "../../components/pageNav/PageNav";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOneProducts } from "../../api/fetchOneTypeProducts";
import { detailsProduct } from "../../features/ProductDetailsSlice";
import { useLocation, useParams } from "react-router-dom";

export const DetailsProduct = () => {
  const product2 = useAppSelector(state => state.productDetail.product)
  const product1 = useAppSelector(state => state.products.products)
  console.log(product1,product2)
  const dispach = useAppDispatch();
   const location = useLocation();
    const category= location.pathname.split('/')[1];
 const { productId } = useParams<{ productId: string, category: string }>();
 useEffect(() => {
    if (!productId) return;
   if (!['phones', 'tablets', 'accessories'].includes(category)) return;

    dispach(detailsProduct({ category, id: productId }));

}, [category, productId, dispach]);
  return <>
    <Container>
      <PageNav />
    </Container>  </>;

};
