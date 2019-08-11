import React from 'react'
import {
  Link
} from 'react-router-dom'

class PhoneCatalog extends React.Component {
  state = {
    phones: [],
    phonesForShowing: [],
    itemsAtBasket: [],
  }

  componentDidMount = () => {
    this.setState({
      phones: this.props.phones,
      phonesForShowing: this.props.phones,
    })
  }

  handleInput = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      phonesForShowing: [...prevState.phones].filter(phone => 
        phone.id.toLowerCase().includes(value.toLowerCase())
        ),
    }))
  }

  sortFunc = (event) => {
    const {value} = event.target;

    this.setState(prevState => ({
      phonesForShowing: [...prevState.phonesForShowing].sort((a,b) => {
        const valueA = a[value];
        const valueB = b[value];
        
        switch(typeof valueA) {
          case 'string':
            return valueA.localeCompare(valueB);
          case 'number':
            return valueA - valueB;
          default:
            return 0;
        }
      })
    }))
  }

  addItemToBasket = (itemToAdd) => {
    const currentIndex = this.state.itemsAtBasket
      .findIndex(element => element.id === itemToAdd.id)
    
    if (currentIndex >= 0) {
      this.setState(prevState => {
        let changedArray = [...prevState.itemsAtBasket];
        changedArray[currentIndex].quantity += 1;

        return {
          itemsAtBasket: changedArray,
        }
      })
    } else {
      const requiredItem = {...itemToAdd};
      requiredItem.quantity = 1;
      delete requiredItem.imageUrl;
      delete requiredItem.snippet;
      delete requiredItem.age;
      delete requiredItem.carrier;
  
      this.setState(prevState => ({
        itemsAtBasket: [...prevState.itemsAtBasket, requiredItem],
      }))
    }
  }

  render() {
    const { phonesForShowing } = this.state;
    console.log(this.state.itemsAtBasket);

    return (
      <div className='phoneCatalog'>
        <label
          className='searchField'
          htmlFor="search_field"
        >
          Search: 
          <input 
            onChange={this.handleInput}
            className='searchField__input'
            id='search_field'
            type="text"/>
        </label>

        <label 
          className='sortField'
          htmlFor="sort_select"
        >
          Sort by: 
          <select 
            onChange={this.sortFunc}
            className='sortField-select'
            id="sort_select">
            <option selected value="age">Newest</option>
            <option value="name">Alphabetical</option>
          </select>
        </label>

        <ul className='listOfPhones'>
          {
            phonesForShowing.map(phone => (
              <li className='listOfPhones__item'>
                <img 
                  className='listOfPhones__item-img'
                  src={`${phone.imageUrl}`} 
                  alt="altImg"
                  />

                <Link
                  className='listOfPhones__item-link'
                  to={`/phones/${phone.id}`}
                >
                  {phone.name}
                </Link>

                <section className='listOfPhones__item-snippet'>
                  {phone.snippet}
                </section>

                <button
                  onClick={() => this.addItemToBasket(phone)}
                >
                  Add to cart
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default PhoneCatalog