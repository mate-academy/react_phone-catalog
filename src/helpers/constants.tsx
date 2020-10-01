export const sliderImages: SliderImage[] = [
  { path: 'slider_img/slide1.jpg', alt: '1' },
  { path: 'slider_img/slide2.jpg', alt: '2' },
  { path: 'slider_img/slide3.jpg', alt: '3', },
  { path: 'slider_img/slide4.jpg', alt: '4', },
];

export const navLinks: Link[] = [
  { title: 'Home', path: '/'},
  { title: 'Phones', path: '/phones'},
  { title: 'Tablets', path: '/tablets'},
  { title: 'Accessories', path: '/accessories'},
]

export const footerLinks: Link[] = [
  { title: 'Github',  path: 'https://github.com/KaterinaSavvova'},
  { title: 'Contacts', path: 'https://www.linkedin.com'},
  { title: 'Rights',  path: 'https://ru.wikipedia.org/wiki/All_rights_reserved'},
]

export const sortTypes: SortType[] = [
  { type: 'price', sortBy: 'high_price', reverse: 1 },
  { type: 'price', sortBy: 'low_price', reverse: -1 },
  { type: 'age', sortBy: 'newest', reverse: 1 },
  { type: 'list', sortBy: '', reverse: -1 },
]
