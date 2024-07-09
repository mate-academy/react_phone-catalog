import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import './Items.scss';
import { UpgradedProduct } from '../../types/UpgradedProduct';
import { ArrowRightGrayImg, homeImg } from '../../utils/indes';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { getTrimmedProducts } from '../../servises';
import { SortBy } from '../../types/SortBy';
import Pagination from '../Pagination/Pagination';
import DropdownBySort from '../Dropdowns/DropdownBySort/DropdownBySort';
import DropdownOnpage from '../Dropdowns/DropdownOnpage/DropdownOnpage';
import Product from '../Product/Product';

type Props = {
  title?: string;
  items: UpgradedProduct[];
};

const Items: React.FC<Props> = ({ title, items }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const itemsOnPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [trimmedProducts, count] = getTrimmedProducts(
    items,
    query,
    sortBy as keyof typeof SortBy,
    itemsOnPage as ItemsOnPage,
    +page,
  );

  useEffect(() => {
    setPage(1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsOnPage]);

  const navigationPath = pathname.slice(1);
  const paginationCounter = Math.ceil(count / +itemsOnPage) || 1;

  return (
    <div className="items">
      <div className="items__navigation">
        <Link to="/">
          <img src={homeImg} alt="Home" />
        </Link>
        <img src={ArrowRightGrayImg} alt="ArrowRight" />
        <p className="items__navigation-title">{navigationPath}</p>
      </div>

      <div className="items__descriprion">
        <h1 className="items__descriprion-title">{title}</h1>
        <p className="items__descriprion-amount">{`${items.length} models`}</p>
      </div>

      <div className="items__sort">
        <DropdownBySort />
        <DropdownOnpage />
      </div>

      <div className="items__products">
        {trimmedProducts.map(product => (
          <div key={product.id} className="items__products-item">
            <Product product={product} />
          </div>
        ))}
      </div>

      {paginationCounter > 1 && (
        <Pagination total={paginationCounter} page={page} setPage={setPage} />
      )}

      {!trimmedProducts.length && (
        <h1 className="items__message">{`There are no ${navigationPath} products matching the query`}</h1>
      )}
    </div>
  );
};

export default Items;
