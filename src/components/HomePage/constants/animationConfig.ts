export const HERO_REVEAL = {
  DURATION: 1.4,
  EASE: 'power4.inOut',
  CLIP_START: 'inset(30% round 20px)',
  CLIP_END: 'inset(0% round 0px)',
  INITIAL_SCALE: 1.15,
} as const;

export const SCROLL_ENTRANCE = {
  TRIGGER_START: 'top 80%',
  TOGGLE_ACTIONS: 'play none none none',
  CAROUSEL_ITEM_SELECTOR: '[data-slot="carousel-item"]',
  HEADING_X_OFFSET: -50,
  HEADING_DURATION: 0.7,
  HEADING_EASE: 'power3.out',
  CARD_Y_OFFSET: 60,
  CARD_ROTATE_X: 12,
  CARD_PERSPECTIVE: 800,
  CARD_STAGGER: 0.1,
  CARD_DURATION: 0.6,
  CARD_EASE: 'power3.out',
  CARD_OVERLAP: '-=0.3',
  SECTION_Y_OFFSET: 40,
  SECTION_DURATION: 0.8,
  SECTION_EASE: 'power2.out',
} as const;
