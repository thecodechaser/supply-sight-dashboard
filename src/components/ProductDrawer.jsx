import React, { useState } from 'react';
import { X, Package, Warehouse, TrendingUp, ArrowRight } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { UPDATE_DEMAND, TRANSFER_STOCK } from '../graphql/mutations';
import { GET_PRODUCTS } from '../graphql/queries';

const ProductDrawer = ({ product, isOpen, onClose, warehouses }) => {
  const [demandValue, setDemandValue] = useState(product?.demand || 0);
  const [transferQty, setTransferQty] = useState(0);
  const [targetWarehouse, setTargetWarehouse] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const [updateDemand, { loading: updatingDemand }] = useMutation(UPDATE_DEMAND, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      alert('Demand updated successfully!');
    },
    onError: (error) => {
      alert(`Error updating demand: ${error.message}`);
    }
  });

  const [transferStock, { loading: transferringStock }] = useMutation(TRANSFER_STOCK, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      alert('Stock transferred successfully!');
      setTransferQty(0);
      setTargetWarehouse('');
    },
    onError: (error) => {
      alert(`Error transferring stock: ${error.message}`);
    }
  });

  if (!isOpen || !product) return null;

  const status = product.stock > product.demand ? 'Healthy' : 
                 product.stock === product.demand ? 'Low' : 'Critical';
  
  const statusColor = status === 'Healthy' ? 'text-green-600' : 
                     status === 'Low' ? 'text-yellow-600' : 'text-red-600';

  const handleUpdateDemand = async () => {
    if (demandValue < 0) {
      alert('Demand cannot be negative');
      return;
    }
    
    try {
      await updateDemand({
        variables: {
          id: product.id,
          demand: parseInt(demandValue)
        }
      });
    } catch (error) {
      console.error('Error updating demand:', error);
    }
  };

  const handleTransferStock = async () => {
    if (transferQty <= 0) {
      alert('Transfer quantity must be greater than 0');
      return;
    }
    
    if (!targetWarehouse) {
      alert('Please select a target warehouse');
      return;
    }

    if (transferQty > product.stock) {
      alert('Transfer quantity cannot exceed current stock');
      return;
    }

    try {
      await transferStock({
        variables: {
          id: product.id,
          from: product.warehouse,
          to: targetWarehouse,
          qty: parseInt(transferQty)
        }
      });
    } catch (error) {
      console.error('Error transferring stock:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'actions'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Actions
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.id}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    status === 'Healthy' ? 'bg-green-50 text-green-600' :
                    status === 'Low' ? 'bg-yellow-50 text-yellow-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">SKU</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{product.sku}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Warehouse className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Warehouse</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{product.warehouse}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Current Stock</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-blue-900">{product.stock.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">Demand</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-purple-900">{product.demand.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Stock Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fulfillable Demand:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.min(product.stock, product.demand).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Excess/Shortage:</span>
                      <span className={`text-sm font-medium ${
                        product.stock - product.demand >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.stock - product.demand >= 0 ? '+' : ''}
                        {(product.stock - product.demand).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="space-y-6">
                {/* Update Demand Form */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Update Demand</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Demand Value
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="input-field"
                        value={demandValue}
                        onChange={(e) => setDemandValue(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleUpdateDemand}
                      disabled={updatingDemand}
                      className="btn-primary w-full disabled:opacity-50"
                    >
                      {updatingDemand ? 'Updating...' : 'Update Demand'}
                    </button>
                  </div>
                </div>

                {/* Transfer Stock Form */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Transfer Stock</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transfer Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={product.stock}
                        className="input-field"
                        value={transferQty}
                        onChange={(e) => setTransferQty(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Warehouse
                      </label>
                      <select
                        className="input-field"
                        value={targetWarehouse}
                        onChange={(e) => setTargetWarehouse(e.target.value)}
                      >
                        <option value="">Select warehouse</option>
                        {warehouses
                          .filter(w => w.code !== product.warehouse)
                          .map((warehouse) => (
                            <option key={warehouse.code} value={warehouse.code}>
                              {warehouse.name} ({warehouse.code})
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-md p-3 border">
                      <span className="text-sm text-gray-600">From: {product.warehouse}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        To: {targetWarehouse || 'Select warehouse'}
                      </span>
                    </div>
                    <button
                      onClick={handleTransferStock}
                      disabled={transferringStock}
                      className="btn-primary w-full disabled:opacity-50"
                    >
                      {transferringStock ? 'Transferring...' : 'Transfer Stock'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDrawer;