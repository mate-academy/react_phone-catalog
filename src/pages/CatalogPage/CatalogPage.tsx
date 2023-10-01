import { useParams } from 'react-router-dom';
// import { ShowLocation } from '../../components/ShowLocation';

export const CatalogPage = () => {
  // const pathname = useLocation().pathname.slice(1);
  const { product } = useParams();

  return (
    <>
      {/* <ShowLocation /> */}
      <div>{`CatalogPage ${product}`}</div>
    </>
  );
};
