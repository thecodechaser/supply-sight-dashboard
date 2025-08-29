import React from 'react';
import { Search } from 'lucide-react';

const FiltersRow = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedWarehouse, 
  setSelectedWarehouse, 
  selectedStatus, 
  setSelectedStatus, 
  warehouses 
}) => {
  return (
    <div className="p-10 mb-6 card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="text-sm text-gray-500">
          {searchTerm && `Search: "${searchTerm}" • `}
          {selectedWarehouse && `Warehouse: ${selectedWarehouse} • `}
          {selectedStatus && `Status: ${selectedStatus} • `}
          <span className="text-gray-400">Use filters to refine results</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            className="pl-10 input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="input-field"
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
        >
          <option value="All">All Warehouses</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.code} value={warehouse.code}>
              {warehouse.name} ({warehouse.code})
            </option>
          ))}
        </select>
        
        <select
          className="input-field"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Healthy">Healthy</option>
          <option value="Low">Low</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersRow;