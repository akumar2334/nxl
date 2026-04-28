import React from "react";
import { Search, Filter, Upload } from "lucide-react";

const SearchFilterBar = ({
  search,
  setSearch,
  onFilterClick,
  onUploadClick,
}) => {
  return (
    <div className="w-full bg-white">

      {/* Top Row */}
      <div className="flex items-center justify-between gap-4">

        {/* Search */}
        <div className="relative w-full max-w-xl">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by prospect, signal, account..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <Filter size={14} />
            Filters
          </button>

          <button
            onClick={onUploadClick}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <Upload size={14} />
            Upload
          </button>

        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;