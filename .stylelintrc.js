module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    "order/properties-order": n[
      "display",
      "width",
      "height",
      "margin",
      "padding",
      "position",
      "border",
      "background-color",
      "&:first-child",
      "&::after",
      "color",
      "font-size"
    ]
  }
};
