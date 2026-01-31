const { request, gql } = require("graphql-request");
const { endpoint, headers } = require("../config/graph");

const query = gql`
  query PoolsByToken($token: String!, $limit: Int!, $skip: Int!) {
    pools(
      first: $limit
      skip: $skip
      where: {
        or: [
          { token0: $token }
          { token1: $token }
        ]
      }
      orderBy: totalValueLockedUSD
      orderDirection: desc
    ) {
      id
      feeTier
      volumeUSD
      totalValueLockedUSD
      token0 { symbol }
      token1 { symbol }
    }
  }
`;

async function getPoolsByToken(token, limit = 100, skip = 0) {
  const data = await request(
    endpoint,
    query,
    { token, limit, skip },
    headers
  );
  return data.pools;
}

module.exports = { getPoolsByToken };
