import { useEffect } from 'react';
import { Container } from '../../components/container/Container';
import { PageNav } from '../../components/pageNav/PageNav';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOneProducts } from '../../api/fetchOneTypeProducts';
import { detailsProduct } from '../../features/ProductDetailsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { TitlePages } from '../../components/title/TitlePages';
import { Carousel } from './component/carosel/Carousel';
import { DetailsChange } from './component/detailsChange/DetailsChange';

export const DetailsProduct = () => {
  const product = useAppSelector(state => state.productDetail.product);
const models = useAppSelector(state=>state.productDetail.models)
console.log(models,product)
  const dispach = useAppDispatch();
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const { productId } = useParams<{ productId: string; category: string }>();

  useEffect(() => {
    if (!productId) {
      return;
    }

    if (!['phones', 'tablets', 'accessories'].includes(category)) {
      return;
    }

    dispach(detailsProduct({ category, id: productId }));
  }, [category, productId, dispach]);


  return (product?
    <>
      <Container>
        <PageNav />
        <TitlePages type={'details'} />
        <Carousel
          images={product?.images} />

 <DetailsChange colors={product?.colorsAvailable } models={models} />
      </Container>{' '}
    </>
  :"null");
};
