import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

// Sample data
const warehouses = [
  { code: 'BLR-A', name: 'Bangalore Alpha', city: 'Bangalore', country: 'India' },
  { code: 'PNQ-C', name: 'Pune Charlie', city: 'Pune', country: 'India' },
  { code: 'DEL-B', name: 'Delhi Beta', city: 'Delhi', country: 'India' },
  { code: 'MUM-D', name: 'Mumbai Delta', city: 'Mumbai', country: 'India' },
  { code: 'CHN-E', name: 'Chennai Echo', city: 'Chennai', country: 'India' }
];

let products = [
  { id: 'P-1001', name: '12mm Hex Bolt', sku: 'HEX-12-100', warehouse: 'BLR-A', stock: 180, demand: 120 },
  { id: 'P-1002', name: 'Steel Washer', sku: 'WSR-08-500', warehouse: 'BLR-A', stock: 50, demand: 80 },
  { id: 'P-1003', name: 'M8 Nut', sku: 'NUT-08-200', warehouse: 'PNQ-C', stock: 80, demand: 80 },
  { id: 'P-1004', name: 'Bearing 608ZZ', sku: 'BRG-608-50', warehouse: 'DEL-B', stock: 24, demand: 120 },
  { id: 'P-1005', name: 'Steel Plate 5mm', sku: 'PLT-05-200', warehouse: 'BLR-A', stock: 95, demand: 70 },
  { id: 'P-1006', name: 'Copper Wire 16AWG', sku: 'CWR-16-100', warehouse: 'PNQ-C', stock: 200, demand: 150 },
  { id: 'P-1007', name: 'Rubber Gasket', sku: 'GSK-RBR-50', warehouse: 'DEL-B', stock: 30, demand: 45 },
  { id: 'P-1008', name: 'Aluminum Rod 10mm', sku: 'ARD-10-80', warehouse: 'BLR-A', stock: 120, demand: 100 },
  { id: 'P-1009', name: 'Plastic Connector', sku: 'CON-PLS-25', warehouse: 'PNQ-C', stock: 60, demand: 90 },
  { id: 'P-1010', name: 'Spring Steel Wire', sku: 'SSW-02-300', warehouse: 'DEL-B', stock: 150, demand: 130 },
  { id: 'P-1011', name: 'Ceramic Insulator', sku: 'INS-CER-40', warehouse: 'BLR-A', stock: 40, demand: 40 },
  { id: 'P-1012', name: 'Bronze Bushing', sku: 'BSH-BRZ-15', warehouse: 'PNQ-C', stock: 25, demand: 35 },
  { id: 'P-1013', name: 'Titanium Screw M6', sku: 'TIT-SCR-M6', warehouse: 'MUM-D', stock: 300, demand: 250 },
  { id: 'P-1014', name: 'Nylon Washer 10mm', sku: 'NYL-WSR-10', warehouse: 'CHN-E', stock: 75, demand: 100 },
  { id: 'P-1015', name: 'Stainless Steel Rod', sku: 'SS-ROD-12', warehouse: 'BLR-A', stock: 45, demand: 60 },
  { id: 'P-1016', name: 'Carbon Fiber Sheet', sku: 'CF-SHT-2MM', warehouse: 'MUM-D', stock: 20, demand: 35 },
  { id: 'P-1017', name: 'Brass Fitting', sku: 'BRS-FIT-15', warehouse: 'PNQ-C', stock: 85, demand: 70 },
  { id: 'P-1018', name: 'Silicon Tube 8mm', sku: 'SIL-TUB-8', warehouse: 'DEL-B', stock: 120, demand: 140 },
  { id: 'P-1019', name: 'Magnetic Strip', sku: 'MAG-STR-50', warehouse: 'CHN-E', stock: 200, demand: 180 },
  { id: 'P-1020', name: 'Polyurethane Foam', sku: 'PU-FOAM-25', warehouse: 'BLR-A', stock: 60, demand: 80 },
  { id: 'P-1021', name: 'Glass Fiber Rod', sku: 'GF-ROD-6MM', warehouse: 'MUM-D', stock: 90, demand: 75 },
  { id: 'P-1022', name: 'Zinc Coating Spray', sku: 'ZN-SPR-400', warehouse: 'PNQ-C', stock: 35, demand: 50 },
  { id: 'P-1023', name: 'Kevlar Thread', sku: 'KEV-THR-1MM', warehouse: 'DEL-B', stock: 150, demand: 120 },
  { id: 'P-1024', name: 'Ceramic Bearing', sku: 'CER-BRG-608', warehouse: 'CHN-E', stock: 40, demand: 65 },
  { id: 'P-1025', name: 'Tungsten Wire', sku: 'TUN-WIR-0.5', warehouse: 'BLR-A', stock: 25, demand: 40 },
  { id: 'P-1026', name: 'Graphite Sheet', sku: 'GRP-SHT-1MM', warehouse: 'MUM-D', stock: 80, demand: 70 },
  { id: 'P-1027', name: 'Molybdenum Rod', sku: 'MOL-ROD-3MM', warehouse: 'PNQ-C', stock: 15, demand: 30 },
  { id: 'P-1028', name: 'PTFE Tape', sku: 'PTFE-TAP-12', warehouse: 'DEL-B', stock: 200, demand: 160 },
  { id: 'P-1029', name: 'Neodymium Magnet', sku: 'NEO-MAG-N52', warehouse: 'CHN-E', stock: 100, demand: 120 },
  { id: 'P-1030', name: 'Viton O-Ring', sku: 'VIT-ORG-20', warehouse: 'BLR-A', stock: 75, demand: 85 },
  { id: 'P-1031', name: 'Inconel Plate', sku: 'INC-PLT-2MM', warehouse: 'MUM-D', stock: 12, demand: 25 },
  { id: 'P-1032', name: 'Hastelloy Wire', sku: 'HAS-WIR-1MM', warehouse: 'PNQ-C', stock: 30, demand: 45 },
  { id: 'P-1033', name: 'Zirconia Ball', sku: 'ZIR-BAL-5MM', warehouse: 'DEL-B', stock: 60, demand: 50 },
  { id: 'P-1034', name: 'Peek Polymer Rod', sku: 'PEK-ROD-8MM', warehouse: 'CHN-E', stock: 45, demand: 70 },
  { id: 'P-1035', name: 'Tantalum Sheet', sku: 'TAN-SHT-0.5', warehouse: 'BLR-A', stock: 8, demand: 20 },
  { id: 'P-1036', name: 'Beryllium Copper', sku: 'BE-CU-STRIP', warehouse: 'MUM-D', stock: 35, demand: 40 },
  { id: 'P-1037', name: 'Nitinol Wire', sku: 'NIT-WIR-0.8', warehouse: 'PNQ-C', stock: 50, demand: 60 },
  { id: 'P-1038', name: 'Sapphire Window', sku: 'SAP-WIN-10MM', warehouse: 'DEL-B', stock: 20, demand: 35 },
  { id: 'P-1039', name: 'Quartz Tube', sku: 'QTZ-TUB-12MM', warehouse: 'CHN-E', stock: 40, demand: 30 },
  { id: 'P-1040', name: 'Platinum Wire', sku: 'PT-WIR-0.25', warehouse: 'BLR-A', stock: 15, demand: 25 }
];

// Generate mock KPI data for the last 30 days
const generateKPIData = (range) => {
  const days = parseInt(range.replace('d', '')) || 7;
  const kpiData = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
    
    const dayOffset = i / days;
    const stockTrend = Math.sin(dayOffset * Math.PI * 2) * 0.05; 
    const demandTrend = Math.cos(dayOffset * Math.PI * 2) * 0.08;
    const randomVariation = (Math.random() - 0.5) * 0.03;
    
    kpiData.push({
      date: date.toISOString().split('T')[0],
      stock: Math.max(0, Math.round(totalStock * (1 + stockTrend + randomVariation))),
      demand: Math.max(0, Math.round(totalDemand * (1 + demandTrend + randomVariation)))
    });
  }
  
  return kpiData;
};

const typeDefs = `
  type Warehouse {
    code: ID!
    name: String!
    city: String!
    country: String!
  }

  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
  }
`;

const resolvers = {
  Query: {
    products: (parent, args) => {
      let filteredProducts = [...products];

      if (args.search) {
        const searchTerm = args.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.sku.toLowerCase().includes(searchTerm) ||
          p.id.toLowerCase().includes(searchTerm)
        );
      }

      if (args.warehouse && args.warehouse !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.warehouse === args.warehouse);
      }

      if (args.status && args.status !== 'All') {
        filteredProducts = filteredProducts.filter(p => {
          const status = p.stock > p.demand ? 'Healthy' : p.stock === p.demand ? 'Low' : 'Critical';
          return status === args.status;
        });
      }

      return filteredProducts;
    },
    warehouses: () => warehouses,
    kpis: (parent, args) => {
      return generateKPIData(args.range);
    }
  },
  Mutation: {
    updateDemand: (parent, args) => {
      const productIndex = products.findIndex(p => p.id === args.id);
      if (productIndex !== -1) {
        products[productIndex].demand = args.demand;
        return products[productIndex];
      }
      throw new Error('Product not found');
    },
    transferStock: (parent, args) => {
      const productIndex = products.findIndex(p => p.id === args.id);
      if (productIndex !== -1) {
        products[productIndex].warehouse = args.to;
        return products[productIndex];
      }
      throw new Error('Product not found');
    }
  }
};

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});