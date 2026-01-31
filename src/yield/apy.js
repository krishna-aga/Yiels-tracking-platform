function calculateAPY(apr, periods = 365) {
    if (apr <= 0) return 0;
    if (apr > 10) apr = 10;
  
    const rate = 1 + apr / periods;
    const apy = Math.pow(rate, periods) - 1;
  
    if (!Number.isFinite(apy)) return 0;
    return apy;
  }
  
  module.exports = { calculateAPY };
  