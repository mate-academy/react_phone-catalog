import React from 'react';
import PhoneArticle from './PhoneArticle';
import Paginator from './Paginator';

import './slyles/catalog.css';

const Catalog = (props) => {
  const perPageChange = (newPerPage) => {
    addr.history.push(`/phones/pag=1by${newPerPage}`);
  };

  const { phonesList, getPhonesList, searchStr, addr, buyNowHandler, inCart, handleSearch, sortOrder, styleType } = props;

  getPhonesList();

  const filteredPhones = searchStr
    ? phonesList.filter(phone => phone.name.toLowerCase().includes(searchStr))
    : [...phonesList];

  const sortedPhones = [...filteredPhones];

  switch (sortOrder) {
    case '1':
      sortedPhones.sort((a, b) => a.age - b.age);
      break;
    case '2':
      sortedPhones.sort((a, b) => b.age - a.age);
      break;
    case '3':
      sortedPhones.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case '4':
      sortedPhones.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  const newPerPage = addr.match.params.page
    && +addr.match.params.page.split('by')[1];

  let perPage = newPerPage ? newPerPage : 6;
  perPage = perPage <= sortedPhones.length && perPage >= 1 ? perPage : 6;

  const pagesQtty = Math.ceil(sortedPhones.length / perPage);
  const pages = [];

  for (let i = 0; i < pagesQtty; i++) {
    pages[i] = sortedPhones.slice(i * perPage, (i + 1) * perPage);
  }

  const newcurrPage = addr.match.params.page
    && +addr.match.params.page.split('by')[0];
  let currPage = newcurrPage ? newcurrPage : 1;
  currPage = currPage <= pagesQtty && currPage > 0 ? currPage : 1;

  if (!pages[0]) {
    return (<>Loading ...</>);
  }

  return (
    <>
      <div className={`phoneCatalog${styleType}`}>
        {pages[currPage - 1].map(phone => (
          <PhoneArticle
            key={phone.age}
            phone={phone}
            buyNowHandler={buyNowHandler}
            inCart={inCart}
            handleSearch={handleSearch}
            styleType={styleType}
          />
        ))}
      </div>
      <Paginator
        currPage={currPage}
        pagesQtty={pagesQtty}
        perPage={perPage}
        articlesQtty={filteredPhones.length}
        perPageChange={perPageChange}
      />
    </>
  );
};

export default Catalog;
