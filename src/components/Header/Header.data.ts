import heart from "../../assets/icons/heart.svg";
import cart from "../../assets/icons/cart.svg";

export const navOptions = [
  { page: "Home", to: "/" },
  { page: "Phones", to: "/phones" },
  { page: "Tablets", to: "/tablets" },
  { page: "Assesories", to: "/accessories" },
];

export const navButtons = [
  { name: "favorites", to: "/favorites", icon: heart },
  { name: "cart", to: "/cart", icon: cart },
  // { name: "language" },
  // { name: "theme" },
];
