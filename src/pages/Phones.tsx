import NavPage from '../components/NavPage';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Model from '../components/Model';
import { Product } from '../interface/Product';
import '../components/HotPrices';
//import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import Filters from './Filters';

const Phones = () => {
  const [data, setData] = useState<Product[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsOnPage, setItemsOnPage] = useState(16);

  // pagination

  const [page, setPage] = useState(1);
  let startPage = (page - 1) * itemsOnPage;
  let endPage = startPage + itemsOnPage;
  const totalPages = Math.ceil(data.length / itemsOnPage);
  const pages = [];

  useEffect(() => {
    fetch(
      `https://johnnyvasconcelos.github.io/react_phone-catalog/api/phones.json`,
    )
      .then(response => response.json())
      .then(result => {
        setData(result);
        setItems(result.slice(startPage, endPage));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    startPage = (page - 1) * itemsOnPage;
    endPage = startPage + itemsOnPage;

    setItems(data.slice(startPage, endPage));
  }, [page, data, itemsOnPage]);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <main className="products">
        <div className="container column">
          <NavPage page="Phones" />
          <h1 className="products__title">Mobile phones</h1>
          <Filters quantity={data.length} setItemsOnPage={setItemsOnPage} />
        </div>
        <section className="products__catalog">
          <div className="models__items container-grid">
            {loading && <Loading />}
            {items.map(item => {
              return <Model item={item} key={item.id} catalog={true} />;
            })}
          </div>

          <Pagination pages={pages} setPage={setPage} currentPage={page} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Phones;
