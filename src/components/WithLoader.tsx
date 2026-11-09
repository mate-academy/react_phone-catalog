import { Loader } from '../components/Loader/Loader';

type Props = {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  errorSlot?: React.ReactNode;
};

export const WithLoader: React.FC<Props> = ({ loading, error, children }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-block">
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return <>{children}</>;
};
