// config.js

module.exports = {
  // Refer to how often routes should cache data
  // https://nextjs.org/docs/app/building-your-application/routing/route-handlers#examples
  highFrequencyRevalidateSeconds: 60, // 1 min
  mediumFrequncyRevalidateSeconds: 600, // 10 mins
  lowFrequncyRevalidateSeconds: 3600, // 1 hour
  ultralowFrequencyRevalidateSeconds: 86400, // 1 day
};
