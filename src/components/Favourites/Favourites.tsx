import './Favourites.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { useShop } from '../../context/shopContext';
import { Link } from 'react-router-dom';

export const Favourites = () => {
  const { favourites } = useShop();

  return (
    <div className="favourites">
      <div className="favourites__container">
        <div className="favourites__path">
          <div className="favourites__path--image">
            <Link to="/" className="favourites__path--image-img">
              <img src="../../../img/Home.png" alt="home" />
            </Link>
          </div>
          <div className="favourites__path--arrow">
            <img src="../../../img/arrow-right.png" alt="right" />
          </div>
          <div className="favourites__path--device">Favourites</div>
        </div>
        <div className="favourites__title">
          <div className="favourites__title--text">Favourites</div>
          <div className="favourites__title--amount">
            {favourites.length} items
          </div>
        </div>
      </div>
      <div className="favourites__grid">
        {favourites.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};
