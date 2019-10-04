const jumpingOnClouds = (c) => {
  const traverse = (idx, jumps, array) => {
    if (idx >= array.length - 1) {
      return jumps;
    } else {
      return traverse(idx + (array[idx + 2] === 0 ? 2 : 1), jumps + 1, array);
    }
  }

  return traverse(0, 0, c);
}
