import { useMemo } from 'react';
import { useAppSelector, useComponentLoading } from '../../app/hooks';
import { ShownRoute, ShownRouteOrigin } from '../ui/ShownRoute';
import cl from './DetailProdPage.module.scss';
import { TextInfoArticle } from './TextInfoArticle';
import { VisualInfoArticle } from './VisualInfoArticle';
import { SlidingProdList } from '../HomePage/SlidingProdList';
import { useParams } from 'react-router-dom';
import { Loader } from '../ui/Loader';

export const DetailProdPage: React.FC = () => {
  const { prodId } = useParams();
  const { detailedProdList } = useAppSelector(st => st.products);
  const product = detailedProdList.find(pro => pro.id === prodId);

  //#region calculate likelist
  const { productList } = useAppSelector(st => st.products);

  const youMayAlsoLikeList = useMemo(() => {
    // just randomly shuffled list, idk what else to show in this list :D
    const sortedList = [...productList].sort(() => Math.random() - 0.5);

    return sortedList.slice(0, 12);
  }, [productList]);
  //#endregion

  const isLoading = useComponentLoading(300);

  if (product === undefined) {
    return (
      <div className="container">
        <h1 style={{ color: 'white', minHeight: '55vh' }}>
          Oops, there is no such product!
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className={cl.routesContainer}>
        <ShownRoute
          origin={ShownRouteOrigin.ONPRODUCTPAGE}
          // @ts-expect-error - chosenProduct expects type of Product but DetailedProduct is also fine because chosenProduct props only uses name key which DetailProd also has
          chosenProduct={product}
        />
        {/* makes '< Back' appearance */}
        <ShownRoute origin={ShownRouteOrigin.ONCART} />
      </div>

      <div className={cl.articlesWrapper}>
        <VisualInfoArticle
          product={product}
          className={cl.visualArticleContainer}
        />

        <TextInfoArticle product={product} />

        <div>
          <SlidingProdList list={youMayAlsoLikeList} name="You may also like" />
        </div>
      </div>
    </div>
  );
};
