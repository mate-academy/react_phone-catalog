import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../icons';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Find a book or author',
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center w-full h-[40px] px-4 py-[10px] gap-2.5 rounded-lg bg-input border border-gray-300 transition-colors duration-200',
        'hover:border-[#B4BDC3]',
      )}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        <Icon
          name="search"
          className="w-4 h-4 text-gray-400"
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-ring"
        {...props}
      />
    </div>
  );
};
