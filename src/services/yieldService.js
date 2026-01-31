const { getPoolsByToken } = require("../graph/pools");
const { getPoolDayData } = require("../graph/poolDayData");
const { calculateAPR } = require("../yield/apr");
const { calculateAPY } = require("../yield/apy");

const MIN_TVL_USD = 1000;
const MAX_APR = 5;

async function getPoolsWithYield(token, days = 7, limit = 100) {
  const pools = await getPoolsByToken(token, limit, 0);
  const results = [];

  for (const pool of pools) {
    const tvlNow = Number(pool.totalValueLockedUSD);
    if (!tvlNow || tvlNow < MIN_TVL_USD) continue;

    const dayData = await getPoolDayData(pool.id, days);
    if (!dayData.length) continue;

    let totalFees = 0;
    let totalTVL = 0;

    for (const d of dayData) {
      totalFees += Number(d.feesUSD);
      totalTVL += Number(d.tvlUSD);
    }

    const avgTVL = totalTVL / dayData.length;
    if (!avgTVL || avgTVL < MIN_TVL_USD) continue;

    let apr = calculateAPR(totalFees, avgTVL, days);
    if (!Number.isFinite(apr) || apr <= 0) apr = 0;
    if (apr > MAX_APR) apr = MAX_APR;

    const apy = calculateAPY(apr);

    results.push({
      poolId: pool.id,
      pair: `${pool.token0.symbol}/${pool.token1.symbol}`,
      volumeUSD: pool.volumeUSD,
      tvlUSD: pool.totalValueLockedUSD,
      apr,
      apy
    });
  }

  return results;
}

module.exports = { getPoolsWithYield };
