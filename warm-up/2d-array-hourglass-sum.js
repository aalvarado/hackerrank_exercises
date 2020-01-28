 const hourglassSum = (arr) => {
  let sum;

  const relativePositions = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [0,   0],
    [1,  -1],
    [1,   0],
    [1,   1]
  ];

  const validIndexes = (x, y) => {
    if (x < 1 || x >= arr.length - 1)
      return false;
    if (y < 1 || y >= arr.length - 1)
      return false;

    return true;
  };

  arr.forEach((xArr, x) => {
    xArr.forEach((_, y) => {
      let hourGlassSum;

      if(validIndexes(x, y)) {
        relativePositions.forEach((point) => {
          if(typeof(hourGlassSum) === 'undefined') {
            hourGlassSum = arr[x + point[0]][y + point[1]];
          } else {
            hourGlassSum = hourGlassSum + arr[x + point[0]][y + point[1]];
          }
        })
      }

      if (typeof(sum) === 'undefined' || hourGlassSum > sum) {
        sum = hourGlassSum;
      }
    });
  });

  return sum;
}
