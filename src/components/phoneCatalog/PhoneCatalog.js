import React, {useState} from 'react';
import './PhoneCatalog.css';
import { Link, Route, Switch } from 'react-router-dom';
import { Input, Select } from 'semantic-ui-react';
import PhoneDetailsPage from '../phoneDetailsPage/PhoneDetailsPage';
import Phone from '../phone/Phone';

const PhoneCatalog = ({ phones, AddPhoneToBasketList }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [sortQuery, setSortQuery] = useState(null);

  const filterChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const sortChange = (event) => {
    setSortQuery(event.target.textContent);
  };

  const filterPhones = () => {
    const newPhonesList = phones.filter(phone => phone.name.includes(filterQuery));

    switch (sortQuery) {
      case 'Alphabetical':
        return newPhonesList.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return newPhonesList;
    }
  };

  return (
    <Switch>
      {phones.map(phone => <Route key={phone.id} path={`/phones/${phone.id}`} render={() => <PhoneDetailsPage phone={phone} />} />)}
      <Route
        path="/phones"
        exact
        render={() => (
          <section className="phonesPage">
            <div className="filterContained">
              <Input type="text" placeholder="Filter..." value={filterQuery} onChange={filterChange} />
              <br />
              <br />
              <Select
                placeholder="Sort by..."
                options={[{text: 'Newest', value: 'Newest'}, {text: 'Alphabetical', value: 'Alphabetical'}]}
                onChange={sortChange}
              />
            </div>
            <div className="phones">
              {filterPhones().map(phone => (
                <Phone key={phone.id} phone={phone} AddPhoneToBasketList={AddPhoneToBasketList} />
              ))}
            </div>
          </section>
        )}
      />
    </Switch>
  );
};

export default PhoneCatalog;
