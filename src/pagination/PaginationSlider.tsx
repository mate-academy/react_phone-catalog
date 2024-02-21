import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { ArrowForward, ArrowBack } from './ArrowButtons';
import { getCurrentItems, useSetCurrentPage } from '../helpers/utils';
import { newPhoneArray } from '../assets/arrayOfPhones/phonesArray';
import { PhoneItem } from '../components/phone/PhoneItem';
import '../pages/phonePage/phones.scss';
import '../pages/home/homePage.scss';
import { StateContext } from '../AppContext';

type Props = {
  pageName: string,
};

export const PaginationSlider: React.FC<Props> = ({ pageName }) => {
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
        <h1 className="home-page-header-text">Hot prices</h1>
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
          const key = uuidv4();

          return (
            <PhoneItem product={phone} key={key} />
          );
        })}
      </div>

    </div>
  );
};
