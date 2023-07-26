import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Product } from '../utils/types/Product';
import { ProductActions } from './ProductActions';
import { cardCharacteeristics } from '../utils/listsNames';
import { Characteristics } from './Characteristics';
import { Transition } from './IntersectionTransition';
import { Loader } from './Loader';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      <Transition>
        {inView ? (
          <article className="card" data-cy="cardsContainer">
            <Link to={`/phones/${product.itemId}`} className="link">
              <div className="card__image">
                <img src={product.image} alt="" />
              </div>

              <div className="card__title">{product.name}</div>
              <div className="card__price">
                <span className="card__price--with-discont">
                  $
                  {(product.name.includes('11') && product.fullPrice)
            || product.price}
                </span>

                <span className="card__price--without-discont">

                  {!product.name.includes('11') && `$${product.fullPrice}`}
                </span>

              </div>
            </Link>
            <ProductActions product={product} />
            <Characteristics details={product} items={cardCharacteeristics} />
          </article>
        )
          : <Loader />}
      </Transition>
    </div>

  );
};
