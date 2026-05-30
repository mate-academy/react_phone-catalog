export const patterns = {
  name: "^[A-ZА-ЯІЇЄҐa-zа-яіїєґ'`\\-]{2,30}$",
  address: "^[A-ZА-ЯІЇЄҐa-zа-яіїєґ0-9'.,\\-\\s]{5,100}$",
  phoneNumber: '^\\+?[0-9]{10,14}$',
  creditCard: '^(\\d{4} \\d{4} \\d{4} \\d{4})$',
  expirationDate: '^(0[1-9]|1[0-2])\\/[0-9]{2}$',
  cvv: '^[0-9]{3}$',
};
