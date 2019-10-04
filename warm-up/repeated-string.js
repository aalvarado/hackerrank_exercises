function repeatedString(s, n) {
    const offset = n % s.length;
    const aCount = (s.match(/a/g) || []).length
    return (aCount * Math.floor(n / s.length)) + (s.substring(0, offset).match(/a/g) || []).length
}
