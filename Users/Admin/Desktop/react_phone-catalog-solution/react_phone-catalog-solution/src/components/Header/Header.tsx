import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCart } from "../../store/cart";
import { getFavorites } from "../../store/favorites";

const Header = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [favCount, setFavCount] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const cart = getCart();
      const fav = getFavorites();

      const cartTotal = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );

      setCartCount(cartTotal);
      setFavCount(fav.length);
    };

    update();
    window.addEventListener("storage-update", update);
    return () => window.removeEventListener("storage-update", update);
  }, []);

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e6eef2",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <div
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
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <Link to="/favorites">
            Favorites ({favCount})
          </Link>

          <Link to="/cart">
            Cart ({cartCount})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;