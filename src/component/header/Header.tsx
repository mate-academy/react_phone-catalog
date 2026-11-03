import './Header.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export const Header = () => {
  const location = useLocation();

  return (
    <>
      <header className="headerTop">
        <h2>Nice Gadgets Store</h2>
        <div className="placeHeaderDiv">
          <Link
            to="/home"
            className={`placesHeader ${location.pathname.includes('home') ? 'is-active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/phones"
            className={`placesHeader ${location.pathname.includes('phones') ? 'is-active' : ''}`}
          >
            Phones
          </Link>
          <Link
            to="/tablets"
            className={`placesHeader ${location.pathname.includes('tablets') ? 'is-active' : ''}`}
          >
            Tablets
          </Link>
          <Link
            to="/accessories"
            className={`placesHeader ${location.pathname.includes('accessories') ? 'is-active' : ''}`}
          >
            accessories
          </Link>
        </div>

        {/* <input type="text" placeholder="Search for products" /> */}

        <div className="iconsNavConteiner">
          <div className="icons-div">
            <nav className="navIcons">
              <Link to="/favorities" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '24px' }}>&hearts;</span>{' '}
              </Link>
            </nav>
          </div>
          <div className="icons-div">
            <nav className="navIcons">
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '24px' }}>&#x1F6D2;</span>
              </Link>
              {/* <FontAwesomeIcon
                icon={faCartShopping}
                style={{ fontSize: '24px' }}
              /> */}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
