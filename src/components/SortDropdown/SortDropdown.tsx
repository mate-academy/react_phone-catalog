import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';
import { useSearchParams } from 'react-router-dom';
import { CaretDownIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import React from 'react';

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || 'age';

  const handleChange = (value: string) => {
    if (value === 'age') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }

    setSearchParams(searchParams);
  };

  const label =
    currentSort === 'age'
      ? 'Newest'
      : currentSort === 'alpha'
        ? 'Alphabetically'
        : 'Cheapest';

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[#89939A] font-semibold text-[10px]">Sort by</p>

      <Dropdown onOpenChange={setIsOpen}>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="w-[136px] md:w-[176px] justify-between border-gray-200 hover:border-gray-950 rounded-small"
            endContent={
              <CaretDownIcon
                size={13}
                color="#B4BDC3"
                className={`
                    ${isOpen ? 'rotate-180' : 'rotate-0'}
                  `}
              />
            }
          >
            {label}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Sort options"
          selectionMode="single"
          selectedKeys={[currentSort]}
          onSelectionChange={keys =>
            handleChange(Array.from(keys)[0] as string)
          }
        >
          <DropdownItem key="age">Newest</DropdownItem>
          <DropdownItem key="alpha">Alphabetically</DropdownItem>
          <DropdownItem key="price">Cheapest</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
