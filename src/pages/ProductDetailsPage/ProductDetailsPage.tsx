import './ProductDetailsPage.scss';

import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../../components/Header/Header';
import { WayFromHome } from '../../components/WayFromHome/WayFromHome';
import { ProductFull } from '../../types/ProductFull';
import { getDetailsBy, getSimilarBy, getSuggestedProducts } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { NamesByHeader } from '../../types/NamesByHeader';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { NamesBySections } from '../../types/NamesBySections';
import { ProductShort } from '../../types/ProductShort';
import { Footer } from '../../components/Footer/Footer';
import { NamesByLinks } from '../../types/NamesByLinks';
import { DetailsImages } from '../../components/DetailsImages/DetailsImages';
import { DetailsSelects } from '../../components/DetailsSelects/DetailsSelects';
import {
  DetailsDescription,
} from '../../components/DetailsDescription/DetailsDescription';
import {
  DetailsTechSpecs,
} from '../../components/DetailsTechSpecs/DetailsTechSpecs';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { DEF_SORT } from '../../helpers/consts';
import { getBackLink } from '../../helpers/getBackLink';

export const ProductDetailsPage: React.FC = () => {
  const { liked, addedToCart } = useContext(LikeAndCartContext);
  const [numLiked, setNumLiked] = useState<number>(liked.length);
  const [numAdded, setNumAdded] = useState<number>(addedToCart.length);

  const [product, setProduct] = useState<ProductFull | null>(null);
  const [errMess, setErrMess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [similarProducts, setSimilarProducts] = useState<ProductShort[]>([]);
  const [suggested, setSuggestedProducts] = useState<ProductShort[]>([]);

  const { productId } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    if (productId) {
      setIsLoading(true);

      getDetailsBy(productId)
        .then(setProduct)
        .catch((mess) => setErrMess(mess))
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      getSimilarBy(product.namespaceId)
        .then(setSimilarProducts)
        .catch((mess: Error) => setErrMess(mess.message));

      getSuggestedProducts(product.namespaceId)
        .then(setSuggestedProducts)
        .catch((mess) => setErrMess(mess));
    }
  }, [product]);

  return (
    <>
      <Header quantityLiked={numLiked} quantityAdded={numAdded} />

      {isLoading && (<Loader />)}
      {!isLoading && !!errMess.length && <ErrorMessage text={errMess} />}
      {!isLoading && !errMess.length && (
        <div className="container">
          <main className="container__content">
            {product && (
              <div className="product-page__way">
                <WayFromHome
                  lastPoint={product.name}
                  interimPoints={[{
                    text: NamesByHeader.Phones,
                    link: NamesByLinks.Phones + DEF_SORT,
                  }]}
                />
              </div>
            )}

            <section className="details-page">
              <ButtonBack getBack={() => getBackLink(state)} />

              {product ? (
                <>
                  <h1 className="details-page__title">
                    {product?.name}
                  </h1>

                  <div className="details-page__content">
                    <div className="details-page__section-top">
                      <DetailsImages product={product} />

                      <DetailsSelects
                        product={product}
                        similarProducts={similarProducts}
                        numLiked={numLiked}
                        onSetNumLiked={setNumLiked}
                        numAdded={numAdded}
                        onSetNumAdded={setNumAdded}
                      />
                    </div>

                    <div className="details-page__section-bot">
                      <DetailsDescription product={product} />

                      <DetailsTechSpecs product={product} />
                    </div>
                  </div>
                </>
              ) : (
                <p className="details-page__paragraph">
                  Phone was not found
                </p>
              )}

              {product && (
                <div className="details-page__slider">
                  <ProductsSlider
                    title={NamesBySections.MayLike}
                    products={suggested}
                    numLiked={numLiked}
                    onSetNumLiked={setNumLiked}
                    numAdded={numAdded}
                    onSetNumAdded={setNumAdded}
                  />
                </div>
              )}
            </section>
          </main>
        </div>
      )}

      {!isLoading && <Footer />}
    </>
  );
};
