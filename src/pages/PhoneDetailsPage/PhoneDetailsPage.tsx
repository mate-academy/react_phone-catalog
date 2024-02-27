import { useParams } from 'react-router-dom';
import { ProductDetailsPage } from '../ProductDetailsPage';

type PhoneDetailsPageProps = {
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const PhoneDetailsPage: React.FC<PhoneDetailsPageProps> = ({
  setFavLength,
  setCartLength,
}) => {
  const { phoneId } = useParams();

  return (
    <>
      { phoneId && (
        <ProductDetailsPage
          productId={phoneId}
          category="Phone"
          setFavLength={setFavLength}
          setCartLength={setCartLength}
        />
      )}
    </>
  );
};
