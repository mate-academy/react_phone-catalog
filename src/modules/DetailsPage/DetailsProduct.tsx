import styles from './DetailsProduct.module.scss';
import { useEffect } from 'react';
import { Container } from '../../components/container/Container';
import { PageNav } from '../../components/pageNav/PageNav';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { detailsProduct } from '../../features/ProductDetailsSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TitlePages } from '../../components/title/TitlePages';
import { Carousel } from './component/carosel/Carousel';
import { DetailsChange } from './component/detailsChange/DetailsChange';
import { Price } from '../../components/price/price';
import { Buttons } from '../../components/buttons/Buttons';
import { TechDetails } from './component/techDetails/techDetails';
import { About } from './component/about/About';
import { TechSpecs } from './component/techSpecs/techSpecs';
import { ProductSlider } from '../../components/ProductsSlider/ProductSlider';

export const DetailsProduct = () => {
  const product = useAppSelector(state => state.productDetail.product);
  const models = useAppSelector(state => state.productDetail.models);



  const dispach = useAppDispatch();
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const { productId } = useParams<{ productId: string; category: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      return;
    }

    if (!['phones', 'tablets', 'accessories'].includes(category)) {
      return;
    }

    dispach(detailsProduct({ category, id: productId }));
  }, [category, productId, dispach]);

  const AllProducts = useAppSelector(state => state.products.products)

  const findProducts = product
  ? AllProducts.find(item => item.itemId === product.id)
  : null;

const findModel = (color, capacity) =>
  models.find(model => model.color === color
    && model.capacity === capacity);

const handleChangeColor = (color,) => {
  const model = findModel(color,product?.capacity);
  if (model) navigate(`/${category}/${model.id}`);
}
  const handleChangeCapacity = (capasity  ) => {
  const model = findModel( product?.color,capasity);
  if (model) navigate(`/${category}/${model.id}`);
  }

if(!product){return}
  const {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

 const objectTech = Object.fromEntries(
  [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', processor],
    ['RAM', ram],
    ['Built in memory', capacity],
    ['Camera', camera],
    ['Zoom', zoom],
    ['Cell', cell?.slice(0, 3).join(', ')],
  ].filter(([_, value]) => Boolean(value))
);



  return (product ?
    <>
      <Container>
        <PageNav />
        <TitlePages type={'details'} />
<div className={styles.wrapper}>
      <div className={styles.wrapper__carousel}> <Carousel
          images={product?.images} /></div>

          <div className={styles.wrapper__info}>
        <DetailsChange
          type={'color'}
          title={'Available color'}
          option={product?.colorsAvailable}
          selected={product.color}
          onSelect={handleChangeColor}
         />
        <DetailsChange
          type={'capacity'}
          title={'Select capacity'}
          option={product.capacityAvailable}
          selected={product.capacity}
        onSelect={handleChangeCapacity}/>
        <Price
          fullPrice={product.priceRegular}
          discount={product.priceDiscount} />
            <Buttons product={findProducts} />

        <TechDetails
          screen={product.screen}
          resolution={product.resolution}
          procesor={product.processor}
          ram={product.ram}
            /></div>

</div>

<div className={styles.aboutwrapper}>
          <div className={styles.aboutwrapper__about} >
            <About
          description={product.description } />
</div>
          <div className={styles.aboutwrapper__tech}>
            <TechSpecs
            objectTech={objectTech} /></div>

</div>
          <ProductSlider sortedProducts={models.slice(0,8)} title={'You may also like'} />

      </Container>{' '}
    </>
  :"Product was not found");
};
