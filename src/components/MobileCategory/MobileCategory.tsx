import React, { useCallback, useEffect, useState } from 'react';
import styles from './MobileCategory.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { DropDown } from '../Dropdown/DropDown';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import products from '../../../public/api/products.json';
import { Button } from '../Button/Button';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Phone } from '../../types/Phone';

type Props = {
  setDisabledIds: (arg: number[]) => void;
  disabledIds: number[];
  categoryName: Phone[];
};

export const MobileCategory: React.FC<Props> = ({
  setDisabledIds,
  disabledIds,
  categoryName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsCount, setItemsCount] = useState(searchParams.get('count') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
  const [pageNum, setPageNum] = useState(searchParams.get('pageNum') || '1');
  const [buttonsCount, setButtonsCount] = useState<string[]>(['1']);
  const category = categoryName[0].category;

  const sortByData = [
    {
      id: '0',
      name: 'Newest',
    },
    {
      id: '1',
      name: 'Oldest',
    },
  ];
  const itemsOnPageData = [
    {
      id: '0',
      name: '30',
    },
    {
      id: '1',
      name: '16',
    },
    {
      id: '2',
      name: '20',
    },
  ];

  const sortByCount = () => {
    if (itemsCount) {
      return [
        Number(itemsCount) * (Number(pageNum) - 1),
        Number(itemsCount) * Number(pageNum),
      ];
    } else {
      return [0, categoryName.length];
    }
  };

  const sortByCategory = () => {
    if (sortBy) {
      const sortDirection = sortBy === 'Newest' ? -1 : 1;
      const sortedPhones = [...categoryName].sort((a, b) => {
        const productA = products.find(product => product.itemId === a.id);
        const productB = products.find(product => product.itemId === b.id);

        if (!productA || !productB) {
          return 0;
        }

        return (productA.year - productB.year) * sortDirection;
      });

      return sortedPhones;
    }

    return categoryName;
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
  }, [pageNum, buttonsCount, disabledIds]);

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
      numOfButtons = Math.ceil(categoryName.length / Number(itemsCount));
    } else {
      numOfButtons = 1;
    }

    const result = Array.from({ length: numOfButtons }, (_, i) =>
      (i + 1).toString(),
    );

    setButtonsCount(result);
  }, [itemsCount]);

  return (
    <>
      <div className={`${styles.mobile_main_container}`}>
        <div className={`${styles.mobile_path_container}`}>
          <img
            src="./img/icons/home-icon.svg"
            alt="home icon"
            className={`${styles.mobile_header_icon}`}
          />
          <img
            src="./img/icons/main-disabled-arrow.svg"
            alt="right arrow"
            className={`${styles.mobile_header_icon}`}
          />
          <p className={`${styles.mobile_path}`}>{category}</p>
        </div>
        <h1 className={`${styles.mobile_header}`}>{category === 'phones' ? 'Mobile Phones' : category}</h1>
        <p className={`${styles.mobile_models_count}`}>
          {categoryName.length} models
        </p>

        <div className={`${styles.mobile_main_select_container}`}>
          <div className={`${styles.mobile_select_container}`}>
            <p
              className={classNames(
                `${styles.mobile_select_parag} ${styles.first_select_button}`,
              )}
            >
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

        <div className={`${styles.mobile_phones_container}`}>
          {sortByCategory()
            .slice(sortByCount()[0], sortByCount()[1])
            .map(product => (
              <ProductCard product={product} key={product.id} onPage={true} category={`${categoryName[0].category}`}/>
            ))}
        </div>

        <div className={`${styles.mobile_button_container}`}>
          <Button
            direction={ButtonDirection.left}
            onClick={handlePageChangeLeft}
            buttonId={5}
            disabledIds={disabledIds}
          />

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
          <Button
            direction={ButtonDirection.right}
            onClick={handlePageChangeRigt}
            buttonId={6}
            disabledIds={disabledIds}
          />
        </div>
      </div>
    </>
  );
};
