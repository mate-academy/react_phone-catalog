import styles from '../ProductDetailsPage.module.scss';

export const block = 'product-details-page';
export const cx = (element: string) => styles[`${block}__${element}`];
export { styles };
