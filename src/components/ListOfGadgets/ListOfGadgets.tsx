import listStyle from './ListOfGadgets.module.scss';
import { Iphones, Tablets, Products } from '../../types/types';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination';

interface Props {
  gadgets: string;
}

const ListOfGadgets: React.FC<Props> = ({ gadgets }) => {
  // type Product = Iphones | Tablets;

  const modelOrder = {
    'iPhone 7': 2016,
    'iPhone 8': 2017,
    'iPhone X': 2017,
    'iPhone XR': 2018,
    'iPhone XS': 2018,
    'iPhone 11': 2019,
    'iPhone 12': 2020,
    'iPhone 13': 2020,
    'iPhone 14': 2022,
  };

  const [typeOfGadgets, setTypeOfGadgets] = useState<Products[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  console.log(gadgets);

  const sort = searchParams.get('sort');
  const perItems = searchParams.get('quantity') || 16;

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => {
        // Фільтруємо тільки потрібну категорію
        const filtered = data.filter(
          (item: Products) => item.category === gadgets,
        );

        console.log(filtered);

        setTypeOfGadgets(filtered);
      })
      .finally(() => setLoading(false));
  }, [gadgets]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageQuantity = Math.ceil(typeOfGadgets.length / currentPage);
  const passedItems = +perItems * currentPage - +perItems;

  console.log(passedItems);

  console.log(typeOfGadgets);

  let filteredGadgets: Products[] | [] = [];

  if (sort === 'cheapest') {
    filteredGadgets = [...typeOfGadgets].sort((gadget1, gadget2) => {
      return gadget1.price - gadget2.price;
    });
  }

  if (sort === 'alphabetically') {
    filteredGadgets = [...typeOfGadgets].sort((gadget1, gadget2) => {
      return gadget1.name.localeCompare(gadget2.name);
    });
  }

  if (sort === 'newest') {
    filteredGadgets = typeOfGadgets.sort((gadget1, gadget2) => {
      return gadget2.year - gadget1.year;
    });
  }

  const renderCards = filteredGadgets.slice(
    passedItems,
    passedItems + +perItems,
  );

  console.log(renderCards);
  console.log(gadgets);

  return (
    <>
      <div className={listStyle.list}>
        {renderCards.map(gadget => {
          return (
            <div key={gadget.id} className={listStyle.list__card}>
              <a
                href="#"
                style={{ backgroundImage: `url('${gadget.image}')` }}
                className={listStyle.list__image}
              ></a>

              <div className={listStyle.list__data}>
                <div className={listStyle.list__name}>{gadget.name}</div>
                <div className={listStyle.list__price}>${gadget.fullPrice}</div>

                <div className={listStyle.list__info}>
                  <div>Screen</div>
                  <div>{gadget.screen}</div>
                </div>
                <div className={listStyle.list__info}>
                  <div>Capacity</div>
                  <div className={listStyle.list__gb}>128 GB</div>
                </div>
                <div className={listStyle.list__info}>
                  <div>RAM</div>
                  <div>6 GB</div>
                </div>

                <div className={listStyle.list__buttons}>
                  <button className={listStyle.list__add}>Add to cart</button>

                  <a href="#" className={listStyle['list__lovely-choice']}></a>
                </div>
              </div>

              {/* <div className={listStyle.list__deteils}>

              </div> */}
            </div>
          );
        })}
      </div>

      <Pagination
        itemsLength={typeOfGadgets.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ListOfGadgets;
