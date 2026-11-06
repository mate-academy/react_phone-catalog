import NavPage from '../components/NavPage';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Model from '../components/Model';
import { Product } from '../interface/Product';
import '../components/HotPrices';
//import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';

const Accessories = () => {
  const [data, setData] = useState<Product[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination

  const [page, setPage] = useState(1);
  let startPage = (page - 1) * 16;
  let endPage = startPage + 16;
  const totalPages = Math.ceil(data.length / 16);
  const pages = [];

  useEffect(() => {
    fetch(
      `https://johnnyvasconcelos.github.io/react_phone-catalog/api/accessories.json`,
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
    startPage = (page - 1) * 16;
    endPage = startPage + 16;

    setItems(data.slice(startPage, endPage));
  }, [page, data]);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <main className="products">
        <div className="container column">
          <NavPage page="Accessories" />
          <h1 className="products__title">Accessories</h1>
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

export default Accessories;
