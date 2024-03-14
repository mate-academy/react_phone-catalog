import { useSearchParams } from 'react-router-dom';
import { sortProducts } from '../../helpers/sortProducts';
import { useAppSelector } from '../../app/hooks';

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();

  const { phones, loading, error } = useAppSelector(state => state.phones)

  const phonesToRender = sortProducts(sortBy, phones).slice(from, to);

  return (
    <div className="phones-page">
      <div className="phones-page__top">
        <h1 className="phones-page__title title">Mobile phones</h1>

        <p className="phones-page__models">{`${phones.length} models`}</p>
      </div>
    </div>
  );
};
