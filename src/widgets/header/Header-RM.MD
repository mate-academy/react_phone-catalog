# Header component

## Architecture

**CSS_FIRST** approach.

### Main Principles:
- React only controls one state - isOpened + condition rendering of icon & aria-label of burger-menu button;
- Main part (menu-closed/menu-opened) realised via class change and grid magick. Grid-templates with main constants were moved to /styles/_headerConst.scss;
- Outer elements interaction is blocked via z-index + position: Fixed property of Header element.
- I did used pseudoselectors in main header scss module due to modular structure (README.MD), and I reaally dislike the idea to prop-drill classnames.

### File structure:
├── index.tsx                         # Main <Header> component;
├── README.md                         # readme doc;
├── model/                            # navigation conf: path, aria-label etc
├── ui/
│   ├── buttonNavigation/             # UI buttons (fav, cart)
│   └── mainNavigation/               # Main navigation links
└── styles/
    ├── _headerConst.scss             # Const & grid-templates
    ├── header.module.scss            # Header layout styles
    ├── buttonNavigation.module.scss  # styles for UI buttons
    └── mainNavigation.module.scss    # styles for main nav block

|@shared/icons/                       # Icons for UIMenu and menuButton (heart, cart, burger-menu, counter for fav&cart, cross)

### How it works:
  For mobile:
  isOpened useState switches classes of .header => .header--is-active

  **Active grid for mob**:

  $grid-mob-active: #{$button-size} calc(100vh - #{$button-size} - #{$button-size-wide}) #{$button-size-wide}
    / 1fr #{$button-size};

  **Inactive**:

  $grid-mob-inactive: #{$button-size} 0 0
    / 1fr #{$button-size};

  + display of elements is dynamic:
  Active for mob: block/flex;
  Inactive: none/none

  This approach leads to stable HTML markup for SEO, all elements are still part of the page.

  For tab & wide screens - same grid, only has one row.

  **BLOCKING OUTER CLICKS**
  realised via Z-indexes system.

  **Rendering counter**
  HeaderButtonNavLink has an access to static data of Global context, so it renders counter conditionally + sending to counter itemsAmount via prop

### Types:
  All ***static data** is moved to Enums/Config objects in /header/model
    navLinksList
    uiLinksList

  **ENUMS** can be found in @shared/types/navLinkTypes => RoutePath, NavElementName, NavAriaLabels, interface NavLinkProps for props typization of |@shared/ui/NavLink

### Performance:
  Single rerender on open/close menu.
  CSS transitions instead of JS
  Minimal DOM-manipulations
  Grid makes changes smooth even on agressive resize.
