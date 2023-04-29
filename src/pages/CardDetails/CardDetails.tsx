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
import { Product } from '../../types/Product';
import Back from '../../components/Back/Back';
import { Categories } from '../../types/Categories';
import EmptyModal from '../../components/EmptyModal/EmptyModal';

type Props = {
  category: Categories;
};

const CardDetails: React.FC<Props> = ({ category }) => {
  const [product, setProduct] = useState<CardDetail | null>(null);
  const [productCard, setProductCard] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const products = useContext(ProductsContext);
  const availableProducts = useMemo(() => {
    if (category === Categories.TABLETS) {
      return products.tablets;
    }

    if (category === Categories.ACCESSORIES) {
      return products.accessories;
    }

    return products.phones;
  }, [products, category]);

  const likeProduct = useMemo(() => {
    const randoms: number[] = [];

    for (let i = 0; i < 8; i += 1) {
      const randomNum = Math.floor(Math.random() * availableProducts.length);

      if (!randoms.includes(randomNum)) {
        randoms.push(randomNum);
      } else {
        i -= 1;
      }
    }

    return [...randoms.map(num => (
      availableProducts[num]
    ))];
  }, [availableProducts, id]);

  useEffect(() => {
    setLoading(true);

    if (id) {
      getCardDetail(id)
        .then(res => setProduct(res))
        .then(() => {
          const foundProduct = availableProducts
            .find(currProduct => currProduct.phoneId === id) || null;

          setProductCard(foundProduct);
        })
        .finally(() => setLoading(false));
    }
  }, [id, availableProducts]);

  if (loading) {
    return <Loader />;
  }

  if (!product || !productCard) {
    return <EmptyModal />;
  }

  return (
    <section className="page__section card-details">
      <div className="container">
        <Back />

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
