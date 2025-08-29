import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $status: String, $warehouse: String, $range: String) {
    products(search: $search, status: $status, warehouse: $warehouse, range: $range) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query GetWarehouses($range: String) {
    warehouses(range: $range) {
      code
      name
      city
      country
    }
  }
`;

export const GET_KPIS = gql`
  query GetKPIs($range: String!, $warehouse: String) {
    kpis(range: $range, warehouse: $warehouse) {
      date
      stock
      demand
    }
  }
`;
