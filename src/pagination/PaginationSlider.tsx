import { useContext } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { ArrowForward, ArrowBack } from './ArrowButtons';
import { getCurrentItems, useSetCurrentPage } from '../helpers/utils';
import { newPhoneArray } from '../assets/arrayOfPhones/phonesArray';
import { ProductItem } from '../components/product/ProductItem';
import '../pages/ProductPage/product.scss';
import '../pages/home/homePage.scss';
import { StateContext } from '../AppContext';

type Props = {
  pageName: string,
  headline?: string,
};

export const PaginationSlider: React.FC<Props> = ({ pageName, headline }) => {
  const setPage22 = useSetCurrentPage();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get(pageName) || '1';
  const { state } = useContext(StateContext);

  const itemsPerpage = 4;
  const amountOfPages = Math.ceil(newPhoneArray.length / itemsPerpage);

  const currentItems = getCurrentItems(state.products, currentPage);

  return (
    <div className="hot-prices-block">

      <div className="header-block">
        <h1 className="home-page-header-text">{headline}</h1>
        <div className="arrow-box">
          <ArrowBack
            action={
              () => setPage22(+currentPage > 1 ? +currentPage - 1 : 1, pageName)
            }
          />
          <ArrowForward
            action={
              () => setPage22(
                +currentPage < amountOfPages
                  ? +currentPage + 1 : +currentPage, pageName,
              )
            }
          />
        </div>
      </div>

      <div className="chunk-container">
        {currentItems.map(phone => {
          return (
            <ProductItem product={phone} key={phone.id} />
          );
        })}
      </div>

    </div>
  );
};
