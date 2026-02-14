import React, { useCallback, useEffect, useState } from 'react';
import styles from './ProductCategory.module.scss';
import { DropDown } from '../Dropdown/DropDown';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import products from '../../../public/api/products.json';
import { Button } from '../Button/Button';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Product } from '../../types/Product';
import { CategoryHeader } from '../CategoryHeader/CategoryHeader';
import { getProducts } from '../../services/productsApi';
import { itemsOnPageData, sortByData } from '../../utils/SortCategory';
import { ProductCard } from '../../utils/lazyComponents';

type Props = {
  setDisabledIds: (arg: number[]) => void;
  disabledIds: number[];
  url: string;
};

const ProductCategory: React.FC<Props> = ({
  setDisabledIds,
  disabledIds,
  url,
}) => {
  const [activeData, setActiveData] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsCount, setItemsCount] = useState(searchParams.get('count') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
  const [pageNum, setPageNum] = useState(searchParams.get('pageNum') || '1');
  const [buttonsCount, setButtonsCount] = useState<string[]>(['1']);

  const sortByCount = () => {
    if (itemsCount) {
      if (itemsCount === 'All') {
        return [0, activeData.length];
      }

      return [
        Number(itemsCount) * (Number(pageNum) - 1),
        Number(itemsCount) * Number(pageNum),
      ];
    } else {
      return [0, activeData.length];
    }
  };

  const sortByCategory = () => {
    if (sortBy && (sortBy === 'Newest' || sortBy === 'Oldest')) {
      const sortDirection = sortBy === 'Newest' ? -1 : 1;
      const sortedPhones = [...activeData].sort((a, b) => {
        const productA = products.find(product => product.itemId === a.id);
        const productB = products.find(product => product.itemId === b.id);

        if (!productA || !productB) {
          return 0;
        }

        return (productA.year - productB.year) * sortDirection;
      });

      return sortedPhones;
    } else if (
      sortBy &&
      (sortBy === 'Cheapest' || sortBy === 'Most expensive')
    ) {
      const sortDirection = sortBy === 'Cheapest' ? 1 : -1;
      const sorted = [...activeData].sort(
        (a, b) => (a.priceDiscount - b.priceDiscount) * sortDirection,
      );

      return sorted;
    } else if (sortBy && sortBy === 'Alphabetically') {
      const sorted = [...activeData].sort((a, b) =>
        a.name.localeCompare(b.name),
      );

      return sorted;
    }

    return activeData;
  };

  const handleButtonClassName = (number: string) => {
    return classNames([styles.mobile_page_num], {
      [styles.selected_page]: pageNum === number,
    });
  };

  const handlePageChange = (number: string) => {
    setPageNum(number);
  };

  const handleButtonState = useCallback(() => {
    let newDisabledIds = [...disabledIds];

    if (pageNum === '1') {
      newDisabledIds.push(5);
    } else if (pageNum !== '1') {
      newDisabledIds = newDisabledIds.filter(id => id !== 5);
    }

    if (pageNum === buttonsCount[buttonsCount.length - 1]) {
      newDisabledIds.push(6);
    } else if (pageNum !== buttonsCount[buttonsCount.length - 1]) {
      newDisabledIds = newDisabledIds.filter(id => id !== 6);
    }

    if (JSON.stringify(newDisabledIds) !== JSON.stringify(disabledIds)) {
      setDisabledIds(newDisabledIds);
    }
  }, [disabledIds, setDisabledIds, buttonsCount, pageNum]);

  const handlePageChangeLeft = () => {
    setPageNum((Number(pageNum) - 1).toString());
  };

  const handlePageChangeRigt = () => {
    setPageNum((Number(pageNum) + 1).toString());
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pageNum]);

  useEffect(() => {
    setTimeout(() => handleButtonState(), 1000);
  }, [pageNum, buttonsCount, disabledIds, handleButtonState]);

  // url params
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (itemsCount) {
      newParams.set('count', itemsCount);
    } else {
      newParams.delete('count');
    }

    if (sortBy) {
      newParams.set('sortBy', sortBy);
    } else {
      newParams.delete('sortBy');
    }

    if (pageNum) {
      if (pageNum !== '1') {
        newParams.set('pageNum', pageNum);
      }
    } else {
      newParams.delete('pageNum');
    }

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams);
    }
  }, [itemsCount, sortBy, pageNum, setSearchParams, searchParams]);

  // buttons count
  useEffect(() => {
    let numOfButtons;

    if (itemsCount) {
      if (itemsCount === 'All') {
        numOfButtons = 0;
      } else {
        numOfButtons = Math.ceil(activeData.length / Number(itemsCount));
      }
    } else {
      numOfButtons = 0;
    }

    const result = Array.from({ length: numOfButtons }, (_, i) =>
      (i + 1).toString(),
    );

    setButtonsCount(result);
    setPageNum('1');
  }, [itemsCount, sortBy, activeData]);

  useEffect(() => {
    getProducts(`${url}`)
      .then(data => {
        setActiveData(data);
      })
      .catch(e => {
        throw new Error(e);
      });
  }, [url]);

  return (
    <>
      <main className={`${styles.mobile_main_container}`}>
        <CategoryHeader categoryData={activeData} />
        <div className={`${styles.mobile_main_select_container}`}>
          <div className={`${styles.mobile_select_container}`}>
            <p className={classNames(`${styles.mobile_select_parag}`)}>
              Sort by
            </p>
            <DropDown
              id={'0'}
              data={sortByData}
              setSort={setSortBy}
              searchParams={searchParams}
            />
          </div>
          <div className={`${styles.mobile_select_container}`}>
            <p className={`${styles.mobile_select_parag}`}>Items on page</p>
            <DropDown
              id={'1'}
              data={itemsOnPageData}
              setSort={setItemsCount}
              searchParams={searchParams}
            />
          </div>
        </div>

        <section className={`${styles.mobile_phones_container}`}>
          {sortByCategory()
            .slice(sortByCount()[0], sortByCount()[1])
            .map(product => (
              <ProductCard product={product} key={product.id} onPage={true} />
            ))}
        </section>

        <section className={`${styles.mobile_button_container}`}>
          {/* <div className={`${styles.buttons_wrapper}`}> */}
          {buttonsCount.length > 0 && buttonsCount[0] !== '0' && (
            <Button
              direction={ButtonDirection.left}
              onClick={handlePageChangeLeft}
              buttonId={5}
              disabledIds={disabledIds}
            />
          )}

          <div className={`${styles.mobile_page_num_container}`}>
            {buttonsCount.map((button, id) => {
              return (
                <button
                  className={handleButtonClassName(button)}
                  onClick={() => handlePageChange(button)}
                  key={id}
                >
                  {button}
                </button>
              );
            })}
          </div>
          {buttonsCount.length > 0 && buttonsCount[0] !== '0' && (
            <Button
              direction={ButtonDirection.right}
              onClick={handlePageChangeRigt}
              buttonId={6}
              disabledIds={disabledIds}
            />
          )}
          {/* </div> */}
        </section>
      </main>
    </>
  );
};

export default ProductCategory;
