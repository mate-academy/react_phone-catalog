import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGoods, loadGoodDetails, getGoodDetails } from '../../store';
import { isLoading } from '../../store';
import { Gallery } from './Gallery';
import { CardSlider } from  './../../components/CardSlider';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { GoodDetails } from './GoodDetails';
import { Preloader } from '../../components/Preloader';
import { TechSpecs } from './TechSpecs';
import { Back } from '../../components/Back';

type ProductPageProps = {
  goodId: string;
}


export const ProductPage: React.FC<ProductPageProps> = ({ goodId }) => {
  const dispatch = useDispatch()
  const goods: Good[] = useSelector(getGoods);
  const goodDetails: GoodDetails = useSelector(getGoodDetails);
  const loading = useSelector(isLoading);
  const [recommendedGoods, setRecommendedGoods] = useState<Good[]>([]);
  const temporaryColors = ['black', 'beige', 'pink'];

  const goodData = useMemo(() => (
    goods.find(good => (good.id === goodId))
  ), [goods, goodId]);

  useEffect(() => {
    dispatch(loadGoodDetails(goodId));
  }, [goodId, goods, dispatch])

  useEffect(() => {
     const filterName = goodData?.name.split(' ').splice(0, 1).toString();
     const similarGoods = goods.filter(good => good.name.includes(filterName || ''));
     setRecommendedGoods(similarGoods);
  },[goodId, dispatch, goodData, goods])


  return (
    <section className="productpage">
      {(loading || !goodData || !goodDetails.images)
      ? <Preloader />
      : (
        <>
          <BreadCrumbs />
          <Back />
          <h1 className="productpage__title">{goodDetails.name}</h1>
          <div className="productpage__container">

          {goodDetails&&<Gallery images={goodDetails.images} name={goodDetails.name} />}

            <GoodDetails goodData={goodData} colors={temporaryColors} />

            <section className="about">
              <h2 className="about__title">About</h2>
              <h3 className="about__article-title">And then there was Pro</h3>
              <article className="about__article">
                {goodDetails.description}
              </article>
              <h3 className="about__article-title">Camera</h3>
                <article className="about__article">{goodDetails.additionalFeatures}</article>
            </section>

            <TechSpecs goodDetails={goodDetails} />
          </div>

          <div className="productpage__view-products">
            <CardSlider goods={recommendedGoods} title={`You may also like`} />
          </div>
        </>
        )}
    </section>
  )
}
