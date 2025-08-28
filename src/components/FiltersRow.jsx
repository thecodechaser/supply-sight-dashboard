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
    <div className="card p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            className="input-field pl-10"
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