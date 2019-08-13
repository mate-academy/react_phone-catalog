# React Phone catalog

Implement Phone catalog as already implemented [here](http://angular.github.io/angular-phonecat/step-14/app/#!/phones)
but using React.

Static files are available in [this repo](https://github.com/mate-academy/phone-catalogue-static).

Use [Phones API](https://mate-academy.github.io/phone-catalogue-static/api/phones.json) to fetch a list of phones
and [Phone Details API](https://mate-academy.github.io/phone-catalogue-static/api/phones/motorola-xoom.json) то fetch phone details.
(Use actual `phoneId` as a last part of the URL before `.json`)


## Task

1. Implement `HomePage` and `PhonesPage` available on `/` and `/phones` accordingly (only with headers for now)
1. Implement top navigation to switch between pages (active page should be highlighted)
1. Add `NotFoundPage` for all the other URLs with the link to `HomePage`
1. Fetch phones from API when `PhonesPage` is opened.
1. Implement a `Loader` to show it while waiting for the data from server
1. Implement `PhoneCatalog` component displaying a list of phones and show it on the `PhonesPage`
1. Implement `PhoneDetailsPage` available on `/phones/:phoneId` (links from catalog should open the details)
1. Fetch the details when `PhoneDetailsPage` is opened. Use `Loader`
1. Implement `Phone was not found` state for the `PhoneDetailsPage` if there is no phone with a given `phoneId` on the server
1. Implement `PhoneDetails` component displaying the detailed info about the phone and show it on the `PhoneDetailsPage`
1. Implement ability to switch between images in `PhoneDetails`
1. Create a `Filter` component with an input to search and select to choose sort order and add it to the `PhonesPage`
    - use filter params in `PhoneCatalog`
1. Implement `Basket` component storing an array of `BasketItems`
    - Each item should have `id`, `quantity` and `phone` - a link to a phone from `phones` array
1. Implement `Add` button for each phone in `PhoneCatalog`
    - when you add a phone again its quantity should increase in `Basket`
1. Add ability to remove items from the `Basket` with a `x` button
1. Add ability to change the quantity in the `Basket` with `-` and `+` buttons around the quantity


## Advanced tasks

1. Save `Filter` params in the URL using `queryParams` (`?query=moto&sort=age`)
    - when the page is loaded with `query` and `sort` in the URL
      they should be applied to the filter and `PhoneCatalog`
1. Add [Pagination](https://github.com/mate-academy/react_pagination#react-pagination)
    - Top `Pagination` should allow to select `perPage`
    - Bottom `Pagination` should show the info (4-6 of 20)
    - Save `page` and `perPage` in URL so it works together with the `Filter`
1. Implement `Add` button for `PhoneDetails` so you can add a phone to the `Basket` from the `PhoneDetailsPage`
1. Add animation to the `PhoneCatalog`
1. Save the Basket to the `localSotrage` and read it on page load


## Workflow

- Fork the repository with task
- Clone forked repository
    ```bash
    git clone git@github.com:<user_name>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop

## Development mode

- Run `npm start` to start development server on `http://localhost:3000`
    When you run server the command line window will no longer be available for
    writing commands until you stop server (`ctrl + c`). All other commands you
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- run `npm run lint` to check code style
- When you finished add correct `homepage` to `package.json` and run `npm run deploy`
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://YevgeniyLeonienkov.github.io/react_phone-catalog/)` - this will be a
  link to your index.html
- Commit and push all recent changes.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo
(`master`).
- Add a link at `PR` to Google Spreadsheets.

## Project structure

You should be writing your code in `src/` directory.
