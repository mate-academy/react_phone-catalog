import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';
import { PageContext } from '../../../utils/GlobalContext';

export const Categories:React.FC = () => {
  const { products } = useContext(PageContext);
  const phonesCount = products
    .filter(product => product.category === 'phones').length;
  const tabletsCount = products
    .filter(product => product.category === 'tablets').length;
  const accessoriesCount = products
    .filter(product => product.category === 'accessories').length;

  return (
    <div className="categories">
      <h1 className="categories__title">Shop by category</h1>

      <div className="categories__blocks" data-cy="categoryLinksContainer">
        <Link
          className="categories__block"
          to="/phones"
        >
          <div className="categories__photo categories__photo--phones" />
          <h3 className="categories__block-title">Mobile phones</h3>
          <p className="categories__block-count">{`${phonesCount} models`}</p>
        </Link>
        <Link
          className="categories__block"
          to="/tablets"
        >
          <div className="categories__photo categories__photo--tablets" />
          <h3 className="categories__block-title">Tablets</h3>
          <p className="categories__block-count">{`${tabletsCount} models`}</p>
        </Link>
        <Link
          className="categories__block"
          to="/accessories"
        >
          <div className="categories__photo categories__photo--accessories" />
          <h3 className="categories__block-title">Accessories</h3>
          <p className="categories__block-count">{`${accessoriesCount} models`}</p>
        </Link>
      </div>
    </div>
  );
};
