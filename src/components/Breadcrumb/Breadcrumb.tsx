import { Breadcrumbs, BreadcrumbItem } from '@heroui/react';
import { HouseIcon } from '@phosphor-icons/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = () => {
  const location = useLocation();

  const segments = location.pathname.split('/').filter(Boolean); // ["phones", "iphone-11-pro"]

  const buildPath = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  const formatName = (str: string) =>
    str
      .replace(/-/g, ' ') // iphone-11-pro → iphone 11 pro
      .replace(/\b\w/g, c => c.toUpperCase()); // uppercase each word

  return (
    <Breadcrumbs
      separator="›"
      itemClasses={{
        item: 'text-[#89939A]',
        separator: 'px-2 text-[#89939A]',
      }}
      className="mb-6"
    >
      {/* HOME */}
      <BreadcrumbItem>
        <Link to="/" className="flex items-center gap-1 text-gray-600">
          <HouseIcon size={20} weight="bold" />
        </Link>
      </BreadcrumbItem>

      {/* OTHER PATH SEGMENTS */}
      {segments.map((segment: string, i: number) => {
        const path = buildPath(i);
        const isLast = i === segments.length - 1;

        return (
          <BreadcrumbItem
            key={path}
            className={isLast ? 'text-gray-800 font-medium' : 'text-gray-500'}
          >
            {isLast ? (
              formatName(segment)
            ) : (
              <Link to={path} className="hover:text-gray-700 transition">
                {formatName(segment)}
              </Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};
