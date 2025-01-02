import { Link } from 'react-router-dom';
import product from './ProductCard.module.scss';
import card from './ProductCard.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import './MySkeleton.scss';
// import { useContext } from 'react';
// import { CatalogContext } from '../CatalogProvider';

export const SkeletonProductCard = () => {
  // const { loading } = useContext(CatalogContext);

  return (
    <div
      className={card.productcard}
      style={{
        display: 'flex',
        gap: '21px',
      }}
    >
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="react-loading-skeleton"
        style={{
          margin: '10px auto 0',
          width: '60%',
          height: '100%',
          border: '0',
        }}
      >
        <div style={{ width: '200px', height: '200px' }}></div>
      </Link>
      <h2
        className="react-loading-skeleton"
        style={{ width: '60%', margin: '0 auto' }}
      >
        ...
      </h2>
      <div className={card.productcard__prices}>
        <div
          className="react-loading-skeleton"
          style={{ width: '60%', marginLeft: '45px' }}
        >
          ...
        </div>
      </div>
      <div className={card.productcard__line}></div>
      <div className={card.productcard__description}>
        <div
          className="react-loading-skeleton"
          style={{ width: '60%', marginLeft: '45px' }}
        >
          <div className={card.productcard__title}>...</div>
          <div className={card.productcard__value}>{product.screen}</div>
        </div>
        <div
          className="react-loading-skeleton"
          style={{ width: '60%', marginLeft: '45px' }}
        >
          <div className={card.productcard__title}>...</div>
          <div className={card.productcard__value}>{product.capacity}</div>
        </div>
        <div
          className="react-loading-skeleton"
          style={{ width: '60%', marginLeft: '45px' }}
        >
          <div className={card.productcard__title}>...</div>
          <div className={card.productcard__value}>{product.ram}</div>
        </div>
      </div>
      <div
        className="react-loading-skeleton"
        style={{ width: '80%', margin: '0 auto 10px' }}
      >
        <button
          className="react-loading-skeleton"
          style={{
            width: '60%',
            height: '40px',
            margin: '0 auto',
            border: '0',
          }}
        >
          ...{' '}
        </button>
        <button style={{ border: '0' }}></button>
      </div>
    </div>
  );
};
