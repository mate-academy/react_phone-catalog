import { useParams } from 'react-router-dom';
import { ProductDetailsPage } from '../ProductDetailsPage';

type AccessoryDetailsPageProps = {
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const AccessoryDetailsPage: React.FC<AccessoryDetailsPageProps> = ({
  setFavLength,
  setCartLength,
}) => {
  const { accessoryId } = useParams();

  return (
    <>
      { accessoryId && (
        <ProductDetailsPage
          productId={accessoryId}
          category="Accessory"
          setFavLength={setFavLength}
          setCartLength={setCartLength}
        />
      )}
    </>
  );
};
