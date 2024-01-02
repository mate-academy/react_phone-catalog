import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../ProductContext';
import { getTablets } from '../api/api';
import { Loader } from '../component/Loader';
import { NoResults } from '../component/NoResults';

export const TabletsPage = () => {
  const { tablets, setTablets } = useContext(ProductContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getTablets()
      .then(setTablets)
      .finally(() => setLoading(false));
  }, [setTablets]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="tables">
      <div className="container">
        {!tablets.length
          ? (<NoResults name="Tablets" />)
          : (<h1> Tables </h1>)}
      </div>
    </section>
  );
};
