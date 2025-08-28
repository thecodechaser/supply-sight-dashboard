import React, { useState } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import client from './apollo/client';
import { GET_PRODUCTS, GET_WAREHOUSES, GET_KPIS } from './graphql/queries';

import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import StockChart from './components/StockChart';
import FiltersRow from './components/FiltersRow';
import ProductsTable from './components/ProductsTable';
import ProductDrawer from './components/ProductDrawer';

const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: productsData, loading: productsLoading } = useQuery(GET_PRODUCTS, {
    variables: {
      search: searchTerm || null,
      status: selectedStatus !== 'All' ? selectedStatus : null,
      warehouse: selectedWarehouse !== 'All' ? selectedWarehouse : null,
    },
    errorPolicy: 'all'
  });

  const { data: warehousesData } = useQuery(GET_WAREHOUSES, {
    errorPolicy: 'all'
  });

  const { data: kpiData } = useQuery(GET_KPIS, {
    variables: { range: selectedRange },
    errorPolicy: 'all'
  });

  const products = productsData?.products || [];
  const warehouses = warehousesData?.warehouses || [];
  const kpis = kpiData?.kpis || [];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar selectedRange={selectedRange} onRangeChange={setSelectedRange} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <KPICards products={products} />
        
        {kpis.length > 0 && <StockChart kpiData={kpis} />}
        
        <FiltersRow
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedWarehouse={selectedWarehouse}
          setSelectedWarehouse={setSelectedWarehouse}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          warehouses={warehouses}
        />
        
        <ProductsTable products={products} onRowClick={handleProductClick} />
      </div>

      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        warehouses={warehouses}
      />
    </div>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
};

export default App;