import { Loader } from '../Loader';
import { Main } from '../Main/Main';

type Props = {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  onClick?: () => void;
  products?: number;
  category?: string;
};

export const ErrorContent = ({
  loading,
  error,
  errorMessage,
  onClick,
  products,
  category,
}: Props) => {
  return (
    <Main>
      {error && !loading && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '24px',
            alignItems: 'center',
          }}
        >
          <p>{errorMessage ? errorMessage : 'Something went wrong'}</p>
          <button
            style={{
              backgroundColor: '#313237',
              border: '0',
              color: '#ffffff',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
            onClick={onClick}
          >
            reload
          </button>
        </div>
      )}

      {products === 0 && !loading && !error && (
        <p style={{ marginTop: '24px' }}>There are no {category}</p>
      )}

      {loading && <Loader />}
    </Main>
  );
};
