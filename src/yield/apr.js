function calculateAPR(fees, tvl, days) {
    if (tvl === 0) return 0;
    return (fees / tvl) * (365 / days);
  }
  
  module.exports = { calculateAPR };
  