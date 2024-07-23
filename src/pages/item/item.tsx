import { useLocation, useParams } from 'react-router-dom';
import phones from '../../api/phones.json';
import { Phone } from '../../types/phones';
import { Slider } from '../../components/slider/slider';
import { Product } from '../../types/product';
import productsFromApi from '../../api/products.json';
// eslint-disable-next-line max-len
import { ItemOptionBlock } from '../../components/itemOptionBlock/itemOptionBlock';
// eslint-disable-next-line max-len
import { ItemDescription } from '../../components/itemDescription/itemDescription';
import { NotFound } from '../notFound/notFound';
import { useEffect } from 'react';

export const Item: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname])

  const idsForYouLike = [72, 73, 70, 81, 2, 83, 24, 111];

  const youLike: Product[] = productsFromApi.filter(product =>
    idsForYouLike.includes(product.id),
  );
  const { itemId } = useParams();

  const item: Phone | undefined = phones.find(phone => phone.id === itemId);

  if (!item) {
    return <NotFound />;
  }

  return (
    <section className="item">
      <ItemOptionBlock item={item} />
      <ItemDescription item={item} />
      <Slider
        showOldPrice={true}
        title={'You may also like'}
        products={youLike}
      />
    </section>
  );
};
