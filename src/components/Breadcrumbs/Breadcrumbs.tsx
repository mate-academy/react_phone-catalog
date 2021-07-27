import React, { useState } from "react"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { getProductDetails } from "../api";

const DynamicProductBreadcrumb: React.FC<{match: any, param: string}> = ({ match, param }) => {
  let [breadcrumb, setBreadcrumb] = useState('');

  useEffect(() => {
      getProductDetails(match.params[param]).then((resp) => setBreadcrumb(resp.name))
    }, [match.params, param]
  )

  return(
    <span>{breadcrumb}</span>
  )
};

const routes = [
  {path: '/', breadcrumb: () => <i className="home-icon lg"/> },
  {path: '/phones', breadcrumb: 'Phones' },
  {path: '/tablets', breadcrumb: 'Tablets' },
  {path: '/accessories', breadcrumb: 'Phones' },
  {path: '/phones/:phoneId', breadcrumb: ({ match }: {match: any}) => <DynamicProductBreadcrumb match={match} param="phoneId"/> },
  {path: '/tablets/:tabletId', breadcrumb: ({ match }: {match: any}) => <DynamicProductBreadcrumb match={match} param="tabletId"/> },
]


export const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs(routes)

  return (
    breadcrumbs.length > 1 ?
    <div className="breadcrumbs">
      {breadcrumbs.map(({ breadcrumb, match }) => (
        <div
          key={match.url as string}
          className="breadcrumbs"
        >
          <span >
            {match.url !== '/' ?  <i className="arrow"/> : ''}
          </span>
          <span>
            <Link className="breadcrumb small-text" to={match.url}>
              {breadcrumb}
            </Link>
          </span>
        </div>
      ))}
    </div>
    : <></>
  )
}