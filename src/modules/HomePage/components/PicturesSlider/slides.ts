export interface Slide {
    id: number;
    heading: string;
    productName: string;
    tagline: string;
    image: string;
    imageAlt: string;
}
const fromPublic = (path: string) => `/${path}`;

export const slides: Slide[] = [
    {
        id: 1,
        heading: 'Now available in our store!',
        productName: 'iPhone 14 Pro.',
        tagline: 'Pro. Beyond.',
        image: fromPublic('img/phones/apple-iphone-14-pro/gold/01.webp'),
        imageAlt: 'iPhone 14 Pro',
    },
    {
        id: 2,
        heading: 'Now available in our store!',
        productName: 'iPhone 14.',
        tagline: 'The future is here.',
        image: fromPublic('img/phones/apple-iphone-14/midnight/04.webp'),
        imageAlt: 'iPhone 14',
    },
    {
        id: 3,
        heading: 'Now available in our store!',
        productName: 'iPad Pro.',
        tagline: 'Powerful. Portable. Perfect.',
        image: fromPublic('img/tablets/apple-ipad-pro-11-2021/silver/00.webp'),
        imageAlt: 'iPad Pro',
    },
];
