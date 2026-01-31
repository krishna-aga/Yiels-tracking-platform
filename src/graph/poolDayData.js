const { request, gql } = require("graphql-request");
const { endpoint, headers } = require("../config/graph");

const query = gql`
  query PoolDayData($pool: String!, $days: Int!) {
    poolDayDatas(
      first: $days
      orderBy: date
      orderDirection: desc
      where: { pool: $pool }
    ) {
      feesUSD
      tvlUSD
    }
  }
`;

async function getPoolDayData(pool, days) {
  const data = await request(
    endpoint,
    query,
    { pool, days },
    headers
  );
  return data.poolDayDatas;
}

module.exports = { getPoolDayData };
