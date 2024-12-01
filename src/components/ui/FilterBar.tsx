import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from './Button';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  filters?: {
    [key: string]: {
      label: string;
      options: FilterOption[];
    };
  };
  onSearch: (value: string) => void;
  onFilter: (key: string, value: string) => void;
}

export function FilterBar({ searchPlaceholder, filters, onSearch, onFilter }: FilterBarProps) {
  return (
    <div className="bg-white bg-opacity-90 glass-effect p-4 border-b border-gray-200 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between animate-fade-in">
      {/* Search */}
      <div className="relative flex-1 max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white bg-opacity-90 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:shadow-md"
          placeholder={searchPlaceholder || "Search..."}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      {filters && (
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          {Object.entries(filters).map(([key, filter]) => (
            <select
              key={key}
              onChange={(e) => onFilter(key, e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-all duration-300 hover:shadow-md bg-white bg-opacity-90"
              defaultValue=""
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              Object.keys(filters).forEach(key => onFilter(key, ''));
              onSearch('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}