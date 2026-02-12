import React, { useContext, useEffect } from 'react';
import './ProductList.scss';
import type { Product } from '../../../../shared/types/Product';
import { ProductCard } from '../../../../shared/components/ui/ProductCard';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { AddToCartNotif } from '../../../../shared/components/Notifications/AddToCartNotif';
import { NotifStateContext } from '../../../../shared/reducer/NotificationReduce';
import { SortByAmount, SortByProp } from '../../../../shared/Enum/Sort';
import { getFilteredList } from '../../../../shared/servises/getFilteredList';
import { SectionTitle } from '../../../../shared/components/TextSections/SectionTitle/SectionTitle';
import { getText } from '../../../../shared/servises/getText';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type ProductListProps = {
  products: Product[];
};

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { additionalText } = useContext(TranslationContext);
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentProduct = location.state?.productId;

  const notifState = useContext(NotifStateContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortByProp) || SortByProp.YEAR;
  const perPageValue =
    (searchParams.get('perPage') as SortByAmount) || SortByAmount.ALL;
  const page = (searchParams.get('page') as string) || '1';
  const sortByText = (searchParams.get('query') as string) || '';

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let changed = false;

    if (!searchParams.get('sort')) {
      params.set('sort', SortByProp.YEAR);
      changed = true;
    }

    if (changed) {
      setSearchParams(params);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (currentProduct) {
      const foundEl = document.getElementById(location.state?.productId);

      foundEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      return;
    }
  }, [currentProduct, location]);

  useEffect(() => {
    if (!currentProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentProduct, location.search, page]);

  const query = {
    sort,
    perPageValue,
    page,
    sortByText,
  };

  const filteredList = getFilteredList(products, query);

  if (!category) {
    navigate('/');

    return;
  }

  return (
    <div className="products-list">
      {filteredList.length === 0 && (
        <SectionTitle
          text={getText(additionalText.noCategoryMessage, category)}
        />
      )}
      <AddToCartNotif title={notifState.title} />
      {filteredList.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
