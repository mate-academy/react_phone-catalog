import Heart from "../../assets/icons/Heart";
import Cart from "../../assets/icons/Cart";

export const navOptions = [
  { page: "Home", to: "/" },
  { page: "Phones", to: "/phones" },
  { page: "Tablets", to: "/tablets" },
  { page: "Assesories", to: "/accessories" },
];

export const navButtons = [
  {
    name: "favorites",
    to: "/favorites",
    icon: function (fill: string) {
      return <Heart fill={fill} />;
    },
  },
  {
    name: "cart",
    to: "/cart",
    icon: function (fill: string) {
      return <Cart fill={fill} />;
    },
  },
  // { name: "language" },
  // { name: "theme" },
];
