import { useContext, useEffect } from 'react';
import { BackButton } from '../../components/BackButton';
import { Context } from '../../components/Context';
import { Loader } from '../../components/Loader';
import { NotFound } from '../../components/NotFound';

export const NotFoundPage: React.FC = () => {
  const { isLoading } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading
        && <Loader />}

      {!isLoading
        && (
          <div
            className="
              grid__item--tablet-1-12
              grid__item--desktop-1-24"
          >
            <BackButton />

            <NotFound />
          </div>
        )}
    </>
  );
};
