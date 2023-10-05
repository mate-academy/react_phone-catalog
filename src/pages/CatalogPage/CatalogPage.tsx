import { useParams } from 'react-router-dom';
import { ShowLocation } from '../../components/ShowLocation';

export const CatalogPage = () => {
  const { category } = useParams();

  return (
    <>
      <ShowLocation />
      <div>{`CatalogPage ${category}`}</div>
    </>
  );
};
