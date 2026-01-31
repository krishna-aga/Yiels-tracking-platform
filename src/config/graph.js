require("dotenv").config();

module.exports = {
  endpoint:
    "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  headers: {
    Authorization: `Bearer ${process.env.GRAPH_API_KEY}`,
  },
};
