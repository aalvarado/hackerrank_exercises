const sockMerchant = (n, ar) -> {
  let pairs = [];

  ar.forEach(function (e) {
    pairs[e] = (pairs[e] || 0) + 1;
  });

  return pairs.reduce(function (acc, e) {
    return acc + Math.floor((e || 1) / 2);
  }, 0);
};
