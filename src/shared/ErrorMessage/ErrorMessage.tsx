import { useParams } from 'react-router-dom';
import styles from './ErrorMessage.module.scss';
import { useMyContext } from '../../Context/ProductContexts';
import { useEffect, useState } from 'react';
import { client } from '../../fetch/fetchGoods';
import { ProductDemo } from '../../types/ProductDemo';

type ErrorProps = {
  notResponding?: boolean;
  notFound?: boolean;
};

export const ErrorMessage: React.FC<ErrorProps> = ({
  notResponding,
  notFound,
}) => {
  const { setIsError } = useMyContext();
  const { productId } = useParams();
  const [fullList, setFullList] = useState<ProductDemo[]>([]);
  const [finded, setFinded] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const makeFullList = async () => {
      try {
        setIsError(false);
        const productsList = await client.fetchProducts();

        setFullList([...productsList]);
      } catch {
        setIsError(true);
      }
    };

    makeFullList();
  }, []);

  useEffect(() => {
    setFinded(fullList.some(product => product.itemId === productId));
  }, []);

  return (
    <div className={styles.container}>
      {notResponding && (
        <>
          <h1 style={{ color: '#905bff' }}>The page is not responding</h1>
          <button
            className={styles.button}
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </>
      )}
      {!finded && notFound && (
        <h1 style={{ color: '#905bff' }}>Product was not found</h1>
      )}
    </div>
  );
};
