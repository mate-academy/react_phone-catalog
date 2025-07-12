import {
  FooterLabelProp,
  FooterNavName,
  FooterRoutePath,
} from '@widgets/Footer/types/footerLinks';
import {
  HeaderLabelProp,
  HeaderNavName,
  HeaderRoutePath,
} from '@widgets/header/types/headerLinks';

export type NavigationItem = {
  name: HeaderNavName | FooterNavName;
  path: HeaderRoutePath | FooterRoutePath;
  labelProp: HeaderLabelProp | FooterLabelProp;
};
