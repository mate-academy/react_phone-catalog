import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumb } from '../../components/Breadcrumb';
import { ItemsPerPageMenu } from '../../components/ItemsPerPageMenu';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { SortMenu } from '../../components/SortMenu';
import { ProductsContext } from '../../ProductsContext';

export const PhonePage = () => {
  const { phones } = useContext(ProductsContext);
  // const { phoneId = 0 } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || phones.length;
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const indexOfLastItem = +page * +perPage;
  const indexOfFirstItem = indexOfLastItem - +perPage;

  const visiblePhones = useMemo(() => {
    return [...phones].sort((phone1, phone2) => {
      switch (sort) {
        case 'newest':
          return +phone2.age - +phone1.age;
        case 'priceDown':
          return phone2.price - phone1.price;
        case 'priceUp':
          return phone1.price - phone2.price;
        case 'discount':
          return phone2.discount - phone1.discount;
        default:
          return 0;
      }
    }).filter(phone => {
      return phone.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }, [phones, sort, query, indexOfFirstItem, indexOfLastItem]);

  const currentPhones = useMemo(() => {
    return visiblePhones.slice(indexOfFirstItem, indexOfLastItem);
  }, [phones, sort, query, indexOfFirstItem, indexOfLastItem]);

  const paginationHidden = +perPage >= visiblePhones.length;

  return (
    <>
      <div className="section py-3">
        <div className="container">
          <BreadCrumb />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title has-text-weight-bold">
            Mobile Phones
          </h1>
          <p className="has-text-grey-light">
            {phones.length
              ? `${phones.length} models`
              : 'no products yes'}
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">

          <div style={{ gap: 16 }} className="is-flex mb-6">

            <SortMenu />

            <ItemsPerPageMenu />

          </div>

          <div className="
            columns
            is-mobile
            is-multiline
          "
          >
            {currentPhones.map(phone => (
              <div className="
                column
                is-one-quarter-desktop
                is-one-third-tablet
                "
              >
                <ProductCard product={phone} />
              </div>
            ))}
          </div>

          {!paginationHidden && (
            <Pagination
              totalItems={visiblePhones.length}
              itemsPerPage={+perPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
