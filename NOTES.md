## Project Notes

### Decisions made
- Used React + Apollo Client for clean data fetching with GraphQL.
- Kept frontend and backend separate (React app + Node GraphQL server) for clarity and flexibility.
- Designed UI with clear sections: filters, KPIs, chart, table, so users can explore data easily.

### Trade-offs
- Separate frontend/backend means two deployments, a bit more setup vs one monolithic app.
- Warehouse data is static for now (doesn’t change with date range) → simpler, but maybe less realistic.
- Chart shows trends by date range, table shows current snapshot → easier to build but might confuse some users.

### Future improvements
- Merge backend into serverless functions so everything can run on Netlify together.
- Improve UX by experimenting with layout (e.g., move chart above KPIs).
- Add caching / pagination for large product lists.
- Make warehouses dynamic with historical stock data if needed.
