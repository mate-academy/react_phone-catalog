import listStyle from './ListOfGadgets.module.scss';
import { Products } from '../../types/types';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination';
import Footer from '../Footer';
import Loader from '../Loader';
import ViewCart from '../ViewCart';

interface Props {
  gadgets: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  apliedQuery: string;
}

const ListOfGadgets: React.FC<Props> = ({
  gadgets,
  setCurrentPage,
  currentPage,
  apliedQuery,
}) => {
  const [typeOfGadgets, setTypeOfGadgets] = useState<Products[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const perItems = searchParams.get('quantity') || 16;

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          (item: Products) => item.category === gadgets,
        );

        setTypeOfGadgets(filtered);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [gadgets]);

  const passedItems = +perItems * currentPage - +perItems;

  let filteredGadgets: Products[] | [] = [];

  filteredGadgets = useMemo(() => {
    return [...typeOfGadgets].filter(product =>
      product.name.toLowerCase().includes(apliedQuery.toLowerCase()),
    );
  }, [apliedQuery, typeOfGadgets]);

  if (sort === 'cheapest') {
    filteredGadgets = [...filteredGadgets].sort((gadget1, gadget2) => {
      return gadget1.price - gadget2.price;
    });
  }

  if (sort === 'alphabetically') {
    filteredGadgets = [...filteredGadgets].sort((gadget1, gadget2) => {
      return gadget1.name.localeCompare(gadget2.name);
    });
  }

  if (sort === 'newest') {
    filteredGadgets = filteredGadgets.sort((gadget1, gadget2) => {
      return gadget2.year - gadget1.year;
    });
  }

  let renderCards: Products[] | [] = JSON.parse(
    JSON.stringify(filteredGadgets),
  );

  if (perItems !== 'all') {
    renderCards = filteredGadgets.slice(passedItems, passedItems + +perItems);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={listStyle.list}>
        {renderCards.map(gadget => {
          return <ViewCart gadget={gadget} gadgets={gadgets} key={gadget.id} />;
        })}
      </div>

      {perItems !== 'all' && (
        <Pagination
          filteredGadgets={filteredGadgets}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Footer />
    </>
  );
};

export default ListOfGadgets;
