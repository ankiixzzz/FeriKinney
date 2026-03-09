import React from "react";
import { Select } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import NEPAL_LOCATIONS from "../../data/nepalLocations";

const categories = [
  { name: "Car", value: "Car" },
  { name: "Bike", value: "Bike" },
  { name: "Smartphone", value: "Smartphone" },
  { name: "Laptop", value: "Laptop" },
  { name: "Camera", value: "Camera" },
  { name: "Video Games", value: "Video Games" },
  { name: "Household Electronics", value: "Household Electronics" },
  { name: "Accessories", value: "Accessories" },
];

const condition = [
  { name: "Brand New", value: "Brand New" },
  { name: "Used-Like New", value: "Used-Like-New" },
  { name: "Used-Good", value: "Used-Good" },
];

const Filters = ({ showFilters, setShowFilters, filters, setFilters }) => {
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setFilters({
      ...filters,
      [type]: value >= 0 ? value : undefined,
    });
  };

  return (
    <div className="flex flex-col w-64 shrink-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900 text-base">Filters</h2>
        <button
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          onClick={() => setShowFilters(false)}
          aria-label="Close filters"
        >
          <IoCloseOutline size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Location */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Location</h3>
          <Select
            showSearch
            allowClear
            placeholder="All locations"
            value={filters.location || undefined}
            optionFilterProp="label"
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            options={NEPAL_LOCATIONS.map((loc) => ({ value: loc, label: loc }))}
            onChange={(val) =>
              setFilters({ ...filters, location: val || "" })
            }
            className="w-full"
            size="middle"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Category</h3>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <label key={category.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  name="category"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({ ...filters, category: [...filters.category, category.value] });
                    } else {
                      setFilters({ ...filters, category: filters.category.filter((item) => item !== category.value) });
                    }
                  }}
                  className="accent-[#14ae5c] w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Condition */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Condition</h3>
          <div className="flex flex-col gap-2">
            {condition.map((c) => (
              <label key={c.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  name="condition"
                  checked={filters.condition.includes(c.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({ ...filters, condition: [...filters.condition, c.value] });
                    } else {
                      setFilters({ ...filters, condition: filters.condition.filter((item) => item !== c.value) });
                    }
                  }}
                  className="accent-[#14ae5c] w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{c.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Price Range (Rs.)</h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handlePriceChange(e, "minPrice")}
              className="border border-gray-200 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#14ae5c] focus:border-transparent"
            />
            <span className="text-gray-400 text-sm shrink-0">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handlePriceChange(e, "maxPrice")}
              className="border border-gray-200 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#14ae5c] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
