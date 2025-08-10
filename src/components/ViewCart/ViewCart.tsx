import { Link } from 'react-router-dom';
import { Products } from '../../types/types';
import viewCartStyle from './ViewCart.module.scss';
import AddToCardButton from '../AddToCardButton/AddToCardButton';
import AddToLovelyButton from '../AddToLovelyButton';

interface Props {
  gadget: Products;
  gadgets: string;
  isSugested?: boolean;
}

const ViewCart: React.FC<Props> = ({ gadget, gadgets, isSugested }) => {
  return (
    <>
      <Link
        onClick={() => {
          if (isSugested) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        to={`/${gadgets}/${gadget.itemId}`}
        key={gadget.id}
        className={viewCartStyle.list__reference}
      >
        <div className={viewCartStyle.list__card}>
          <div
            style={{ backgroundImage: `url('${gadget.image}')` }}
            className={viewCartStyle.list__image}
          ></div>

          <div className={viewCartStyle.list__data}>
            <div className={viewCartStyle.list__name}>{gadget.name}</div>
            <div className={viewCartStyle.list__price}>${gadget.fullPrice}</div>

            <div className={viewCartStyle.list__info}>
              <div className={viewCartStyle['list__gadget-parameters']}>
                Screen
              </div>
              <div>{gadget.screen}</div>
            </div>
            <div className={viewCartStyle.list__info}>
              <div className={viewCartStyle['list__gadget-parameters']}>
                Capacity
              </div>
              <div className={viewCartStyle.list__gb}>128 GB</div>
            </div>
            <div className={viewCartStyle.list__info}>
              <div className={viewCartStyle['list__gadget-parameters']}>
                RAM
              </div>
              <div>6 GB</div>
            </div>

            <div className={viewCartStyle.list__buttons}>
              <AddToCardButton gadget={gadget} />
              <AddToLovelyButton gadget={gadget} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ViewCart;
