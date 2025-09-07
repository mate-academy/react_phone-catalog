import { useParams } from 'react-router-dom';

import phones from '../../../data/phones.json';
import tablets from '../../../data/tablets.json';
import accessories from '../../../data/accessories.json';

import ProductPage from './Phone/ProductPagePhone';
import ProductPageTablets from './Tablets/ProductPageTablets';
import ProductPageAccessories from './Accessories/ProductPageAccessories';

export default function ProductPageWrapper() {
  const { category, id } = useParams();

  switch (category) {
    case 'phones': {
      const product = phones.find(p => String(p.id) === id);

      if (product) {
        return <ProductPage product={product} />;
      }

      break;
    }

    case 'tablets': {
      const product = tablets.find(t => String(t.id) === id);

      if (product) {
        return <ProductPageTablets product={product} />;
      }

      break;
    }

    case 'accessories': {
      const product = accessories.find(a => String(a.id) === id);

      if (product) {
        return <ProductPageAccessories product={product} />;
      }

      break;
    }

    default:
      return <p>Unknown category</p>;
  }

  return <p>Product not found</p>;
}
