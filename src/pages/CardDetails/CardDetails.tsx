import './CardDetail.scss';
import {
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { useParams } from 'react-router';
import { CardDetail } from '../../types/CardDetail';
import CardInfo from './CardInfo/CardInfo';
import CardShow from './CardShow/CardShow';
import { getCardDetail } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import CardAbout from './CardAbout/CardAbout';
import CardTechSpecs from './CardTechSpecs/CardTechSpecs';
import CardSlider from '../../components/CardSlider/CardSlider';
import { ProductsContext } from '../../contexts/ProductsContext';
import { sortProducts } from '../../helpers/sortProducts';
import { Sort } from '../../types/Sort';
import { moveToTop } from '../../helpers/moveToTop';
import { Product } from '../../types/Product';

const CardDetails = () => {
  const [product, setProduct] = useState<CardDetail | null>(null);
  const [productCard, setProductCard] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { phones } = useContext(ProductsContext);
  const likeProduct = useMemo(() => {
    return sortProducts(phones, Sort.PRICE)
      .reverse()
      .slice(0, 8);
  }, [phones]);

  useEffect(() => {
    moveToTop();

    if (id) {
      getCardDetail(id)
        .then(res => setProduct(res))
        .then(() => {
          const foundProduct = phones
            .find(phone => phone.phoneId === id) || null;

          setProductCard(foundProduct);
        })
        .finally(() => setLoading(false));
    }
  }, [id, getCardDetail, setLoading, setProduct]);

  if (loading) {
    return <Loader />;
  }

  if (!product || !productCard) {
    return <p>No find</p>;
  }

  return (
    <section className="page__section card-details">
      <div className="container">
        <h2 className="page__title card-details__title">
          {product.name}
        </h2>

        <div className="card-details__main">
          <CardShow images={product.images} />

          <CardInfo
            cardDetail={product}
            productCard={productCard}
          />
        </div>

        <div className="card-details__detail">
          <CardAbout description={product.description} />

          <CardTechSpecs cardDetail={product} data-cy="productDescription" />
        </div>
      </div>

      <CardSlider title="You may also like" products={likeProduct} />
    </section>
  );
};

export default CardDetails;
