/* eslint-disable max-len */
import { useLocation, useSearchParams } from 'react-router-dom';
import { Itemcard } from '../components/Itemcard';
import { storeGadgets } from '../store/store';
import { Gadget } from '../support/types';
import { CardGadget } from '../components/CardGadget';
import { sortGadgets } from '../support/utility';
import { TypeSelect } from '../components/TypeSelect';
import { ItemsOnPage } from '../components/ItemsOnPage';
import { Pagination } from '../components/Pagination';

type Props = { title: string };

export const Goodspage: React.FC<Props> = ({ title }) => {
  const location = useLocation();
  const { list } = storeGadgets();
  const [urlParams, setUrlParams] = useSearchParams();
  const itemID = urlParams.get('item');
  const sortType = urlParams.get('sort') || 'Choose an option';
  const searchValue = urlParams.get('search') || '';
  const foundedGadgets = list.filter(item => item.id.toLocaleLowerCase().includes(searchValue));
  const gadgets = sortGadgets(location.pathname.slice(1, -1), sortType, foundedGadgets);
  const onPage = Number(urlParams.get('onpage')) || gadgets.length;
  const page = Number(urlParams.get('page')) || 1;
  const shownGadgets = gadgets.slice(
    (page - 1) * onPage,
    (page - 1) * onPage + onPage,
  );

  const gadget: Gadget | undefined = list.find((item) => item.id === itemID);
  const sortHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const link = e.target as HTMLAnchorElement;
    const value = link.innerText.toLowerCase();

    urlParams.set('sort', value);
    urlParams.set('page', '1');
    setUrlParams(urlParams);
  };

  const itemsOnPageHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const link = e.target as HTMLAnchorElement;
    const value = link.innerText;

    urlParams.set('onpage', value);
    urlParams.set('page', '1');
    setUrlParams(urlParams);
  };

  return (
    <section className="phonespage max-w-[1136px] mx-auto mt-10">
      {gadget ? <Itemcard device={gadget} />
        : (
          <>
            {!foundedGadgets.length ? (<p className="text-center h1 text-secondary">Nothing was found</p>)
              : (
                <>
                  <h1 className="h1 mb-2 mt-10">{title}</h1>
                  <h5 className="h5 mb-10">{`${gadgets.length} models`}</h5>
                  <div className="mb-6 flex gap-4">
                    <TypeSelect sortType={sortType} handler={sortHandler} />
                    <ItemsOnPage onPage={urlParams.get('onpage') || 'All'} handler={itemsOnPageHandler} />
                  </div>
                  <div className="content flex gap-4 max-w-[1136px] flex-wrap">
                    {shownGadgets.map((item) => (
                      <CardGadget item={item} key={item.id} />
                    ))}
                  </div>
                  <Pagination
                    page={page}
                    max={gadgets.length}
                    itemsOnPage={onPage}
                    params={{ obj: urlParams, setter: setUrlParams }}
                  />

                </>
              )}

          </>
        ) }
    </section>
  );
};
