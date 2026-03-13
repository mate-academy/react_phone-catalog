import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCart } from "../../store/cart";
import { getFavorites } from "../../store/favorites";

const Header = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [favCount, setFavCount] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const cart = getCart();
      const fav = getFavorites();

      const cartTotal = cart.reduce(
        (sum: number, item) => sum + item.quantity,
        0
      );

      setCartCount(cartTotal);
      setFavCount(fav.length);
    };

    update();
    window.addEventListener("storage-update", update);
    return () => window.removeEventListener("storage-update", update);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e6eef2",
      }}
    >
      <nav
        className="header-nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <div
          className="header-left"
          style={{
            display: "flex",
            gap: "40px",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
        </div>

        <div
          className="header-right"
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <Link to="/favorites" style={{ position: "relative" }}>
            Favorites
            {favCount > 0 && (
              <span style={{ marginLeft: 8 }}>({favCount})</span>
            )}
          </Link>

          <Link to="/cart" style={{ position: "relative" }}>
            Cart
            {cartCount > 0 && (
              <span style={{ marginLeft: 8 }}>({cartCount})</span>
            )}
          </Link>
        </div>

        <button
          className={`header-burger ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {isMenuOpen && (
        <button
          className="header-mobile-backdrop"
          aria-label="Close mobile menu"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className={`header-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/catalog" onClick={() => setIsMenuOpen(false)}>
          Catalog
        </Link>
        <Link to="/catalog/phones" onClick={() => setIsMenuOpen(false)}>
          Phones
        </Link>
        <Link to="/catalog/tablets" onClick={() => setIsMenuOpen(false)}>
          Tablets
        </Link>
        <Link
          to="/catalog/accessories"
          onClick={() => setIsMenuOpen(false)}
        >
          Accessories
        </Link>
        <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
          Favorites
          {favCount > 0 && <span> ({favCount})</span>}
        </Link>
        <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
          Cart
          {cartCount > 0 && <span> ({cartCount})</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
