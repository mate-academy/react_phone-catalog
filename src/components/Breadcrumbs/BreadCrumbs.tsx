import React from "react";
import styles from "./BreadCrumbs.module.scss";
import classNames from "classnames";
import { useLocation, useSearchParams } from "react-router-dom";
import { routes } from "../../Root";

export const BreadCrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const slicedPath = pathname.slice(1);
  const CapitalizePath =
    slicedPath.slice(0, 1).toUpperCase() + slicedPath.slice(1);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const breadcrumbs = [
    {
      href: routes.home,
      children: <img src="/img/general/icons/home.svg" alt="home" />,
    },
    { href: slicedPath, children: CapitalizePath },
  ];

  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.list}>
        {/*HOME ICON HTML*/}
        {/*breadcrumps.map(el => <BreadCrumb el={el} />>)*/}

        {/*{breadcrumbs.map((bc, index) => (*/}
        {/*  <li key={bc.href} className={classNames(styles.link, "text-small")}>*/}
        {/*    <a href={bc.href} className={classNames(styles.link, "text-small")}>*/}
        {/*      {bc.children}*/}
        {/*    </a>*/}
        {/*    {breadcrumbs.length - 1 === index ? (*/}
        {/*      ""*/}
        {/*    ) : (*/}
        {/*      <a href={bc.href} className={styles.link}>*/}
        {/*        <img*/}
        {/*          src="/img/general/icons/arrow.svg"*/}
        {/*          alt="arrow"*/}
        {/*          className={styles.arrow}*/}
        {/*        />*/}
        {/*      </a>*/}
        {/*    )}*/}
        {/*  </li>*/}
        {/*))}*/}
      </ul>
    </nav>
  );
};

// component BreadCrumps(props)
// const {breadcrumps} = props
// render
// static home html
// breadcrumps.map(el => <BreadCrump el={el} />>)
