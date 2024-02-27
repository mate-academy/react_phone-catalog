import { useParams } from 'react-router-dom';
import { ProductDetailsPage } from '../ProductDetailsPage';

type TabletDetailsPageProps = {
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const TabletDetailsPage: React.FC<TabletDetailsPageProps> = ({
  setFavLength,
  setCartLength,
}) => {
  const { tabletId } = useParams();

  return (
    <>
      { tabletId && (
        <ProductDetailsPage
          productId={tabletId}
          category="Tablet"
          setFavLength={setFavLength}
          setCartLength={setCartLength}
        />
      )}
    </>
  );
};
